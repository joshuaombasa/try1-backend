const express = require('express')
const { check,validationResult } = require('express-validator')
const router = express.Router()

router.post('/', [
    check("email", "please provide a valid email")
        .isEmail(),
        check("password", "please provide a password that is greater than 7 characters")
        .isLength({
            min: 8
        })
] , async(req, res) => {
    const { email, password} = req.body

    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(400).json({
            error : errors.array()
        })
    }
})

module.exports = router