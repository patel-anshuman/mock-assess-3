const jwt = require('jsonwebtoken');
require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET;

const auth = (req,res,next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        let  decoded = jwt.verify(token, JWT_SECRET);
        if(decoded){
            req.user._id = decoded.userID;
            req.user.email = decoded.email;
            next();
        } else {
            res.status(400).json({msg: "Invalid Token"});
        }
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}

module.exports = {auth};