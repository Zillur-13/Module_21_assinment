
const {tokenDecode} = require("../utility/tokenUtility.js")

exports.authenticateUser = (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) return res.status(401).json({ error: 'Unauthorized access' });

        const decoded = tokenDecode(token);
        // console.log(decoded);
        if(decoded== "null"){
            return res.status(404).json({message:"You are wrong"})
        }else{
        let phoneNumber = decoded.phoneNumber;
        let user_id = decoded.user_id;
       
        req.headers.phoneNumber = phoneNumber ;
        req.headers.user_id = user_id;
        next();
        }

    }catch(error){
        return res.status(500).json({error:error});
    }
};
