import React, { useState, useEffect } from "react";
import { Send, User, Bot } from "lucide-react"; 


 const ChatBot = () => {
  const [messages, setMessages] = useState(() => {
    return JSON.parse(localStorage.getItem("chatHistory")) || [
      { role: "bot", content: "👋 Hi! I'm your admission counselor. How can I help?" },
    ];
  });
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  
  useEffect(() => {
    localStorage.setItem("chatHistory", JSON.stringify(messages));
  }, [messages]);

 
  const fetchAIResponse = async (userInput) => {
    setIsTyping(true);
    return new Promise((resolve) => {
      setTimeout(() => {
        const knowledgeBase = {
          "application deadline": "📅 Our deadline is **Jan 15th** (Regular) & **Nov 1st** (Early Decision).",
          "required documents": "📄 You'll need:\n1️⃣ Application Form\n2️⃣ High School Transcripts\n3️⃣ SAT/ACT Scores\n4️⃣ Recommendation Letters\n5️⃣ Personal Essay.",
          "financial aid": "💰 We offer **need-based** and **merit-based** aid. FAFSA deadline: **March 1st**.",
          "campus visit": "🏫 Tours available **Mon-Fri** at **10am & 2pm**. Schedule a visit [here](https://saketcollege.edu.in/visit).",
          "default": "🤔 I'm not sure about that. Check [our website](https://saketcollege.edu.in) or contact **admissions@university.edu**.",
          "ok": "kuch orr puch yai nhi paata",
          "hii":"hellloooo welcome to my chatbot"
        };

        let response = knowledgeBase.default;
        Object.entries(knowledgeBase).forEach(([keyword, answer]) => {
          if (userInput.toLowerCase().includes(keyword)) {
            response = answer;
          }
        });

        resolve(response);
      }, 1500); 
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

 
    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);

    setInput("");

   
    const botResponse = await fetchAIResponse(input);
    setMessages((prev) => [...prev, { role: "bot", content: botResponse }]);
    setIsTyping(false);
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h2>🎓 College Chat Assistant</h2>
      </div>

      <div className="messages-area">
        <div className="message-list">
          {messages.map((message, index) => (
            <div key={index} className={`message-row ${message.role === "user" ? "user-message" : "bot-message"}`}>
              <div className={`message-content ${message.role === "user" ? "user-content" : "bot-content"}`}>
                <div className="avatar">
                  {message.role === "user" ? <User className="user-icon" /> : <Bot className="bot-icon" />}
                </div>
                <div className={`bubble ${message.role === "user" ? "user-bubble" : "bot-bubble"}`}>
                  <span dangerouslySetInnerHTML={{ __html: message.content.replace(/\n/g, "<br>") }}></span>
                </div>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="typing-indicator">
              <Bot className="bot-icon" />
              <div className="typing-text">Typing...</div>
            </div>
          )}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="message-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask a question..."
          className="input-field"
        />
        <button
          type="submit"
          className="send-button"
        >
          <Send className="send-icon" />
        </button>
      </form>
    </div>
  );
};

export default ChatBot;
