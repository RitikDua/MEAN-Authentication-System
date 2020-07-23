const passport=require('passport');
const mongoose=require("mongoose");
const User=mongoose.model("User");
const Client=require("../models/client");
const signup=(req,res)=>{
	if(!req.body.name||!req.body.email||!req.body.password){
		return res.status(400).json({"message":"All fields required"});
	}
	let proceed=true;
	const user=new User();
	user.name=req.body.name;

	user.email=req.body.email;
	
				user.setPassword(req.body.password);
	let p=new Promise((resolve,reject)=>{ 
		User.findOne({name:user.name,email:user.email},(err,usr)=>{
			if(err){ console.log("Errror"+err); }
			console.log(usr);
			if(usr)
			{	
				res.status(409).json({"message":"user with this username or email already present"});
			}
			else{
				user.save((err)=>{
				if(err){
					console.log(err);
					res.json(err);
				}
				else{
					const token=user.generateJwt();
					User.findOne({name:user.name,email:user.email},(err,usr)=>{
						if(err) console.log(err);
						else Client.create({userId:user._id,username:user.name});
					})
					res.status(200).json({token});
				}
			})}
		
		});//.catch((err)=>next(err));
	
	}).catch((err)=>next(err));;

	}

module.exports=signup;
