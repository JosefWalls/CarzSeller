require("dotenv").config();
const express = require("express");
const session = require("express-session");
const massive = require("massive");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors")

app.use(express.json());
app.use(cors());

const uri = process.env.AUTH_URI;
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true});

const connection = mongoose.connection;
connection.once("open", () => {
    console.log("MongoDB connected")
})

app.use(session({
    secret: "Autoclone",
    saveUninitialized: true,
    resave: false
}))

const authRouter = require("./routes/auth");
const CarRouter = require("./routes/Cars");
const userRouter = require("./routes/Users");

app.use("/autoClone", authRouter);
app.use("/autoClone/Car", CarRouter);
app.use("/autoClone/User", userRouter);

app.listen(4020, () => console.log("Port 4020"))