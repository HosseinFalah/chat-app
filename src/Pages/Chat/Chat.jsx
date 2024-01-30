import { useEffect, useRef, useState } from "react"
import { useLocation } from "react-router-dom";
import { io } from "socket.io-client";

const Chat = () => {
    const Location = useLocation();

    const inputRef = useRef();
    const messageBoxRef = useRef(null);

    const [messages, setMessages] = useState([])
    const [titleMessage, setTitleMessage] = useState('');
    
    const socket = io('http://localhost:3000/socket');
    
    useEffect(() => {
        socket.on('newMessage', message => {
            setMessages(prevMessage => [...prevMessage, message]);
        });

        socket.on('deleteMessage', id => {
            setMessages(prevMessage => prevMessage.filter(message => message.id !== id))
        })
    }, [])

    messageBoxRef.current?.scrollTo(0, messageBoxRef.current?.scrollHeight);

    const handleSendMessage = () => {
        if (titleMessage.length && titleMessage.trim()) {            
            socket.emit('newMessage', {
                id: crypto.randomUUID(),
                message: titleMessage,
                sender: {
                    name: Location.state.name,
                    gender: Location.state.gender
                },
                date: new Date().toLocaleTimeString({ language: 'fa' })
            });

            setTitleMessage('');
    
            inputRef.current.focus();

            messageBoxRef.current?.scrollTo(0, messageBoxRef.current?.scrollHeight);
        }
    }

    const handleKeyDown = e => {
        if (e.key === "Enter") {
            handleSendMessage()
        }
    }

    const handleRemoveMessage = (id) => {
        socket.emit('deleteMessage', id);
    }

    return (
        <div className="bg-neutral-700 min-h-screen">
            <div className="flex items-center justify-center h-screen">
                <div className="max-w-screen-xl m-auto w-full">
                    <div className="bg-neutral-600">
                        <h1 className="text-2xl text-center p-4 text-white font-semibold">به چت trello خوش آمدید</h1>
                    </div>
                    <div className="bg-neutral-500 h-96 p-8 space-y-4 overflow-y-scroll scroll-smooth" ref={messageBoxRef}>
                        {!!messages.length && messages.map((message, index) => (
                            <div className={`${message.sender.gender === 'famale' ? 'flex items-center justify-end gap-x-4' : 'flex items-center gap-x-4'}`} key={index}>
                                <img 
                                    className="w-14 h-14 object-cover rounded-full" 
                                    src={`${message.sender.gender === 'male' ? '/Images/profile.jpg' : '/Images/profile_1.jpg'}`} 
                                    alt={message.sender.name}
                                />
                                <div className="bg-stone-700 p-3 rounded-lg drop-shadow-2xl shadow-2xl">
                                    <span className="text-xs text-red-500 font-bold">{message.sender.name}</span>
                                    <p className="text-lg font-medium text-white">{message.message}</p>
                                    <span className="text-xs text-red-500 font-bold">{message.date}</span>
                                </div>
                                <button className="bg-red-500 text-white p-2 rounded-xl cursor-pointer" onClick={() => handleRemoveMessage(message.id)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                    </svg>
                                </button>
                            </div>
                        ))}
                    </div>
                    <div className="bg-neutral-600 flex items-center gap-x-4 p-5">
                        <div className="w-full">
                            <input 
                                type="text" 
                                className="bg-zinc-700 p-4 outline-none text-white w-full placeholder:text-lg placeholder:font-medium placeholder:text-gray-100" 
                                placeholder="گفتگو را شروع کنید..."
                                value={titleMessage}
                                onChange={e => setTitleMessage(e.target.value)}
                                onKeyDown={handleKeyDown}
                                ref={inputRef}
                                />
                        </div>
                        <button 
                            className="bg-gradient-to-tr from-purple-700 to-purple-400 p-4 px-8 rounded-lg text-white font-semibold text-xl"
                            onClick={handleSendMessage}    
                        >
                            ارسال
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Chat