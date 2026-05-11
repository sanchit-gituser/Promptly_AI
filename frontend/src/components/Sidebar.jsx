import { MessageSquare, Ellipsis, Pin, Pencil, Share, Trash2 } from 'lucide-react'
import { useContext, useEffect, useRef, useState } from 'react';
import { MyContext } from '../context/MyContext';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import DropDown from './DropDown';
import ConfirmModal from './ConfirmModal';

const Sidebar = () => {
    let { allThreads, setAllThreads, currThreadId, setCurrentThreadID, setReply, setPrompt, setNewChat, setPrevChats, setActiveThreadId, } = useContext(MyContext);

    //function to get all threads from database
    const getAllThreads = async () => {
        try {
            let res = await axios.get("http://localhost:3000/threads");


            let usefulData = res.data.map(thread => ({ threadId: thread.thread_id, threadTitle: thread.title }));
            setAllThreads(usefulData);

        } catch (error) {
            console.log(error);
        }
    };

    //function to start new chat
    const startNewChat = () => {
        let newId = uuidv4();
        setNewChat(true);
        setPrompt("");
        setReply(null);
        setCurrentThreadID(newId);
        setPrevChats([]);
    }

    //function to get all chats of thread
    const getThreadChats = async (threadId) => {
        setCurrentThreadID(threadId);
        try {
            let res = await axios.get(`http://localhost:3000/threads/${threadId}`);
            console.log(res.data.messages);
            setNewChat(false);
            setPrevChats(res.data.messages);
            setReply(null);
        } catch (error) {
            console.log(error);
        }
    }

    //for dropdowns
    let [activeThreadID, setActiveThreadID] = useState(null); //default false
    const [dropdownPosition, setDropdownPosition] = useState(null);

    const dropdownRef = useRef(null);
    const portalDropdownRef = useRef(null);//to make sure clicking inside the dropdown doesnt close it because it is no longer part of sidebar in dom because of portal

    const toggleDropdown = (e, id) => {
        e.stopPropagation();
        const rect = e.currentTarget.getBoundingClientRect();

        const spaceBelow = window.innerHeight - rect.bottom;
        const spaceAbove = rect.top;

        const dropdownHeight = 150;
        const openUp = spaceBelow < dropdownHeight;

        setDropdownPosition({
            left: rect.left,
            top: openUp
                ? rect.top - dropdownHeight
                : rect.bottom
        });
        setActiveThreadID(prev => prev === id ? null : id);
    }

    //to handle outside click to close dropdown
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(e.target) &&
                portalDropdownRef.current &&
                !portalDropdownRef.current.contains(e.target)
            ) {
                setActiveThreadID(null);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);


    //delete the thread
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [threadToDelete, setThreadToDelete] = useState(null);

    const handleDeleteClick = (thread) => {
        setThreadToDelete({
            id: thread.threadId,
            title: thread.threadTitle
        });
        setShowDeleteModal(true);
        setActiveThreadID(null);
    };

    //delete confirm
    const handleConfirmDelete = async () => {
        try {
            await axios.delete(`http://localhost:3000/threads/${threadToDelete.id}`);
    
            // UI update (remove thread)
            setAllThreads(prev =>
                prev.filter(t => t.threadId !== threadToDelete.id)
            );
    
            // agar current thread delete ho raha hai
            if (currThreadId === threadToDelete.id) {
                setNewChat(true);
                setPrompt("");
                setReply(null);
                setPrevChats([]);
            }
    
            // modal band
            setShowDeleteModal(false);
            setThreadToDelete(null);
    
        } catch (err) {
            console.log(err);
        }
    };

    //first time all threads getting from database then as new chats created input box handles the sodebar chats showing
    useEffect(() => {
        getAllThreads();
    }, []);

    return (
        <div className="h-screen w-64 bg-[#070E16] border-r border-white/10 flex flex-col overflow-hidden">

            {/* Top Logo Section */}
            <div className="flex items-center gap-3 p-4 border-b border-white/10">

                {/* Logo */}
                <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 text-white font-bold text-xl cursor-default">
                    P
                </div>

                {/* Name */}
                <span className="text-white text-lg font-semibold cursor-default">
                    Promptly AI
                </span>
            </div>


            {/* new chat */}
            <div className="p-3">
                <button onClick={startNewChat} className="w-full flex items-center gap-2 px-4 py-3 rounded-3xl border border-white/10 text-white bg-blue-500/5 hover:shadow-[0_0_10px_rgba(59,130,246,0.3)] hover:bg-blue-500/10 hover:border-blue-400/40   cursor-pointer">

                    {/* Icon */}
                    <span className="text-2xl">＋</span>

                    {/* Text */}
                    <span className="font-medium">New Chat</span>
                </button>
            </div>

            {/* recent chats */}
            <div className='p-3 flex flex-col flex-1 min-h-0'>
                <div className='text-gray-500 font-medium flex items-center justify-center'>RECENT CHATS</div>
                <div className='pb-8 flex-1 overflow-y-auto '>
                    <ul className='text-white list-none'>
                        {allThreads?.map((thread, idx) => {
                            const threadItems = [
                                {
                                    label: "Rename",
                                    icon: Pencil,
                                    onClick: () => console.log("rename", thread.threadId)
                                },
                                {
                                    label: "Share",
                                    icon: Share,
                                    onClick: () => console.log("share", thread.threadId)
                                },
                                {
                                    label: "Pin Thread",
                                    icon: Pin,
                                    onClick: () => console.log("pin", thread.threadId)
                                },
                                {
                                    label: "Delete",
                                    icon: Trash2,
                                    onClick: () => handleDeleteClick(thread)
                                }
                            ];

                            return (
                                <li className={`group flex justify-between px-3 py-2 rounded-3xl  text-white cursor-pointer  mb-1 hover:bg-gray-500/10 ${thread.threadId === currThreadId && "bg-blue-500/10 border border-sky-500/40"}`} key={idx} onClick={() => {getThreadChats(thread.threadId)}}>
                                    <div className=' flex items-center gap-2 '>
                                        <span><MessageSquare size={20} strokeWidth={1.5} /></span>
                                        <span>{thread.threadTitle}</span>
                                    </div>

                                    <div ref={activeThreadID === thread.threadId ? dropdownRef : null} className='relative'>
                                        <div className='flex items-center justify-center  h-6 w-6 rounded-full hover:bg-white/10 opacity-0 group-hover:opacity-100 transition-all duration-200'>
                                            <Ellipsis size={20} strokeWidth={1.5} onClick={(e) => { toggleDropdown(e, thread.threadId) }} />
                                        </div>
                                        {/* dropdown */}
                                        {activeThreadID === thread.threadId && dropdownPosition && (
                                            <DropDown
                                                items={threadItems}
                                                position={dropdownPosition}
                                                isPortal={true}
                                                portalRef={portalDropdownRef}
                                            />
                                        )}
                                    </div>

                                </li>
                            )
                        })}
                    </ul>
                </div>
            </div>

            {showDeleteModal && (
                <ConfirmModal
                    onCancel={() => setShowDeleteModal(false)}
                    onConfirm={() => handleConfirmDelete()}
                    threadToDelete={threadToDelete}
                />
            )}

        </div>

    )
}

export default Sidebar;

