const JWT = require('jsonwebtoken')
const SECRET_KEY = 'Joe12334'

module.exports = async (req, res, next) => {
    const token = req.header('Authorization')
    if(!token) {
        return res.status(400).json({error: [{'message': "No token found"}]})
    }

   try {
    const decoded = await JWT.verify(token, SECRET_KEY)
    req.userId = decoded.userId
    next()
   } catch(error) {
    return res.status(400).json({error: [{"message": "Invalid token"}]})
   }
}