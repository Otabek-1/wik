import React, { useState, useEffect } from 'react';
import './LiveChat.css';
import "../../fontawesome-free-6.6.0-web/css/all.css";

const LiveChat = () => {
    const url = "https://wik-backend.onrender.com";
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [username, setUsername] = useState('');
    const [modaltop, setModaltop] = useState("20px");
    const [sosVisible, setSosVisible] = useState(false); // State for SOS modal
    const [replyVisible, setReplyVisible] = useState(null); // To track which message's reply field is visible
    const [repliesVisible, setRepliesVisible] = useState(null);
    const [replyMessage, setReplyMessage] = useState('');

    const [repliedMessages, setRepliedMessages] = useState([]);

    const colors = ["blue", "white", "red", "green", "yellow", "magenta", "cyan"];
    const handleRightClick = () => {
        alert("Right Click")
    }

    // Fetch messages from server
    const fetchMessages = async () => {
        const response = await fetch('https://wik-backend.onrender.com/messages');
        const data = await response.json();
        setMessages(data);
    };

    const fetchReplies = async () => {
        const response = await fetch('https://wik-backend.onrender.com/replyall');
        const data = await response.json();
        setRepliedMessages(data);
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


    const handleSendReply = async (index, e) => {
        await fetch('https://wik-backend.onrender.com/reply', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: index,
                body: replyMessage
            })
        })
            .then(res => {
                console.log(res);
            })
        setReplyMessage("");
        e.target.value = "";
    }

    useEffect(() => {
        const interval = setInterval(() => {
            fetchMessages();
        }, 1000);
        return () => clearInterval(interval);  // Cleanup
    }, []);

    const handleReplyClick = (index) => {
        setReplyVisible(replyVisible === index ? null : index); // Toggle visibility
    };

    const handleRepliesClick = (index) => {
        setRepliesVisible(repliesVisible === index ? null : index); // Toggle visibility
    };


    useEffect(() => {
        const interval = setInterval(() => {
            fetchReplies();
        }, 1000);
        return () => clearInterval(interval);  // Cleanup
    }, [])

    return (
        <div>
            <div className="live-chat">
                <h3>Live Chat</h3>
                <div className="messages">
                    {messages.map((msgObj, index) => (
                        <div key={index} className="message-container" onContextMenu={handleRightClick}>
                            <span className="username">{msgObj.from}: </span>
                            <div className="message">{msgObj.body}
                                <i
                                    className='fas fa-reply reply-btn'
                                    onClick={() => handleReplyClick(index)}>
                                </i>

                                <i className="fas fa-ellipsis-v show-replies" onClick={() => handleRepliesClick(index)}></i>
                            </div>

                            {replyVisible === index && (
                                <div className="reply-field">
                                    <input
                                        type="text"
                                        name=""
                                        id=""
                                        className="reply-input"
                                        placeholder="Reply here..."
                                        onChange={(e) => { setReplyMessage(e.target.value) }}
                                    />
                                    <i className='fas fa-plane' onClick={(e) => handleSendReply(index, e)} ></i>
                                </div>
                            )}

                            {repliesVisible === index && (
                                <div className="show-replies-box">
                                    <span>Replies</span>
                                    <div className="replies-texts">
                                        {repliedMessages.map(replied => {
                                            if (replied.id == index) {
                                                return (
                                                    <span className="replied-text">{replied.body}</span>
                                                )
                                            }

                                        })}

                                    </div>
                                </div>
                            )}
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
                    <div className="buttons d-flex" style={{ "justifyContent": "start", "columnGap": "10px" }}>
                        <button type="submit">Send</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LiveChat;
