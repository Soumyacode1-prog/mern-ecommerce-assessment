import { useState, useRef, useEffect } from "react";
import "./Chatbot.css";

export default function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const send = async () => {
    if (!input.trim() || loading) return;

    const userMsg = { from: "user", text: input.trim() };
    setMessages((m) => [...m, userMsg]);
    const currentInput = input;
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: currentInput }),
      });

      if (!res.ok) {
        throw new Error(`Server error: ${res.status}`);
      }

      const data = await res.json();
      setMessages((m) => [
        ...m,
        { from: "bot", text: data.reply || "⚠️ No response from server" },
      ]);
    } catch (error) {
      console.error("Chatbot error:", error);
      setMessages((m) => [
        ...m,
        {
          from: "bot",
          text: "⚠️ Assistant unavailable. Please check if the server is running and OPENAI_API_KEY is configured.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    <>
   
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="chatbot-toggle-btn"
          aria-label="Open chat"
        >
          <span className="chatbot-icon">💬</span>
          <span className="chatbot-pulse"></span>
        </button>
      )}


      {open && (
        <div className="chatbot-window">
  
          <div className="chatbot-header">
            <div className="chatbot-header-content">
              <div className="chatbot-avatar">🤖</div>
              <div className="chatbot-header-text">
                <h3>Store Assistant</h3>
                <p className="chatbot-status">Online</p>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="chatbot-close-btn"
              aria-label="Close chat"
            >
              ✕
            </button>
          </div>

 
          <div className="chatbot-messages">
            {messages.length === 0 && (
              <div className="chatbot-welcome">
                <div className="chatbot-welcome-icon">👋</div>
                <h4>Hello! I'm your Store Assistant</h4>
                <p>Ask me about products, availability, or anything else!</p>
                <div className="chatbot-suggestions">
                  <button
                    className="suggestion-chip"
                    onClick={() => {
                      setInput("What products do you have?");
                      setTimeout(() => send(), 100);
                    }}
                  >
                    What products do you have?
                  </button>
                  <button
                    className="suggestion-chip"
                    onClick={() => {
                      setInput("Show me categories");
                      setTimeout(() => send(), 100);
                    }}
                  >
                    Show me categories
                  </button>
                  <button
                    className="suggestion-chip"
                    onClick={() => {
                      setInput("What's the cheapest product?");
                      setTimeout(() => send(), 100);
                    }}
                  >
                    What's the cheapest product?
                  </button>
                </div>
              </div>
            )}

            {messages.map((m, i) => (
              <div
                key={i}
                className={`chatbot-message ${m.from === "user" ? "user-message" : "bot-message"}`}
              >
                {m.from === "bot" && (
                  <div className="message-avatar">🤖</div>
                )}
                <div className="message-bubble">
                  <p className="message-text">{m.text}</p>
                </div>
                {m.from === "user" && (
                  <div className="message-avatar user-avatar">👤</div>
                )}
              </div>
            ))}

            {loading && (
              <div className="chatbot-message bot-message">
                <div className="message-avatar">🤖</div>
                <div className="message-bubble">
                  <div className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <div className="chatbot-input-area">
            <div className="chatbot-input-wrapper">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="chatbot-input"
                disabled={loading}
              />
              <button
                onClick={send}
                className="chatbot-send-btn"
                disabled={!input.trim() || loading}
                aria-label="Send message"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <line x1="22" y1="2" x2="11" y2="13"></line>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
