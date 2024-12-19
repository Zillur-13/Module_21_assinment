const jwt = require("jsonwebtoken");
const {JWT_SECRET,JWT_EXPHIRE} = require("../config/config.js");

const tokenEncode = (phoneNumber,user_id)=>{
     let key = JWT_SECRET;
     let exphire = {expiresIn: JWT_EXPHIRE};
     let payload = {phoneNumber:phoneNumber, user_id:user_id};

     return jwt.sign(payload,key,exphire);

}

const tokenDecode = (token) =>{
    try {
       return jwt.verify(token,JWT_SECRET); 
    } catch (error) {
        return res.status(404).json({error:error})
    }
}

module.exports = {tokenEncode , tokenDecode}
