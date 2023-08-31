const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const mysql = require('mysql2/promise')
const { check, validationResult} = require('express-validator')

const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'try1'
}

router.post('/', [
    check("email", "Please provide a valid email").isEmail(),
    check("password", "Please provide a password that is greater than 7 characters").isLength({min: 6})
], async (req, res) => {
    const { firstname, lastname, phonenumber, email, password } = req.body

    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(400).json({
            error : errors.array()
        })
    }

    //    check if a user exists with a similar email

    try {
        const connection = await mysql.createConnection(dbConfig)
        const checkUserSql = `SELECT * FROM users WHERE email=?`
        const [rows] = await connection.query(checkUserSql, [email])

        if (rows.length > 0) {
            connection.end()
            return res.status(400).json({error:  "User already exists" })
        }

        // hash the password before adding it to the database
        const saltRounds = 10
        const hashedPassword = await bcrypt.hash(password, saltRounds)

        // add new user to the database
        const addUserSql = `INSERT INTO users (first_name, last_name, phone_number, email, user_password) VALUES (?, ?, ?, ?, ?)`

        await connection.query(
            addUserSql,
            [firstname, lastname, phonenumber, email, hashedPassword]
        )
        connection.end()

        res.status(200).json({ message: "Signup successful" })

    } catch (error) {
        res.status(400).json({error :  error })
    }

})

module.exports = router