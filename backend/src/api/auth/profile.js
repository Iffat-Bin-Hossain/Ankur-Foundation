const jwt = require('jsonwebtoken')
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function getProfile(token) {
  console.log('Profile request - Token received:', token ? 'Yes (length: ' + token.length + ')' : 'No')
  
  if (!token) {
    console.log('Profile failed: No token provided')
    return {
      status: 401,
      error: 'No token provided'
    }
  }

  try {
    // Verify and decode the token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || 'your-secret-key'
    )
    console.log('Profile - Token verified successfully for user:', decoded.id)

    // Get user from database
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        isActive: true,
        createdAt: true,
      }
    })

    if (!user) {
      console.log('Profile failed: User not found for ID:', decoded.id)
      return {
        status: 404,
        error: 'User not found'
      }
    }

    if (!user.isActive) {
      console.log('Profile failed: User is inactive:', user.email)
      return {
        status: 403,
        error: 'User account is inactive'
      }
    }

    console.log('Profile successful for user:', user.email)
    return {
      status: 200,
      user
    }
  } catch (error) {
    console.error('Token verification error:', error.message)
    return {
      status: 401,
      error: 'Invalid or expired token'
    }
  }
}

module.exports = { getProfile }
