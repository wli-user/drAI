import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { AvatarCreator } from '@readyplayerme/react-avatar-creator';

interface Avatar3DProps {
  isSpeak: boolean;
}

export const Avatar3D: React.FC<Avatar3DProps> = ({ isSpeak }) => {
  const avatarRef = useRef<HTMLDivElement>(null);

  // Doctor avatar URL from Ready Player Me
  const avatarUrl =
    'https://models.readyplayer.me/64f7c1b9d9b150c88a8f2af2.glb';

  const handleOnAvatarLoaded = () => {
    console.log('Avatar loaded successfully');
  };

  const handleOnAvatarExported = (url: string) => {
    console.log('Exported avatar URL:', url);
  };

  return (
    <motion.div
      ref={avatarRef}
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{
        scale: 1,
        opacity: 1,
      }}
      className="relative w-96 h-96"
    >
      <AvatarCreator
        subdomain="demo"
        config={{
          clearCache: true,
          bodyType: 'fullbody',
          quickStart: true,
          language: 'en',
          avatarUrl: avatarUrl, // Pass the avatar URL through config
          animations: {
            idle: true,
            talking: isSpeak, // Enable talking animation based on isSpeak prop
          },
        }}
        onLoaded={handleOnAvatarLoaded}
        onAvatarExported={handleOnAvatarExported}
        className="w-full h-full"
      />

      {/* Speaking indicator */}
      {isSpeak && (
        <motion.div
          className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex justify-center space-x-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="w-2 h-2 bg-blue-500 rounded-full"
              animate={{
                scaleY: [1, 2, 1],
              }}
              transition={{
                duration: 0.5,
                repeat: Infinity,
                delay: i * 0.1,
              }}
            />
          ))}
        </motion.div>
      )}
    </motion.div>
  );
};

export default Avatar3D;
