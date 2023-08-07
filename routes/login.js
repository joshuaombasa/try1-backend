const express = require('express')
const router = express.Router()

router.post('/', async(req, res) => {
    const { email, password } = req.body
    console.log(email, password)
    res.status(200).json({message: 'Request successful'})
})

module.exports = router