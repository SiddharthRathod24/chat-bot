import React, { useState } from "react";
import "./Join.css";
import { Link } from "react-router-dom";

const Join = () => {
    const [name, setName] = useState("");

    return (
        <div className="JoinPage">
            <div className="JoinContainer">
                <img 
                    src="https://e7.pngegg.com/pngimages/546/340/png-clipart-livechat-online-chat-logo-computer-icons-live-chat-miscellaneous-face-thumbnail.png" 
                    alt="logo" 
                />
                <h1>Join Chat</h1>
                <input
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter Your Name"
                    type="text"
                    id="joinInput"
                    value={name}
                />
                <Link onClick={(event) => !name ? event.preventDefault() : null} to={`/chat?name=${name}`}>
                    <button className="joinbtn">Login</button>
                </Link>
            </div>
        </div>
    );
};

export default Join;
