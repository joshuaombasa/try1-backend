const express = require('express')
const cors = require('cors')

const app = express()

const signupRoutes = require('./routes/signup')
const loginRoutes = require('./routes/login')

app.use(express.json())
app.use(cors())

app.use('/signup', signupRoutes)
app.use('/login', loginRoutes)

app.listen(5000, () => {
    console.log('Server running on http://localhost:5000')
})