const express = require("express");
const cors = require("cors");

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const moment = require("moment");
const today = moment().format();
const bcrypt = require("bcrypt");
const saltRounds = 10;

const jwt = require("jsonwebtoken");
const app = express();

const mysql = require("mysql2/promise");
const Promise = require("bluebird");

require("dotenv").config();
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE,
  dateStrings: true,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  //把資料庫的時間弄對
});

// const connection = require("./database/db")
//middleware
app.use(express.json());
app.set("view engine", "jade");
app.use(
  cors()
);
app.use(cookieParser())
app.use(
  session({
    key: "userId",
    secret: "subscribe",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 60 * 60 * 24,
    },
  })
);

// const register = require('./api/Register')
// const login =require('./api/Login')

// app.use("/login",login)
// app.use("/register",register)

app.use(function (req, res, next) {
  console.log(`有人在${today}來訪問`);
  next();
});

app.post("/register", (req, res) => {
  const account = req.body.account;
  const password = req.body.password;
  console.log(account);
  console.log(password);
  pool.query(
    "INSERT INTO users (account,password) VALUES(?,?)",
    [account, password],
    (err, result) => {
      console.log(err);
    }
  );
});

app.get("/login",(req,res) =>{
  if(req.session.user){
    res.send({loggedIn:true,user:req.session.user})
  }else{
    res.send({loggedIn:false})
  }
})

app.post("/login", (req, res) => {
  const account = req.body.account;
  const password = req.body.password;
  console.log(account);
  console.log(password);
  pool.query(
    "SELECT * FROM users WHERE account =?;",
    account,
    (err, result) => {
      console.log(result)
      if(err){
        console.log(err);
      }
      if(result.length>0){
        req.session.user = result
        console.log(result)
        res.send(result)
      }else{
        res.send({message:"wrong account or password"})
      }
    }
  );
});


app.listen(3001, () => {
  console.log("running server");
});

module.exports = app;
