import { createContext, useState } from "react";
import { v4 as uuidv4 } from 'uuid';

export const MyContext=createContext(null);

export const MyContextProvider= (props)=>{
    let [prompt,setPrompt]=useState("");
    let [reply,setReply]=useState(null);
    let [currThreadId,setCurrentThreadID]=useState(uuidv4());
    let [gotReply,setGotReply]=useState(false);
    let [prevChats,setPrevChats]=useState([]);
    let [newChat,setNewChat]=useState(true);
    let [allThreads,setAllThreads]=useState([]);
    

    let providerValues={
        prompt,setPrompt,
        reply,setReply,
        currThreadId,setCurrentThreadID,
        gotReply,setGotReply,
        prevChats,setPrevChats,
        newChat,setNewChat,
        allThreads,setAllThreads
        
    };

    return(
        <MyContext.Provider value={providerValues}>
            {props.children}
        </MyContext.Provider>
    )
}