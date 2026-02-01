
import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage, Document, FocusedChat } from '../types';
import { generateAnalyticResponse } from '../services/geminiService';

interface ChatViewProps {
  documents: Document[];
  focusedChat?: FocusedChat | null;
  onUpdateMessages?: (messages: ChatMessage[]) => void;
}

const ChatView: React.FC<ChatViewProps> = ({ documents, focusedChat, onUpdateMessages }) => {
  // If focusedChat is provided, use its messages. Otherwise, local state for general chat.
  const [localMessages, setLocalMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const currentMessages = focusedChat ? focusedChat.messages : localMessages;
  const filteredDocs = focusedChat 
    ? documents.filter(d => focusedChat.documentIds.includes(d.id))
    : documents;

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [currentMessages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      timestamp: new Date(),
    };

    const newMessages = [...currentMessages, userMsg];
    
    if (focusedChat && onUpdateMessages) {
      onUpdateMessages(newMessages);
    } else {
      setLocalMessages(newMessages);
    }

    setInput('');
    setIsLoading(true);

    const history = newMessages.map(m => ({
      role: m.role,
      parts: [{ text: m.text }]
    }));

    const response = await generateAnalyticResponse(input, filteredDocs, history);

    const botMsg: ChatMessage = {
      id: (Date.now() + 1).toString(),
      role: 'model',
      text: response,
      timestamp: new Date(),
    };

    const finalMessages = [...newMessages, botMsg];
    if (focusedChat && onUpdateMessages) {
      onUpdateMessages(finalMessages);
    } else {
      setLocalMessages(finalMessages);
    }
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col h-full bg-[#FDFBF7] relative">
      <header className="p-6 border-b border-gray-200 bg-white sticky top-0 z-10 flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold text-[#1A1A1A]">
            {focusedChat ? `Focused: ${focusedChat.name}` : 'General Analytic Assistant'}
          </h1>
          <p className="text-sm text-gray-500">
            {focusedChat 
              ? `Referencing ${focusedChat.documentIds.length} specific items`
              : `Cross-referencing all ${documents.length} library items`
            }
          </p>
        </div>
        {focusedChat && (
          <div className="flex space-x-1">
            {filteredDocs.map(d => (
              <div key={d.id} className="w-8 h-8 rounded-lg bg-gray-50 border border-gray-200 flex items-center justify-center text-[10px] font-bold text-[#BF5700] overflow-hidden" title={d.title}>
                {d.title.substring(0, 2).toUpperCase()}
              </div>
            ))}
          </div>
        )}
      </header>

      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-6 space-y-6 pb-40"
      >
        {currentMessages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-50">
            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center border-2 border-dashed border-gray-200">
              <svg className="w-8 h-8 text-[#BF5700]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <p className="text-xl font-bold text-[#1A1A1A]">
                {focusedChat ? `New Focused Session: ${focusedChat.name}` : 'Hello, Researcher.'}
              </p>
              <p className="text-sm text-gray-500">
                {focusedChat 
                  ? "I'm ready to analyze your selected documents. What would you like to know?"
                  : "Ask about internal patents, market trends, or academic findings."
                }
              </p>
            </div>
          </div>
        )}

        {currentMessages.map((m) => (
          <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] rounded-2xl p-5 shadow-sm border ${
              m.role === 'user' 
                ? 'bg-[#1A1A1A] text-white border-black' 
                : 'bg-white text-[#1A1A1A] border-gray-100'
            }`}>
              <div className="prose prose-sm max-w-none leading-relaxed">
                {m.text}
              </div>
              <div className={`flex items-center space-x-2 mt-3 pt-2 border-t ${m.role === 'user' ? 'border-white/10' : 'border-gray-50'}`}>
                <span className={`text-[10px] font-bold uppercase tracking-widest ${m.role === 'user' ? 'text-white/40' : 'text-gray-400'}`}>
                  {m.role === 'user' ? 'You' : 'Aura AI'}
                </span>
                <span className="text-[10px] opacity-40">•</span>
                <span className={`text-[10px] ${m.role === 'user' ? 'text-white/40' : 'text-gray-400'}`}>
                  {m.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm flex items-center space-x-3">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-[#BF5700] rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-[#BF5700] rounded-full animate-bounce [animation-delay:-.3s]"></div>
                <div className="w-2 h-2 bg-[#BF5700] rounded-full animate-bounce [animation-delay:-.5s]"></div>
              </div>
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest animate-pulse">Analyzing...</span>
            </div>
          </div>
        )}
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-[#FDFBF7] via-[#FDFBF7] to-transparent pointer-events-none">
        <div className="max-w-4xl mx-auto flex space-x-3 pointer-events-auto bg-white p-3 rounded-2xl shadow-2xl border border-gray-100 items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder={focusedChat ? `Querying selected docs...` : "Cross-reference across library..."}
            className="flex-1 px-4 py-3 bg-transparent outline-none text-[#1A1A1A] placeholder-gray-400 font-medium"
          />
          <button
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="bg-[#BF5700] text-white p-4 rounded-xl hover:bg-[#A64C00] transition-all shadow-lg disabled:opacity-30 disabled:grayscale"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatView;
