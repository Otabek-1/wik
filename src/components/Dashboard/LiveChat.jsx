import React, { useState } from 'react';
import './LiveChat.css';

const LiveChat = () => {
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (inputValue.trim()) {
            setMessages([...messages, inputValue]);
            setInputValue(''); // Clear the input field
        }
    };

    return (
        <div className="live-chat">
            <h3>Live Chat</h3>
            <div className="messages">
                {messages.map((msg, index) => (
                    <div key={index} className="message">
                        {msg}
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
}

export default LiveChat;
