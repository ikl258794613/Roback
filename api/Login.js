// const express = require("express");
// const router = require('express').Router(); 

// const connection = require("../database/db");

// router.get('/', (req, res) => {
//   if (req.session.user) {
//     res.send({ loggedIn: true, user: req.session.user });
//   } else {
//     res.send({ loggedIn: false });
//   }
// });

// router.post('/', async (req,res)=>{
//   const username = req.body.username
//   const password = req.body.password

//   const response = await connection.queryAsync('SELECT * FROM user WHERE account = ?;',username)
//   console.log(response)
// })