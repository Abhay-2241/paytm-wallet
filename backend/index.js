const express = require("express");
const cors = require("cors");

// const mongoose = require("mongoose");
const app = express();

app.use(cors());
app.use(express.json());


const mainRouter = require("./route/index");
app.use("/api/v1", mainRouter);
app.use("/api/v2", mainRouter);


app.listen(3000);

