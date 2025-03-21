
import React from 'react';
import Background from '@/components/Background';
import Logo from '@/components/Logo';
import CodeEditor from '@/components/CodeEditor';
import { Shield, Zap, FileText } from 'lucide-react';

const FeatureCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
}> = ({ icon, title, description }) => {
  return (
    <div className="glass-card p-6 flex flex-col items-center text-center transition-all duration-300 hover:scale-105 hover:shadow-[0_0_25px_rgba(45,156,219,0.3)] hover:border-white/20 group">
      <div className="w-12 h-12 mb-4 flex items-center justify-center rounded-full bg-gradient-to-r from-audit-blue/20 to-audit-purple/20 p-2 group-hover:from-audit-blue/30 group-hover:to-audit-purple/30 transition-all duration-300">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-2 text-white group-hover:text-gradient transition-all duration-300">{title}</h3>
      <p className="text-gray-300 text-sm">{description}</p>
    </div>
  );
};

const Index: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center px-4 pb-12 relative overflow-hidden">
      <Background />
      
      <div className="container max-w-6xl mx-auto z-10 flex flex-col items-center justify-center pt-8 md:pt-16">
        <div className="text-center mb-4 animate-fade-in">
          <span className="inline-flex items-center px-3 py-1 text-xs font-medium rounded-full bg-audit-blue/20 text-audit-blue mb-2">
            <span className="mr-1">⚡</span>
            AI-POWERED
          </span>
        </div>
        
        <Logo />
        
        <div className="text-center max-w-2xl mx-auto mb-12 animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <p className="text-gray-300 text-lg">
            Leverage the power of AI to audit your smart contracts
          </p>
        </div>
        
        <CodeEditor />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 w-full animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <FeatureCard 
            icon={<Shield className="w-6 h-6 text-audit-blue" />}
            title="Security"
            description="Identify vulnerabilities, reentrancy issues, and other security concerns"
          />
          <FeatureCard 
            icon={<Zap className="w-6 h-6 text-audit-yellow" />}
            title="Efficiency"
            description="Analyze gas consumption and optimize your contract's performance"
          />
          <FeatureCard 
            icon={<FileText className="w-6 h-6 text-audit-purple" />}
            title="Quality"
            description="Evaluate code structure, readability and suggest improvements"
          />
        </div>
        
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
