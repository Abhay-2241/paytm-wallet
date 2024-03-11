const jwt = require("jsonwebtoken");
const {JWT_SECRET} = require("../config");

const authMiddleware = (req,res,next) => {
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith("Bearer ")){
        return res.status(403).json({message: "Unauthorized"});
    }
    const token = authHeader.split(" ")[1];
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        if(decoded.userID){
            req.userID = decoded.userID;
             next();
        }else{
            return response.status(403).json({message: "Unauthorized"});
        }
       
    } catch (error) {
        console.log(error);
        return res.status(403).json({message: "Unauthorized"});

    }
};

module.export = {
    authMiddleware
}