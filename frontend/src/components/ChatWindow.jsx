import { User, Settings, ChevronsDown, LogOut, ShieldPlus, ShieldCheck } from 'lucide-react'
import InputBox from './InputBox';
import DropDown from './DropDown.jsx';
import { useContext, useState,useRef,useEffect } from 'react';
import { MyContext } from '../context/MyContext';
import { RiseLoader } from "react-spinners";
import Chats from './Chats.jsx';

const ChatWindow = () => {
    let { gotReply, newChat, setNewChat } = useContext(MyContext);
    let [isOpen, setIsOpen] = useState(false); //default false
    const dropdownRef = useRef(null);

    const toggleUser=()=>{
        setIsOpen(prev=>!prev);
    }

    //to handle outside click to close dropdown
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(e.target)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const items = [
        { label: "My Plan", icon: ShieldCheck },
        { label: "Upgrade Plan", icon: ShieldPlus },
        { label: "Logout", icon: LogOut }
      ];


    return (
        <div className="h-screen flex-1 flex flex-col bg-[#070c1a]">

            {/* Navbar (inside chatwindow) */}
            <div className="h-12 border-b border-white/10 flex items-center justify-between px-4">

                <div className='flex px-4 py-1 gap-1  rounded-full  cursor-pointer hover:bg-blue-500/10 hover:border-blue-400/40 hover:shadow-[0_0_10px_rgba(135, 206, 235)]'>
                    <h1 className="text-white font-semibold">Promptly AI</h1>
                    <ChevronsDown size={20} strokeWidth={1} className='text-gray-300 ' />
                </div>

                <div className="text-gray-300 flex gap-6 p-4">
                    <div className='cursor-pointer h-8 w-8  flex items-center justify-center rounded-full text-gray-400 hover:bg-white/5 hover:text-white transition'>
                        <Settings size={24} strokeWidth={0.75} />
                    </div>

                    <div ref={dropdownRef} className='relative'>
                        <div className='cursor-pointer h-8 w-8  flex items-center justify-center rounded-full text-white bg-sky-500  hover:bg-blue-500 hover:text-white transition' onClick={toggleUser}>
                            <User size={24} strokeWidth={2} />
                        </div>
                        {/* dropdown */}
                        {isOpen && (<DropDown  items={items} />)}
                        
                    </div>

                    
                </div>
            </div>

            {/* Chat area (empty for now) */}
            <Chats />

            <RiseLoader color='white' className='mx-auto my-4' loading={gotReply} />

            {/* Input Box */}
            <InputBox />

        </div>
    )
}

export default ChatWindow;