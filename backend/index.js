

require("dotenv").config();
const express=require("express");
const mongoose=require("mongoose");
const crypto=require("crypto");
const app=express();
const cors = require("cors");
const auth = require('./routes/routes');
const bodyParser = require('body-parser');

const passport=require("passport");
require("./models/User");


require("./config");
const login=require("./controllers/login");
const signup=require("./controllers/signup");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(passport. initialize());
app.listen(3000,()=>{
	console.log("Listen on 3000");
});

const connect=mongoose.connect("mongodb://localhost:27017/login",{useNewUrlParser:true,useUnifiedTopology:true,useCreateIndex: true}).then((db)=>{
	console.log("Db created");
},(err)=>console.log(err));

app.post("/signup",signup);
app.post("/login",login);
app.use((err,req,res,next)=>{
	if(err.name==="UnauthorizedError"){
		res.status(401).json({"message":err.name+": "+err.message});
	}
})


// console.log(process.env.JWT_SECRET);