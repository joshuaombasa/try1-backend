const express = require('express')
const { check,validationResult } = require('express-validator')
const bcrypt = require('bcrypt')
const mysql = require('mysql')

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'try1'
})

const router = express.Router()



router.post('/', [
    check("email", "please provide a valid email").isEmail(),
    check("password").isLength({min : 8})
       
], async (req, res) => {
    const { firstname, lastname,  phonenumber, email, password} = req.body

    const errors =  validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors : errors.array()
        })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const addNewUserSQL = `INSERT INTO users (first_name, last_name, phone_number, email, user_password) VALUES (?,?,?,?,?)`

    connection.query(
                     addNewUserSQL, 
                     [firstname, lastname,  phonenumber, email, hashedPassword],
                     (error, results) => {
                        if(error) {
                            return res.status(400).json(error)
                        } else if (results) {
                            res.status(200).json(results)
                        }
                     }
                    )
})

module.exports = router