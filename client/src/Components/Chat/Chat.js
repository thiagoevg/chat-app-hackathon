import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import uuid from "uuid/v4";
import "./Chat.css";

const myId = uuid();
const socket = io("http://localhost:8080");
socket.on("connect", () =>
  console.log("[IO] Connect => A new connection has been established")
);

const Chat = ({ match }) => {
  const [message, updateMessage] = useState("");
  const [messages, updateMessages] = useState([]);

  const userName = match.params.user;

  useEffect(() => {
    const handleNewMessage = (newMessage) =>
      updateMessages([...messages, newMessage]);
    socket.on("chat.message", handleNewMessage);
    return () => socket.off("chat.message", handleNewMessage);
  }, [messages]);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (message.trim()) {
      socket.emit("chat.message", {
        id: myId,
        message,
        userName,
      });
      updateMessage("");
    }
  };

  return (
    <main className="container">
      <ul className="list">
        {messages.map((msg, index) => (
          <li
            className={`list__item list__item--${
              msg.id === myId ? "mine" : "other"
            }`}
            key={index}
          >
            <span
              className={`message message--${
                msg.id === myId ? "mine" : "other"
              }`}
            >
              {msg.message}
            </span>
            {msg.id === myId ? null : <div><small>{msg.userName}</small></div>}
          </li>
        ))}
      </ul>
      <form className="form" onSubmit={handleFormSubmit}>
        <input
          className="form__field"
          onChange={(event) => updateMessage(event.target.value)}
          placeholder="Type a new message here"
          type="text"
          value={message}
        />
      </form>
    </main>
  );
};

export default Chat;
