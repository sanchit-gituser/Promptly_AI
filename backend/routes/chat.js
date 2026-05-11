import express from "express";
import Thread from "../models/Thread.js";
import wrapAsync from "../utils/wrapAsync.js";
import ExpressError from "../utils/ExpressError.js";
import getData from "../utils/geminiData.js";
const router=express.Router();

//get all chats
router.get("/",wrapAsync(async(req,res)=>{
    const threads=await Thread.find({}).sort({updatedAt:-1});
    res.send(threads);
}));

//particular id chat
router.get("/:id",wrapAsync(async(req,res)=>{
    const chat=await Thread.findOne({thread_id:req.params.id});

    if(!chat){
        throw new ExpressError("chat not found",404)
    }

    res.send(chat);
}));

//delete chat
router.delete("/:id",wrapAsync(async(req,res)=>{
    const deleteChat=await Thread.findOneAndDelete({thread_id:req.params.id});

    if(!deleteChat){
        throw new ExpressError("chat not found",404);
    }
    
    res.send("chat deleted");
}));

//new message or thread
router.post("/",wrapAsync(async(req,res)=>{
    let{thread_id,message}=req.body;

    if(!thread_id || !message){   //both threadid and message should be present to proceed further additon of new messages
        throw new ExpressError("fields missing",400);
    }

    let thread=await Thread.findOne({thread_id});
    if(!thread){      //if new thread is to be created 
        thread=new Thread({
            thread_id:thread_id,
            title:message,
            messages:[{role:"user",content:message}]
        });
    }
    else{     //prexisting thread
        thread.messages.push({role:"user",content:message});
    }
    //pushing api response also
    const geminiResponse=await getData(message);
    thread.messages.push({role:"model",content:geminiResponse});

    thread.updatedAt=new Date();

    await thread.save();
    
    console.log("new messages added");
    res.send(thread);
}))

export default router;