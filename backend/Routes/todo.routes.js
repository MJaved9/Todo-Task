const {Router, application}=require("express")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
require("dotenv").config()
const { todoModel } = require("../Model/Todo.model")
const TodosController=Router()

TodosController.get("/",async(req,res)=>{

    const todo=await todoModel.find({userId:req.body.userId})
    res.send(todo)
})


TodosController.post("/create",async(req,res)=>{
    const {Todo,completed,userId}=req.body
    const task=new todoModel({
        Todo,completed,userId
    })
    try{
        await task.save()
        res.send("Todo Created..")
    }
    catch(err){
        res.send({"msg":"Something wrong..","err":err})
    }
})

TodosController.delete("/delete/:todoId",async(req,res)=>{
    const {todoId}=req.params
    const deleteTodo=await todoModel.findByIdAndDelete({_id:todoId.at,userId:req.body.userId})
    if(deleteTodo){
        res.send("deleted")
    }
    else{
        res.send("could't deleted..")
    }
})

TodosController.patch("/edit/:todoId",async(req,res)=>{
    const {todoId}=req.params
    const updateTodo=await todoModel.findOneAndUpdate({_id:todoId,userId:req.body.userId},{...req.body})
    if(updateTodo){
        res.send("Updated")
    }
    else{
        res.send("could't Updated..")
    }
    
})
TodosController.get("/:id",async(req,res)=>{
    const {id}=req.params
    const data=await todoModel.findById({_id:id,userId:req.body.userId})
    if(data){
        res.send(data)
    }
    else{
        res.send("Not Found")
    }
})

module.exports={
    TodosController
}