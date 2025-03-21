
import React from 'react';
import Background from '@/components/Background';
import Logo from '@/components/Logo';
import CodeEditor from '@/components/CodeEditor';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center px-4 pb-12 relative overflow-hidden">
      <Background />
      
      <div className="container max-w-6xl mx-auto z-10 flex flex-col items-center justify-center pt-8 md:pt-16">
        <Logo />
        
        <div className="text-center max-w-2xl mx-auto mb-12 animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <p className="text-gray-300 text-lg">
            Leverage the power of AI to audit your smart contracts
          </p>
        </div>
        
        <CodeEditor />
        
        <div className="mt-16 text-center text-sm text-gray-500 max-w-md animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <p>
            AuditAI analyzes your smart contracts for security vulnerabilities, gas efficiency, performance issues, and code quality.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
