const {Router}=require("express")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
require("dotenv").config()
const { userModel } = require("../Model/User.model")
const UserController=Router()

UserController.post("/signup",async(req,res)=>{
    const {email,password,age}=req.body
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Username already exists' });
    }
    bcrypt.hash(password,4,async function(err,hash){
        if(err){
            res.send("Something Went WRong")
        }
        const user= new userModel({
            email,
            password:hash,
            age
        })
        try{
            await user.save()
        res.send({msg:"Signup suc"})
        }
        catch(err){
            console.log(err)
            res.send({msg:"Something Went wrong"})
        }
        
    })
    
})

UserController.post("/login",async(req,res)=>{
    const {email,password}=req.body
    const user=await userModel.findOne({email})
    const hash=user.password
    bcrypt.compare(password,hash,async function(err,result){
        if(err){
            res.json("Something went WRog..")
        }
        if(result){
            const token=jwt.sign({userId:user._id},process.env.JWTSECRET)
            res.send(token)
        }
        else{
            res.json("Email or password Wrong..")
        }
    })
    
})


module.exports={
    UserController
}