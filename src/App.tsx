import React, { useState, useRef, useEffect } from 'react';
import { Send, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { Avatar3D } from './components/Avatar3D';
import { ChatMessage } from './components/ChatMessage';
import { VoiceControls } from './components/VoiceControls';
import { useSpeechRecognition } from './hooks/useSpeechRecognition';
import { useSpeechSynthesis } from './hooks/useSpeechSynthesis';
import { analyzeSymptomsFromText, generateResponse } from './utils/medicalResponses';

function App() {
  const [messages, setMessages] = useState<Array<{ text: string; isAi: boolean }>>([
    { text: "Hello! I'm Dr. Sarah AI. Please describe your symptoms, and I'll help you identify the issue and suggest appropriate treatments.", isAi: true }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const { isListening, transcript, startListening, stopListening } = useSpeechRecognition();
  const { speak } = useSpeechSynthesis();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (transcript) {
      setInput(transcript);
    }
  }, [transcript]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { text: userMessage, isAi: false }]);
    setIsLoading(true);

    // Analyze symptoms and generate response
    const detectedSymptom = analyzeSymptomsFromText(userMessage);
    const response = generateResponse(detectedSymptom);

    setTimeout(() => {
      setMessages(prev => [...prev, { text: response, isAi: true }]);
      setIsLoading(false);
      setIsSpeaking(true);
      speak(response);
      setTimeout(() => setIsSpeaking(false), response.length * 50); // Approximate speaking duration
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-4xl mx-auto p-4 h-screen flex flex-col">
        <div className="flex flex-col items-center justify-center space-y-4 p-4 mb-4">
          <Avatar3D isSpeak={isSpeaking} />
          <div className="text-center">
            <h1 className="text-2xl font-bold text-blue-900">Dr. Sarah AI</h1>
            <p className="text-blue-600">Your 24/7 Medical Assistant</p>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-2 space-y-4 scrollbar-hide">
          {messages.map((message, index) => (
            <ChatMessage key={index} isAi={message.isAi} message={message.text} />
          ))}
          {isLoading && (
            <div className="flex items-center space-x-2 text-blue-600">
              <Loader2 className="w-5 h-5 animate-spin" />
              <span className="text-sm">Analyzing symptoms...</span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="mt-4 relative flex items-center space-x-4"
        >
          <VoiceControls
            isListening={isListening}
            onStartListening={startListening}
            onStopListening={stopListening}
          />
          <div className="flex-1 relative">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Describe your symptoms or click the mic to speak..."
              className="w-full p-4 pr-12 rounded-xl border-2 border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none resize-none h-20"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              className="absolute right-4 bottom-4 text-blue-600 hover:text-blue-700 disabled:text-blue-300"
            >
              <Send className="w-6 h-6" />
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default App;