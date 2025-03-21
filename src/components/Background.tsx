
import React from 'react';

const Background: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="wave-container animate-wave">
        <div className="wave bg-gradient-waves opacity-20"></div>
      </div>
      <div className="wave-container animate-wave-reverse" style={{ animationDelay: '-5s' }}>
        <div className="wave bg-gradient-waves-2 opacity-30"></div>
      </div>
      <div className="wave-container animate-wave" style={{ animationDelay: '-10s' }}>
        <div className="wave bg-gradient-waves-3 opacity-20"></div>
      </div>
    </div>
  );
};

export default Background;
