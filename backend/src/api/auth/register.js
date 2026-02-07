const bcryptjs = require('bcryptjs')
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function registerUser(name, email, password, role = 'MEMBER') {
  if (!name || !email || !password) {
    return {
      status: 400,
      error: 'Name, email, and password are required'
    }
  }

  try {
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return {
        status: 409,
        error: 'User already exists with this email'
      }
    }

    // Hash password
    const hashedPassword = await bcryptjs.hash(password, 12)

    // Create user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role,
      },
    })

    return {
      status: 201,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        isActive: user.isActive,
      }
    }
  } catch (error) {
    console.error('Registration error:', error)
    return {
      status: 500,
      error: 'Failed to register user'
    }
  }
}

module.exports = registerUser
