const express = require('express')
const { check,validationResult } = require('express-validator')
const bcrypt = require('bcrypt')
const router = express.Router()



router.post('/', [
    check("email", "please provide a valid email").isEmail(),
    check("password").isLength({min : 8})
       
], async (req, res) => {
    const { email,password } = req.body

    const errors =  validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors : errors.array()
        })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    res.status(200).json({message: "Request successful"})
})

module.exports = router