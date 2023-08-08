const express = require('express')
const cors = require('cors')

const app = express()

const signupRoutes = require('./routes/signup')
const loginRoutes = require('./routes/login')
const adminRoutes = require('./routes/admin')

app.use(express.json())
app.use(cors())

app.use('/signup', signupRoutes)
app.use('/login', loginRoutes)
app.use('/admin', adminRoutes)

app.listen(5000, () => {
    console.log('Server running on http://localhost:5000')
})