import React, { useState, useEffect } from 'react';
import './LiveChat.css';

const LiveChat = () => {
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [username, setUsername] = useState('');
    const [modaltop, setModaltop] = useState("20px");
    const [sosVisible, setSosVisible] = useState(false); // State for SOS modal

    // Fetch messages from server
    const fetchMessages = async () => {
        const response = await fetch('https://wik-backend.onrender.com/messages');
        const data = await response.json();
        setMessages(data);
    };

    useEffect(() => {
        const uname = prompt("Please enter your username");
        setUsername(uname);

        const interval = setInterval(fetchMessages, 5000);
        return () => clearInterval(interval);  // Cleanup
    }, []);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (inputValue.trim() && username) {
            await fetch('https://wik-backend.onrender.com/message', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ uname: username, message: inputValue })
            });
            setInputValue('');
            fetchMessages();
        }
    };

 
    useEffect(() => {
       

        // Xabarlarni har 5 soniyada yangilash va SOS alertni tekshirish
        const interval = setInterval(() => {
            fetchMessages();
            // checkSosAlert();
        }, 5000);
        return () => clearInterval(interval);  // Tozalash
    }, []);

    const cancel = () => {
        console.log("no");
    }

    return (
        <div>
            {/* {sosVisible && (
                <div className="sos-modal" style={{ "top": modaltop }}>
                    <h2 className='text-danger'>SOS! from {username}</h2>
                    <p>{inputValue}</p>
                    <button className='btn btn-success' onClick={() => setSosVisible(false)}>Got it</button>
                </div>
            )} */}

            <div className="live-chat">
                <h3>Live Chat</h3>
                <div className="messages">
                    {messages.map((msgObj, index) => (
                        <div key={index}>
                            <span className="username">{msgObj.from}: </span>
                            <div className="message">{msgObj.body}</div>
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
                    <div className="buttons d-flex" style={{ "justifyContent": "start" }}>
                        <button type="submit">Send</button>
                        {/* <button type="button" className='btn bg-danger sos-btn' onClick={handleSosClick}>SOS</button> */}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LiveChat;
