const express = require("express");
const zod = require("zod");
const {User} = require("../db");
const jwt = require("jsonwebtoken");
const {JWT_SECRET} = require("../config");
const router = express.Router();

const signupbody =zod.object({
    username: zod.string().email(),
    password: zod.string().min(6),
    firstname: zod.string().max(50),
    lastname: zod.string().max(50),
})
router.post("/Signup", async(req,res) => {
    const {success} =  signupbody.safeParse(req.body);
    if(!success){
        return res.status(411).json({ message: "Email already taken / Incorrect inputs"});
    }

const existinguser = await user.findOne(
    {username: req.body.username}
    );
if(existinguser){
    return res.status(411).json({ message: "Email already taken/Incorrect inputs"})
}
const user = await User.create({
    username : req.body.username,
    password : req.body.password,
    firstname : req.body.firstname,
    lastname : req.body.lastname

})
const userID = user._id;

await Account.create({
    user : userID,
    balance : 1 + Math.random()*1000
})

const Token = jwt.sign({userID}, JWT_SECRET);

res.json({
    message : "user created succesfully" ,
     Token : Token
    });
})

const signinbody = zod.object({
    username: zod.string().email(),
    password: zod.string().min(6)
})
router.post("/signin", async(req,res) => {
    const {success} = signinbody.safeParse(req.body);
    if(!success){
        return res.status(411).json({message: "Email already taken/Incorrect inputs"})
    }
    const user = await user.findOne({
        username : req.body.username,
        password : req.body.password
    })
    if(user){
        const Token = jwt.sign({userID: user._id} , JWT_SECRET);
    
    res.json({
        Token : Token,
    })
    return;
}
 res.status(411).json({
        message: "Error while logging in"
    })

})
const updateBody = Zod.object({
    password: Zod.string().optional(),
    firstname: Zod.string().optional(),
    lastname : Zod.string().optional()
})

router.put("/", authMiddleware, async(req,res) => {
    const {success} = updateBody.safeParse(req.body);
    if(!success){
        return res.status(411).json({message: "Error while updating information"})
    }

await User.updateOne( req.body,{_id: req.userID});
res.json({message: "Updated successfully"})
})
router.get("/bulk", async (req, res) => {
    const filter = req.query.filter || "";

    const users = await User.find({
        $or: [{
            firstName: {
                "$regex": filter
            }
        }, {
            lastName: {
                "$regex": filter
            }
        }]
    })

    res.json({
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
})


module.exports = router;













