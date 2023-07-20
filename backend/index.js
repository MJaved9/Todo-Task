const express=require("express")
const {connection} = require("./Config/db")
const {UserController}=require("./Routes/user.routes")
const {TodosController}=require("./Routes/todo.routes")
const cors=require("cors")
const PORT=8080
const {authentication}=require("./middlewares/authentication")
const app=express()
app.use(express.json())
app.use(cors())

app.use("/user",UserController)
app.use(authentication)
app.use("/todo",TodosController)






app.listen(PORT,async()=>{
    try{
        await connection
        console.log("DB Connection Okkk")
    }
    catch(err){
        console.log("Error i DB",err)
    }
    console.log(`Listening on PORT ${PORT}`)
})