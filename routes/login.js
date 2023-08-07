const express = require('express')
const router = express.Router()
const mysql = require('mysql2/promise')
const bcrypt = require('bcrypt')
const { check, validationResult } = require('express-validator')

const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'try1'
}

router.post('/', [
    check("email", "Please provide a valid email").isEmail(),
    check("password", "Please provide a password that is greater than 7 characters").isLength({ min: 7 })

], async (req, res) => {
    const { email, password } = req.body
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() })
    }
    // Retrieve hashed password from the database based on the email

    try {
        const getUserSQL = `SELECT * FROM users WHERE email=?`

        const connection = await mysql.createConnection(dbConfig);

        const [rows] = await connection.query(getUserSQL, [email])

        connection.end()

        if (rows.length === 0) {
            res.status(401).json({error : [{ "message": 'User not found' }]})
        }

        const hashedPassword = rows[0].user_password

        // Compare the entered password with the hashed password
        const isMatch = await bcrypt.compare(password, hashedPassword);

        if (isMatch) {
            res.json({ message: "Login successful" })
        } if (!isMatch) {
            res.status(401).json({error : [{ "message": "Incorrect credentials" }]})
        }
    } catch (error) {
        return res.status(500).json({error : [{ "message": 'An error occurred during login.' }]})
    }


})

module.exports = router