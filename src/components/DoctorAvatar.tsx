import React from 'react';
import { Stethoscope } from 'lucide-react';
import { motion } from 'framer-motion';

export const DoctorAvatar: React.FC = () => {
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      className="relative w-24 h-24 bg-blue-500 rounded-full flex items-center justify-center shadow-lg"
    >
      <div className="absolute inset-0 bg-blue-400 rounded-full animate-pulse"></div>
      <Stethoscope className="w-12 h-12 text-white z-10" />
    </motion.div>
  );
};