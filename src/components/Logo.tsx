
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Logo: React.FC = () => {
  const navigate = useNavigate();
  
  const handleLogoClick = () => {
    navigate('/');
  };

  return (
    <div onClick={handleLogoClick} className="inline-block animate-fade-in cursor-pointer">
      <h1 className="text-4xl md:text-6xl font-bold text-gradient my-6">
        AuditAI<span className="text-white">,</span> <span className="font-light">Smart Contract Auditor</span>
      </h1>
    </div>
  );
};

export default Logo;
