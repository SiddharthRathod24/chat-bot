const http = require("http");
const express = require("express");
const cors = require("cors");
const socketIO = require("socket.io");

const app = express();
const port = process.env.PORT || 4500;

app.use(cors());

app.get("/", (req, res) => {
    res.send("Server is running...");
});

const server = http.createServer(app);
const io = socketIO(server);

const users = {};

io.on("connection", (socket) => {
    console.log("New user connected:", socket.id);

    socket.on("joined", ({ user }) => {
        users[socket.id] = user;
        console.log(`${user} joined`);

        socket.broadcast.emit("userJoined", {
            user: "Admin",
            message: `${user} has joined the chat`,
        });

        socket.emit("welcome", {
            user: "Admin",
            message: `Welcome to the chat, ${user}!`,
        });

        // Chatbot Greeting
        setTimeout(() => {
            socket.emit("message", {
                user: "ChatBot ",
                message: `Hello ${user}, how can I assist you today?`,
            });
        }, 2000);
    });

    socket.on("message", ({ user, message }) => {
        io.emit("message", { user, message });

        // Simple Chatbot Response
        if (message.toLowerCase().includes("hello")) {
            setTimeout(() => {
                io.emit("message", {
                    user: "ChatBot ",
                    message: `Hi ${user}! How can I help you?`,
                });
            }, 1000);
        } else if (message.toLowerCase().includes("how are you")) {
            setTimeout(() => {
                io.emit("message", {
                    user: "ChatBot ",
                    message: `I'm just a bot, but I'm doing great! What about you?`,
                });
            }, 1000);
        } else if (message.toLowerCase().includes("bye")) {
            setTimeout(() => {
                io.emit("message", {
                    user: "ChatBot ",
                    message: `Goodbye ${user}! Have a great day! `,
                });
            }, 1000);
        }
    });

    socket.on("disconnect", () => {
        console.log(`${users[socket.id]} disconnected`);
        socket.broadcast.emit("leave", {
            user: "Admin",
            message: `${users[socket.id]} has left the chat`,
        });
        delete users[socket.id];
    });
});

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
