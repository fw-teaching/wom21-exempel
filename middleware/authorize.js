require('dotenv').config()
const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    

    try {
        const authHeader = req.headers['authorization']

        const token = authHeader?.split(' ')[1]
        //const token = authHeader && authHeader.split(' ')[1]

        const authUser = jwt.verify(token, process.env.JWT_SECRET)

        req.authUser = authUser

        console.log(`Authorized ${authUser.email}`)

        next()

    } catch (error) {
        
        return res.json({message: error.message})
    }
        
}
