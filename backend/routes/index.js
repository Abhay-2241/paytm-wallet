const express = require("express");
const router = express.Router();
const userRouter = require("./user");
router.use("/user", userRouter)


router.get("/user", (req,res) => {
    res.json({message: "hello world"})
})


module.exports = router;