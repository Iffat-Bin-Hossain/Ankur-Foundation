require('dotenv').config()
const express = require('express')
const cors = require('cors')
const registerUser = require('./api/auth/register')
const { loginUser } = require('./api/auth/login')
const { getProfile } = require('./api/auth/profile')

const app = express()
const PORT = process.env.PORT || 3001

// Middleware
app.use(cors())
app.use(express.json())

// Routes
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password, role } = req.body
    const result = await registerUser(name, email, password, role)
    
    return res.status(result.status).json(
      result.user 
        ? { user: result.user }
        : { error: result.error }
    )
  } catch (error) {
    console.error('Register handler error:', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
})

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body
    const result = await loginUser(email, password)
    
    if (result.data) {
      return res.status(result.status).json(result.data)
    }
    
    return res.status(result.status).json({ error: result.error })
  } catch (error) {
    console.error('Login handler error:', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
})

app.post('/api/auth/profile', async (req, res) => {
  try {
    const authHeader = req.headers.authorization || ''
    const token = authHeader.replace('Bearer ', '')
    
    const result = await getProfile(token)
    
    if (result.user) {
      return res.status(result.status).json({ user: result.user })
    }
    
    return res.status(result.status).json({ error: result.error })
  } catch (error) {
    console.error('Profile handler error:', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
})

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Ankur Foundation Backend is running' })
})

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' })
})

// Start server
app.listen(PORT, () => {
  console.log(`✅ Ankur Foundation Backend running on http://localhost:${PORT}`)
})
