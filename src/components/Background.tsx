
import React from 'react';

const Background: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0021] via-[#170735] to-[#311B5E] opacity-80"></div>
      
      {/* Animated waves with glow effect */}
      <div className="wave-container animate-wave">
        <div className="wave bg-gradient-to-r from-[#662D91]/30 to-[#2D9CDB]/30 opacity-30 blur-xl"></div>
      </div>
      <div className="wave-container animate-wave-reverse" style={{ animationDelay: '-5s' }}>
        <div className="wave bg-gradient-to-r from-[#2D9CDB]/20 to-[#BB6BD9]/20 opacity-20 blur-lg"></div>
      </div>
      <div className="wave-container animate-wave" style={{ animationDelay: '-10s' }}>
        <div className="wave bg-gradient-to-r from-[#BB6BD9]/25 to-[#2D9CDB]/25 opacity-25 blur-xl"></div>
      </div>
      
      {/* Stars/particles effect */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 40 }).map((_, i) => (
          <div 
            key={i}
            className="absolute bg-white rounded-full opacity-70 animate-pulse"
            style={{
              width: `${Math.random() * 3}px`,
              height: `${Math.random() * 3}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDuration: `${Math.random() * 5 + 2}s`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Background;
