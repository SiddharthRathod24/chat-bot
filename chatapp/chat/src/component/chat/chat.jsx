import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import socketIo from "socket.io-client";
import "./chat.css";  // Ensure this file exists

const ENDPOINT = "http://localhost:4500";
let socket;

const Chat = () => {
    const location = useLocation();
    const [name, setName] = useState("");
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const userName = params.get("name");
        setName(userName);

        socket = socketIo(ENDPOINT, { transports: ["websocket"] });

        socket.on("connect", () => {
            console.log("Connected to server");
            socket.emit("joined", { user: userName });
        });

        socket.on("message", (data) => {
            setMessages((prev) => [...prev, data]);
        });

        socket.on("userJoined", (data) => {
            setMessages((prev) => [...prev, data]);
        });

        socket.on("leave", (data) => {
            setMessages((prev) => [...prev, data]);
        });

        return () => {
            socket.disconnect();
        };
    }, [location.search]);

    const sendMessage = () => {
        if (message.trim() && socket) { 
            socket.emit("message", { user: name, message });
            setMessages((prev) => [...prev, { user: name, message }]);
            setMessage("");
        }
    };  
    return (
        <div className="ChatPage">
            <div className="ChatContainer">
                <h1>Chat Room</h1>
                <div className="MessageBox">
                    {messages.map((msg, index) => (
                        <p key={index}>
                            <strong>{msg.user}:</strong> {msg.message}
                        </p>
                    ))}
                </div>
                <div className="InputBox">
                    <input
                        type="text"
                        placeholder="Type a message..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                    />
                    <button onClick={sendMessage}>Send</button>
                </div>
            </div>
        </div>
    );
};

export default Chat;
