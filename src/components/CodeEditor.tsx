
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { ArrowRight } from 'lucide-react';

const CodeEditor: React.FC = () => {
  const [code, setCode] = useState<string>(
`// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract AuditAI {
    string public name = "AuditAI Token";
    
    // Your smart contract code here
}`
  );
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleRunAudit = () => {
    if (code.trim().length < 20) {
      toast.error('Please enter a valid Solidity smart contract');
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      sessionStorage.setItem('contractCode', code);
      navigate('/results');
    }, 1500);
  };

  const handleUploadFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.name.endsWith('.sol')) {
      toast.error('Please upload a Solidity (.sol) file');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setCode(event.target.result as string);
        toast.success(`File ${file.name} loaded successfully`);
      }
    };
    reader.readAsText(file);
  };

  const handleClearCode = () => {
    setCode('');
    toast.info('Code editor cleared');
  };

  return (
    <div className="w-full max-w-4xl mx-auto animate-slide-up" style={{ animationDelay: '0.2s' }}>
      <div className="code-editor-container glass-card overflow-hidden border border-white/10 rounded-xl">
        {/* Code editor header */}
        <div className="flex items-center px-4 py-2 bg-black/50 border-b border-white/10">
          <div className="flex space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <div className="mx-auto text-xs text-gray-400">solidity.sol</div>
        </div>
        
        {/* Code editor content */}
        <div className="bg-black/70 backdrop-blur-md overflow-hidden relative" style={{ minHeight: '400px' }}>
          <pre className="line-numbers h-full m-0 overflow-auto p-4" style={{ backgroundColor: 'transparent' }}>
            <code className="language-solidity text-white">{code}</code>
          </pre>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="absolute top-0 left-0 w-full h-full opacity-0 cursor-text p-4"
            spellCheck="false"
          />
          <div className="absolute bottom-2 right-2 text-xs text-gray-500">{code.split('\n').length} lines</div>
        </div>
      </div>

      <div className="flex justify-center mt-8">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => document.getElementById('file-upload')?.click()}
            className="px-4 py-2 rounded-lg border border-white/20 bg-white/5 hover:bg-white/10 transition-all duration-300 text-sm text-gray-300"
          >
            Upload .sol File
          </button>
          <input 
            type="file" 
            id="file-upload" 
            accept=".sol" 
            className="hidden" 
            onChange={handleUploadFile}
          />
          
          <button 
            className="bg-gradient-to-r from-audit-blue to-audit-purple text-white font-medium rounded-lg px-6 py-3 transform transition-all duration-300 hover:scale-105 hover:shadow-[0_5px_15px_rgba(45,156,219,0.4)] focus:outline-none"
            onClick={handleRunAudit}
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Analyzing Contract...
              </span>
            ) : (
              <span className="flex items-center">
                Audit Smart Contract
                <ArrowRight className="ml-2 h-4 w-4" />
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;
