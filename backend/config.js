
const passport=require('passport');
const mongoose=require("mongoose");

require("./models/User");
const LocalStrategy=require("passport-local").Strategy;
const User=mongoose.model("User");
passport.use(new LocalStrategy({usernameField:'email'},(username,password,done)=>{
	User.findOne({email:username},(err,user)=>{
		if(err) { return done(err);}
		if(!user){
			return done(null,false,{
				message:'Incorrect username'
			})
		}
		if(!user.validPassword(password)){
			return done(null,false,{
				message:'Incorrect Password'
			})
		}
		return done(null,user);
	})
}))