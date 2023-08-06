const express = require('express')

const signupRoutes = require('./routes/signup')
const app = express()

app.use(express.json())

app.use('/signup', signupRoutes)

app.listen(5000, () => {
    console.log('Server running on http://localhost:5000')
})