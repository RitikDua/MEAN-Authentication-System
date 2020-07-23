const express=require("express");
const router=express.Router();
const jwt=require("jsonwebtoken")

const auth=(req,res,next)=>{
	const authHeader=req.headers['authorization'];
	const token =authHeader&&authHeader.split(' ')[1];
	if(token==null) return res.sendStatus(401);
	jwt.verify(token,process.env.JWT_SECRET,(err,user)=>{
		if(err) return res.sendStatus(403)
			req.user=user;
		next();
	})
}
// router.route("/add").get(auth,(req,res)=>{
// 	res.send("helllko");

// })

module.exports=auth;