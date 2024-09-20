import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import './LiveChat.css';

const socket = io('http://localhost:4000');  // Serverga ulanish

const LiveChat = () => {
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [username, setUsername] = useState(''); // Foydalanuvchi nomi uchun holat
    const [openClose, setOpenClose] = useState(">");

   
    useEffect(() => {
        // Foydalanuvchining nomini so'raymiz
        const uname = prompt("Please enter your username");
        setUsername(uname);

        // Har safar yangi xabar kelganda "receiveMessage" eventini tinglaymiz
        socket.on('receiveMessage', ({ message, uname }) => {
            setMessages((prevMessages) => [...prevMessages, { message, uname }]);
        });

        // Komponent ochirilganda ulanishni yopish
        return () => {
            socket.off('receiveMessage');
        };
    }, []);

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (inputValue.trim() && username) {
            // Foydalanuvchi nomi bilan xabarni serverga jo'natamiz
            socket.emit('sendMessage', { message: inputValue, uname: username });
            setInputValue('');  // Input maydonini tozalaymiz
        }
    };

    return (
        <div className="live-chat">
            {/* <div className="open-close-button" onClick={controlOpenClose} >{openClose}</div> */}
            <h3>Live Chat</h3>
            <div className="messages">
                {messages.map((msgObj, index) => (
                    <div>
                        <span className="username">{msgObj.uname}: </span>
                        <div key={index} className="message">

                            {msgObj.message}
                        </div>
                    </div>

                ))}
            </div>
            <form onSubmit={handleSendMessage} className="chat-input">
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Type a message..."
                />
                <button type="submit">Send</button>
            </form>
        </div>
    );
};

export default LiveChat;
