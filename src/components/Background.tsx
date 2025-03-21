
import React from 'react';

const Background: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Main gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0c0326] via-[#170735] to-[#231151] opacity-100"></div>
      
      {/* Animated waves with glow effect */}
      <div className="wave-container animate-[wave_15s_ease-in-out_infinite]">
        <div className="wave bg-gradient-to-r from-[#662D91]/40 to-[#2D9CDB]/40 opacity-40 blur-xl"></div>
      </div>
      <div className="wave-container animate-[wave-reverse_25s_ease-in-out_infinite]" style={{ animationDelay: '-8s' }}>
        <div className="wave bg-gradient-to-r from-[#2D9CDB]/30 to-[#BB6BD9]/30 opacity-30 blur-lg"></div>
      </div>
      <div className="wave-container animate-[wave_20s_ease-in-out_infinite]" style={{ animationDelay: '-15s' }}>
        <div className="wave bg-gradient-to-r from-[#BB6BD9]/35 to-[#2D9CDB]/35 opacity-35 blur-xl"></div>
      </div>
      
      {/* Glowing orbs/particles */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 60 }).map((_, i) => {
          const size = Math.random() * 4 + 1;
          const opacity = Math.random() * 0.5 + 0.3;
          return (
            <div 
              key={i}
              className="absolute rounded-full animate-pulse"
              style={{
                width: `${size}px`,
                height: `${size}px`,
                backgroundColor: i % 3 === 0 ? '#642DFF' : i % 3 === 1 ? '#2D9CDB' : '#BB6BD9',
                boxShadow: `0 0 ${size * 3}px ${i % 3 === 0 ? '#642DFF' : i % 3 === 1 ? '#2D9CDB' : '#BB6BD9'}`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                opacity: opacity,
                animationDuration: `${Math.random() * 6 + 3}s`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            />
          );
        })}
      </div>
      
      {/* Grid overlay for cyberpunk/tech feel */}
      <div className="absolute inset-0" style={{ 
        backgroundImage: 'linear-gradient(rgba(10, 0, 33, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(10, 0, 33, 0.03) 1px, transparent 1px)', 
        backgroundSize: '40px 40px' 
      }}></div>
    </div>
  );
};

export default Background;
