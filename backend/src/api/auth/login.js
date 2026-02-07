const bcryptjs = require('bcryptjs')
const { PrismaClient } = require('@prisma/client')
const jwt = require('jsonwebtoken')

const prisma = new PrismaClient()

async function loginUser(email, password) {
  if (!email || !password) {
    return {
      status: 400,
      error: 'Email and password are required'
    }
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        name: true,
        password: true,
        role: true,
        isActive: true
      }
    })

    if (!user) {
      console.log(`Login failed: User not found for email ${email}`)
      return {
        status: 401,
        error: 'Invalid credentials'
      }
    }

    if (!user.isActive) {
      console.log(`Login failed: User inactive for email ${email}`)
      return {
        status: 403,
        error: 'User account is inactive'
      }
    }

    const isPasswordValid = await bcryptjs.compare(password, user.password)
    console.log(`Password validation for ${email}: ${isPasswordValid}`)

    if (!isPasswordValid) {
      console.log(`Login failed: Invalid password for email ${email}`)
      return {
        status: 401,
        error: 'Invalid credentials'
      }
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role
      },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '7d' }
    )

    console.log(`Login successful for ${email}`)
    return {
      status: 200,
      data: {
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          isActive: user.isActive
        },
        token
      }
    }
  } catch (error) {
    console.error('Login error:', error.message)
    return {
      status: 500,
      error: 'Internal server error during login'
    }
  }
}

module.exports = { loginUser }
