const express = require("express")
const router = express.Router()
const mysql = require('mysql2/promise')
const auth = require('../middleware/checkAuth')

const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'try1'
}

router.get('/', auth, async (req, res) => {

    const userId = req.userId

    try {
        const getUserSQL = `SELECT * FROM users WHERE id=?`
        const connection = await mysql.createConnection(dbConfig)
        const [rows] = await connection.query(
            getUserSQL,
            [parseInt(userId)]
        )

        res.status(200).json({user : rows[0]})
    } catch(error) {
        return res.status(400).json({error : [{"message": error}]})
    }
    
})

module.exports = router