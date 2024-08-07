'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CornerGrid } from '@/components/CornerGrid';
import ChatButton from '@/components/ChatButton';
import { sendChatMessage } from '@/utils/api';
import ProtectedRoute from '@/components/ProtectedRoute';

interface Message {
  text: string;
  isUser: boolean;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [selectedSystem, setSelectedSystem] = useState('system1');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      const userMessage: Message = { text: input, isUser: true };
      setMessages(prevMessages => [...prevMessages, userMessage]);
      setInput('');
      setIsLoading(true);

      try {
        const response = await sendChatMessage(selectedSystem, input);
        const aiMessage: Message = { text: response.result, isUser: false };
        setMessages(prevMessages => [...prevMessages, aiMessage]);
      } catch (error) {
        console.error('Error sending message:', error);
        const errorMessage: Message = { text: 'Sorry, an error occurred. Please try again.', isUser: false };
        setMessages(prevMessages => [...prevMessages, errorMessage]);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <ProtectedRoute>


    <div className="bg-zinc-950 min-h-screen py-20 text-zinc-200 selection:bg-zinc-600">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.25, ease: "easeInOut" }}
        className="relative z-10 mx-auto w-full max-w-xl p-4"
      >
        <h1 className="text-3xl font-bold mb-6 text-center mt-8">Chat with AI</h1>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-4"
        >
          <select
            value={selectedSystem}
            onChange={(e) => setSelectedSystem(e.target.value)}
            className="w-full bg-zinc-900 bg-opacity-50 backdrop-filter backdrop-blur-lg text-zinc-200 rounded-md p-2 outline-none border border-zinc-700"
          >
            <option value="system1">Do the work book</option>
            <option value="system2">Django Rest Framework</option>
            <option value="system3">System 3</option>
          </select>
        </motion.div>
        <div className="bg-zinc-900 bg-opacity-50 backdrop-filter backdrop-blur-lg rounded-lg p-4 mb-4 h-96 overflow-y-auto border border-zinc-800">
          {messages.map((msg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className={`mb-2 ${msg.isUser ? 'text-right' : 'text-left'}`}
            >
              <span className={`inline-block p-2 rounded ${msg.isUser ? 'bg-violet-500' : 'bg-zinc-700'}`}>
                {msg.text}
              </span>
            </motion.div>
          ))}
          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-zinc-400 mt-2"
            >
              AI is thinking...
            </motion.div>
          )}
        </div>
        <form onSubmit={handleSubmit} className="flex">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-grow bg-zinc-900 bg-opacity-50 backdrop-filter backdrop-blur-lg text-zinc-200 rounded-l-md p-2 outline-none border border-zinc-700"
            placeholder="Type your message..."
            disabled={isLoading}
          />
          <ChatButton disabled={isLoading} />
        </form>
      </motion.div>
      <CornerGrid />
    </div>
    </ProtectedRoute>
  );
}
