import React from 'react';
import { Mic, MicOff } from 'lucide-react';
import { motion } from 'framer-motion';

interface VoiceControlsProps {
  isListening: boolean;
  onStartListening: () => void;
  onStopListening: () => void;
}

export const VoiceControls: React.FC<VoiceControlsProps> = ({
  isListening,
  onStartListening,
  onStopListening,
}) => {
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={isListening ? onStopListening : onStartListening}
      className={`relative p-4 rounded-full ${
        isListening 
          ? 'bg-red-500 hover:bg-red-600' 
          : 'bg-blue-500 hover:bg-blue-600'
      } text-white shadow-lg transition-colors duration-200`}
    >
      {isListening && (
        <motion.div
          className="absolute inset-0 rounded-full bg-red-500 opacity-75"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.7, 0.3, 0.7],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
          }}
        />
      )}
      {isListening ? (
        <MicOff className="w-6 h-6 relative z-10" />
      ) : (
        <Mic className="w-6 h-6 relative z-10" />
      )}
    </motion.button>
  );
};