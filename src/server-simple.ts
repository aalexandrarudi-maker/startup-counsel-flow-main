import express from 'express'
import cors from 'cors'

const app = express()
const PORT = 3001

// Middleware
app.use(cors())
app.use(express.json())

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Stripe API server running',
    timestamp: new Date().toISOString()
  })
})

// Test endpoint
app.get('/api/test', (req, res) => {
  res.json({ 
    message: 'API is working!',
    endpoints: [
      '/api/health',
      '/api/test',
      '/api/create-checkout-session (POST)',
      '/api/webhooks/stripe (POST)'
    ]
  })
})

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Simple API server running on port ${PORT}`)
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`)
  console.log(`🧪 Test endpoint: http://localhost:${PORT}/api/test`)
})

export default app

