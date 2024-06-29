import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { GoogleGenerativeAI , HarmCategory , HarmBlockThreshold } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();
const GOOGLEAPI = process.env.REACT_APP_GOOGLE_API_KEY;
const BookInfoGenerator = () => {
  const [bookInfo, setBookInfo] = useState("");
  const [loading, setLoading] = useState(false);
  const { title } = useParams();
  const [input, setInput] = useState(`Tell me about the book ${title}`);
  

  const fetchBookInfo = async () => {
    setLoading(true);
    try {
      const genAI = new GoogleGenerativeAI(GOOGLEAPI); // Replace with your actual API key
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const generationConfig = {
        temperature: 1,
        topP: 0.95,
        topK: 64,
        maxOutputTokens: 8192,
        responseMimeType: "text/plain",
      };

      async function run() {
        const chatSession = model.startChat({
          generationConfig,
       // safetySettings: Adjust safety settings
       // See https://ai.google.dev/gemini-api/docs/safety-settings
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
  setBookInfo(result.response.text());
}
run();
      // const result = await model.generateContent([input]); 
      // Use input state here// setBookInfo(result.response.text()); // Update state based on actual response structure
    } catch (error) {
      console.error("Error fetching book info:", error);
      setBookInfo("Failed to fetch book info.");
    }
    setLoading(false);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Book Information Generator</h1>
      
      
      {bookInfo && <p className="mt-4">{bookInfo}</p>}
      <textarea
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
    className="textarea w-full" placeholder="Ask About the book"
      />
      <button
        className="btn btn-primary mb-4"
        onClick={fetchBookInfo} // Remove parentheses here
        disabled={loading}
      >
        {loading ? "Fetching..." : "Get Book Info"}
      </button>
    </div>
  );
};

export default BookInfoGenerator;