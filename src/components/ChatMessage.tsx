import React from 'react';
import { motion } from 'framer-motion';

interface ChatMessageProps {
  isAi: boolean;
  message: string;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ isAi, message }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex ${isAi ? 'justify-start' : 'justify-end'} mb-4`}
    >
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-3 ${
          isAi
            ? 'bg-blue-100 text-blue-900'
            : 'bg-blue-600 text-white'
        }`}
      >
        <p className="text-sm md:text-base">{message}</p>
      </div>
    </motion.div>
  );
};