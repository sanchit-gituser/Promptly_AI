import { MyContext } from "../context/MyContext";
import { useContext, useState, useEffect } from "react";
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import "highlight.js/styles/github-dark.css";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";

const Chats = () => {
    let { newChat, setNewChat, prevChats, reply } = useContext(MyContext);

    let [latestMessage, setLatestMessage] = useState(null);

    // typing effect for latest reply
    useEffect(() => {
        if (!reply || !reply.length) { setLatestMessage(null); return; }; //for a new chat reply is alwyas empty and for moving from current thread to another thread make reply null to not apply typing effect fot the last message

        const lastMessage = reply[reply.length - 1];

        // safety check
        if (!lastMessage || !lastMessage.content) return;


        let words = lastMessage.content.split(" ");
        let idx = 0;

        setLatestMessage(""); // reset

        const interval = setInterval(() => {
            setLatestMessage(words.slice(0, idx + 1).join(" "));
            idx++;

            if (idx >= words.length) clearInterval(interval);
        }, 10);

        return () => clearInterval(interval);

    }, [reply]);


    return (
        <div className={`p-4 flex-1 mb-2 overflow-y-auto`}>
            <div className="max-w-3xl mx-auto h-full  ">
                {newChat && (
                    <div className="h-full flex items-center justify-center text-white font-semibold text-2xl">
                        Where Should We Start ?
                    </div>
                )}

                {/* messages */}
                {/* Previous messages (excluding the last one if typing) */}
                {!newChat && (
                    <div className="h-full flex flex-col gap-4">
                        {prevChats?.slice(0, -1).map((chat, idx) => (
                            <div className={`flex ${chat.role === "user" ? "justify-end" : "justify-start"}`} key={idx}>
                                <div className={`text-white px-4 py-2 max-w-[75%] ${chat.role === "user" ? "bg-[#009ED8] rounded-[10px_20px_6px_15px]" : "bg-[#111827] border border-white/10 rounded-[20px_20px_15px_6px]"}`}>
                                    <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeHighlight, rehypeKatex]}>
                                        {chat.content}
                                    </ReactMarkdown>
                                </div>
                            </div>
                        ))}

                        {/* Latest message handling */}
                        {prevChats?.length > 0 && (
                            <div className={`flex ${prevChats[prevChats.length - 1].role === "user" ? "justify-end" : "justify-start"}`}>
                                <div className="text-white bg-[#111827] border border-white/10 px-4 py-2 inline-block w-fit max-w-[100%] break-words rounded-[20px_20px_15px_6px]">
                                    <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeHighlight, rehypeKatex]}>
                                        {latestMessage !== null ? latestMessage : prevChats[prevChats.length - 1].content}
                                    </ReactMarkdown>
                                </div>
                            </div>
                        )}
                    </div>
                )}



            </div>
        </div>
    )
}

export default Chats;