import { Send, Mic } from 'lucide-react'
import { useContext, useEffect } from 'react';
import { MyContext } from '../context/MyContext';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

export default function InputBox() {
    let { prompt, setPrompt, reply, setReply, currThreadId, setGotReply, setPrevChats, setNewChat, allThreads, setAllThreads } = useContext(MyContext);
    let emptyPrompt = prompt.trim() === "";


    let getData = async () => {
        setGotReply(true);
        setNewChat(false);
        try {
            let response = await axios.post("http://localhost:3000/threads",
                {
                    message: prompt,
                    thread_id: currThreadId
                });
            setReply(response.data.messages)
            setGotReply(false);

            
            // ALWAYS refresh sidebar after message
            try {
                let threadsRes = await axios.get("http://localhost:3000/threads");

                let usefulData = threadsRes.data.map(thread => ({
                    threadId: thread.thread_id,
                    threadTitle: thread.title
                }));

                setAllThreads(usefulData);
            } catch (err) {
                console.log(err);
            }

        } catch (error) {
            console.log(error.message);

            setReply([{ role: "model", content: "too many request" }])
        }
    }

    useEffect(() => {
        if (reply) { setPrevChats(reply) } //assigning new array to prevChats every time because evertime reply
        setPrompt("");
    }, [reply])

    return (
        <div className="border-t border-white/10 bg-[#070c1a]  p-4">

            <div className="max-w-3xl mx-auto">

                <div className="
                flex items-center gap-3 
                rounded-2xl 
                border border-white/10 
                bg-[#111827] 
                p-3
                transition-all duration-200
                focus-within:border-blue-400/50 
                focus-within:ring-1
                focus-within:ring-blue-400/60
                ">

                    {/* Input */}
                    <input
                        type="text"
                        placeholder="Message Promptly AI..."
                        className="
                        font-semibold
                        flex-1 
                        bg-transparent 
                        text-white 
                        placeholder-gray-400 
                        outline-none 
                        text-sm        
                        "
                        value={prompt}
                        onChange={(eve) => setPrompt(eve.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" && prompt.trim() !== "") {
                                getData();
                            }
                        }}
                    />

                    {/* Mic Button */}
                    <button className="
                    h-9 w-9 flex items-center justify-center 
                    rounded-xl 
                    text-gray-400 
                    hover:bg-white/5 
                    hover:text-white 
                    transition
                    cursor-pointer
                        ">
                        <Mic size={20} strokeWidth={1} />
                    </button>

                    {/* Send Button */}
                    <button
                        disabled={emptyPrompt}
                        className={`
                    h-9 w-9 flex items-center justify-center 
                    rounded-xl 
                    transition
                    ${emptyPrompt ?
                                "bg-gray-600 text-gray-400 cursor-not-allowed"
                                : "bg-blue-500 text-white hover:bg-blue-600 cursor-pointer"
                            }
                    
                    `}
                        onClick={getData}
                    >
                        <Send size={20} strokeWidth={3} />
                    </button>

                </div>

                {/* Bottom Text */}
                <p className="mt-2 text-center text-xs text-gray-400">
                    Promptly AI can make mistakes. Check important info.
                </p>

            </div>

        </div>
    );
}