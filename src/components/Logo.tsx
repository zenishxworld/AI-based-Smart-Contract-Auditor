
import React from 'react';
import { Link } from 'react-router-dom';

const Logo: React.FC = () => {
  return (
    <Link to="/" className="inline-block animate-fade-in">
      <h1 className="text-4xl md:text-6xl font-bold text-gradient my-6">
        AuditAI<span className="text-white">,</span> <span className="font-light">Smart Contract Auditor</span>
      </h1>
    </Link>
  );
};

export default Logo;
