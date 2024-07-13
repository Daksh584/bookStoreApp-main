import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { GoogleGenerativeAI } from "@google/generative-ai";
import Navbar from './Navbar';

const BookInfoGenerator = () => {
  const [bookInfo, setBookInfo] = useState([]); // Use array to store the conversation history
  const [loading, setLoading] = useState(false);
  const { title } = useParams();
  const [input, setInput] = useState('');

  const fetchBookInfo = async () => {
    if (!input.trim()) return; // Prevent sending empty messages

    setLoading(true);
    try {
      const GOOGLEAPI = import.meta.env.VITE_GOOGLEAPI;
      const genAI = new GoogleGenerativeAI(GOOGLEAPI);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const generationConfig = {
        temperature: 1,
        topP: 0.95,
        topK: 64,
        maxOutputTokens: 8192,
        responseMimeType: "text/plain",
      };

      const chatSession = model.startChat({
        generationConfig,
        history: [
          {
            role: "user",
            parts: [
              {text: `I want you talk to me about the book ${title} like a friend . I might ask some questions to you in the run . Don't Add bold letters and italic`},
            ],
          },
          {
            role: "model",
            parts: [
              {text: "Okay, I'm ready to talk about the book!. I'm excited to hear your thoughts and answer any questions you have. 😊 \n"},
            ],
          },
        ],
      });

      const result = await chatSession.sendMessage(input);
      const responseText = await result.response.text();

      // Update the history with the new user message and AI response
      setBookInfo((prevBookInfo) => [
        ...prevBookInfo,
        { role: "user", text: input },
        { role: "model", text: responseText },
      ]);
    } catch (error) {
      console.error("Error fetching book info:", error);
    }
    setLoading(false);
    setInput(''); // Clear the input field after sending the message
  };

  const renderMessageContent = (text) => {
    const parts = text.split(/(```[\s\S]*?```|\*\*[\s\S]*?\*\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith('```') && part.endsWith('```')) {
        return (
          <div className="mockup-code my-2" key={index}>
            <pre data-prefix="~"><code>{part.slice(3, -3)}</code></pre>
          </div>
        );
      } else if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <strong key={index} className="font-bold">
            {part.slice(2, -2)}
          </strong>
        );
      }
      return <span key={index}>{part}</span>;
    });
  };

  return (
    <>
    <div className="w-full p-10"><Navbar />
    </div>
      
      <div className="container mx-auto p-4">
        <h1 className="text-xl mb-4">ChatBot</h1>
        <div className="chatbot p-4 bg-base-200 rounded-lg w-full h-full">
          <div className="messages mb-4 space-y-2">
            {bookInfo.map((message, index) => (
              <div key={index} className={`message ${message.role === "user" ? "text-right bg-primary text-primary-content" : "text-left bg-blue-200 text-blue-900"} p-2 rounded-lg`}>
                {renderMessageContent(message.text)}
              </div>
            ))}
          </div>
          <div className="flex items-center space-x-2">
            <textarea
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about the book"
              className="textarea textarea-bordered w-full mt-4"
            />
            <button onClick={fetchBookInfo} className="btn btn-primary mb-4 mt-4" disabled={loading}>
              {loading ? "Fetching..." : "Send"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookInfoGenerator;
