import React, { useEffect, useState } from 'react';
import "./Main.css";
import "../../fontawesome-free-6.6.0-web/css/all.min.css";
import axios from 'axios';

export default function Mainchat() {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");
    const [suggestions, setSuggestions] = useState([]); // Tavsiyalarni saqlash uchun holat
    const [image, setImage] = useState(null);
    const user = JSON.parse(window.localStorage.getItem('User'));
    const userId = user?.id;

    const functionsOfAI = [
        { text:"#find", desc:"Findes informations that includes this keyword"},
        { text:"#help", desc:"Shows all constructions of using this functions"}
    ]
    
    

    const data = {
        id: userId,
        from: user?.uname,
        body: message,
        image: image?.null
    };

    useEffect(() => {
        const interval = setInterval(() => {
            axios.get("http://localhost:4000/messages")
                .then(res => setMessages(res.data));
        }, 5000);
        return () => clearInterval(interval); // Clear interval when component unmounts
    }, []);

    const sendMessage = () => {
        if (message.trim() !== "") {
            axios.post("http://localhost:4000/send", data, {
                "Content-type": "application/json"
            })
                .then(res => {
                    console.log(res);
                    setMessage(""); // Set message to empty string after sending
                    setSuggestions([]); // Clear suggestions after sending
                });
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    };

    useEffect(() => {
        if (message && message.startsWith("#")) {
            // Faqat `#` bilan boshlangan holatda tavsiyalarni ko‘rsatish
            const filteredSuggestions = functionsOfAI.filter(f => f.text.startsWith(message));
            setSuggestions(filteredSuggestions);
        } else {
            setSuggestions([]); // Agar `#` boshlanmasa, tavsiyalarni yashirish
        }
    }, [message]);

    const handleSuggestionClick = (text) => {
        setMessage(text); // Tanlangan tavsiyani input maydoniga kiritadi
        setSuggestions([]); // Tavsiyalarni yashiradi
    };

    function handleSuggestions() {
        return (
            <div className="ai-suggestions">
                {suggestions.map((suggestion, index) => (
                    <div className="ai-suggestion" key={index} onClick={() => handleSuggestionClick(suggestion.text)}>
                        <span><strong>{suggestion.text}</strong> {suggestion.desc}</span>
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div className='main-chat-box'>
            <div className="main-chat-head">
                <h3>Server</h3>
                <span><i className='fas fa-user'></i>: 15/20</span>
            </div>
            <div className="main-chat-body">
                {
                    messages.map((message) => (
                        <div className='message' style={{ position: "relative" }} key={message.id}>
                            <span className="from">{message.id === userId ? null : message.from}</span>
                            <div className={message.id === userId ? "message-from-u" : "message-from-server"}>
                                {message.body}
                            </div>
                        </div>
                    ))
                }
            </div>

            <div className="main-chat-send-box">
                {suggestions.length > 0 && handleSuggestions()}

                <i className='fas fa-file'>
                    <input type="file" name="file" id="file" />
                </i>
                <input
                    type="text"
                    name="text"
                    id="text"
                    placeholder='Send here...'
                    className='message-input'
                    value={message} // Input value bound to state
                    onChange={(e) => setMessage(e.target.value)} // Update state on input change
                    onKeyDown={handleKeyDown} // Trigger sendMessage on Enter key press
                />
                <i className='fas fa-paper-plane' onClick={sendMessage}></i>
            </div>
        </div>
    );
}
