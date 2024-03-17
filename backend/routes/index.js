// const express = require("express");
// const router = express.Router();
// const userRouter = require("./user");
// const {authMiddleware} = require("../middleware");
// const { Account } = require("../db");
// router.use("/user", userRouter)
// router.use("/account", Account)


// // router.get("/user", (req,res) => {
// //     res.json({message: "hello world"})
// // })


// module.exports = router;


// backend/user/index.js
const express = require('express');
const userRouter = require("./user");
const accountRouter = require("./Account");

const router = express.Router();

router.use("/user", userRouter);
router.use("/account", accountRouter);

module.exports = router;