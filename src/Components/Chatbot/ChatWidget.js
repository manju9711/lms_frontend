import React, { useState } from 'react';
import axios from 'axios';

const ChatWidget = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Hi 👋 I am your EduTec Course Mentor. Ask me about courses or learning paths!' }
  ]);
  const [loading, setLoading] = useState(false);

  const user = JSON.parse(localStorage.getItem('user'));

  const handleSend = async () => {
    const text = input.trim();
    if (!text) return;

    const newUserMsg = { from: 'user', text };
    setMessages(prev => [...prev, newUserMsg]);
    setInput('');
    setLoading(true);

    try {
      const res = await axios.post('http://localhost:5000/api/ai-chat', {
        message: text,
        userId: user?.id || null,
      });

      const botMsg = { from: 'bot', text: res.data.reply };
      setMessages(prev => [...prev, botMsg]);
    } catch (err) {
      console.error(err);
      setMessages(prev => [
        ...prev,
        { from: 'bot', text: 'Sorry, something went wrong. Please try again later.' }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Floating button (WhatsApp-kku badhila idhu) */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-40 bg-purple-600 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg hover:bg-purple-700 transition"
      >
        🤖
      </button>

      {/* Chat window */}
      {open && (
        <div className="fixed bottom-24 right-6 z-40 w-80 bg-white rounded-xl shadow-2xl flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-purple-600 text-white px-4 py-3 flex justify-between items-center">
            <div>
              <div className="font-semibold text-sm">EduTec Course Mentor</div>
              <div className="text-xs text-purple-100">
                Ask about courses & learning path
              </div>
            </div>
            <button onClick={() => setOpen(false)} className="text-xl leading-none">×</button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-3 space-y-2 max-h-80 overflow-y-auto text-sm">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex ${m.from === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`px-3 py-2 rounded-lg max-w-[80%] ${
                    m.from === 'user'
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="text-xs text-gray-500">Typing…</div>
            )}
          </div>

          {/* Input */}
          <div className="border-t p-2 flex gap-2">
            <textarea
              rows={1}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              className="flex-1 text-sm border rounded-lg px-2 py-1 resize-none focus:outline-none focus:ring-1 focus:ring-purple-500"
              placeholder="Eg: I want to learn frontend, where to start?"
            />
            <button
              onClick={handleSend}
              disabled={loading}
              className="bg-purple-600 text-white px-3 rounded-lg text-sm disabled:opacity-50"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatWidget;
