import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import chat from './routes/chat.js';

import wrapAsync from './utils/wrapAsync.js';
import getData from './utils/geminiData.js';


const app = express();
const port = 3000;

//database connection
main()
.then(()=>{
    console.log("database connected successfully.");
})
.catch(err=>{
    console.log("connection to database failed.");
})


async function main(){
    await mongoose.connect("mongodb://localhost:27017/Promptly-AI");
}

// default middlewares
app.use(express.json());
app.use(cors());

//routes
// app.post("/getData",wrapAsync(async(req,res,next)=>{
//     const data=await getData(req.body.prompt);
//     console.log("data sent to user");
//     res.send(data);
// }))

app.use("/threads",chat);


//global error handling middleware
app.use((err,req,res,next)=>{
    const {message="some error occures",status=500}=err;
    console.log(message);
    res.status(status).send(message);
})

app.listen(port, () => {
    console.log("server started!");
});
