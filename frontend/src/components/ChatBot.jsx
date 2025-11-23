import React, { useState, useEffect, useRef } from "react";
import "../css/ChatBot.css";

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { sender: "bot", text: "👋 Xin chào! Mình là trợ lý PhoneStore. Bạn thích xem mẫu điện thoại nào ạ?" },
  ]);

  const chatRef = useRef(null);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);

    const userText = input;
    setInput("");

    try {
      const res = await fetch("http://44.222.231.16:8081/api/chatbot/smart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userText }),
      });

      const data = await res.json();

      const botMsg = {
        sender: "bot",
        text: data.reply,
        isHTML: true,
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      setMessages((prev) => [...prev, { sender: "bot", text: "❌ Lỗi server, thử lại sau nhé!" }]);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <>
      {!open && (
        <button className="chatbot-toggle" onClick={() => setOpen(true)}>
          💬
        </button>
      )}

      {open && (
        <div className="chatbot-box">
          <div className="chatbot-header">
            <span>Trợ lý PhoneStore</span>
            <button onClick={() => setOpen(false)}>✖</button>
          </div>

          <div className="chatbot-body" ref={chatRef}>
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`chat-msg ${msg.sender === "user" ? "user-msg" : "bot-msg"}`}
              >
                {msg.isHTML ? (
                  <div className="html-wrapper" dangerouslySetInnerHTML={{ __html: msg.text }}></div>
                ) : (
                  <span>{msg.text}</span>
                )}
              </div>
            ))}
          </div>

          <div className="chatbot-input">
            <input
              type="text"
              placeholder="Hỏi gì cũng được..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
            />
            <button onClick={sendMessage}>🚀</button>
          </div>
        </div>
      )}
    </>
  );
}
