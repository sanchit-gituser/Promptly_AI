import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import chat from './routes/chat.js';

import 'dotenv/config';

const app = express();
const port = process.env.PORT ||  3000;

//database connection
const databaseUrl=process.env.ATLAS_DB;
main()
.then(()=>{
    console.log("database connected successfully.");
})
.catch(err=>{
    console.log(err);
})


async function main(){
    await mongoose.connect(databaseUrl);
}

// default middlewares
app.use(express.json());
app.use(cors());

//routes


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
