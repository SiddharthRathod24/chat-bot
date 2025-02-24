import socketIO from "socket.io-client";
import './App.css'
import Join from "./component/Join";
import {BrowserRouter as Router, Route, Routes } from "react-router-dom";
import chat from "./component/chat/chat";

// const ENDPOINT= 'http://localhost:4500/';
// const socket=socketIO(ENDPOINT , { transports:['websocket']});


function App() {
  
  // socket.on("connect", () => {
    
  // })

  return (
   <div className='App'>
      <Router>
          <Routes>
            <Route exact path="/"Component={Join} />
            <Route path="/chat" Component={chat}/>
          </Routes>

      </Router>
   </div>
  )
}

export default App
