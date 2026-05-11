import mongoose from "mongoose";

//embedding messages in the threads only not creating a sepearte model
const messageSchema=new mongoose.Schema({
    role:{
        type:String,
        enum:["user","model"],
        required:true
    },
    content:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
});

const threadSchema=new mongoose.Schema({
    thread_id:{
        type:String,
        required:true,
        unique:true
    },
    title:{
        type:String,
        default:"New Chat"
    },
    messages:[messageSchema]
},{timestamps:true});

const Thread=mongoose.model("Thread",threadSchema);


export default Thread;