
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const CodeEditor: React.FC = () => {
  const [code, setCode] = useState<string>(
`// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract AuditAI {
    string public name = "AuditAI Token";
    // Paste your Solidity code here or import a file
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
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <button 
            onClick={() => document.getElementById('file-upload')?.click()}
            className="input-glass hover:bg-white/10 transition-colors text-sm"
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
            onClick={handleClearCode}
            className="input-glass hover:bg-white/10 transition-colors text-sm"
          >
            Clear
          </button>
        </div>
      </div>

      <div className="code-editor" style={{ minHeight: '400px' }}>
        <pre className="line-numbers h-full m-0" style={{ backgroundColor: 'transparent' }}>
          <code className="language-solidity">{code}</code>
        </pre>
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="absolute top-0 left-0 w-full h-full opacity-0 cursor-text"
          spellCheck="false"
        />
      </div>

      <div className="mt-6 text-center">
        <button 
          className="btn-primary"
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
            'Run Audit'
          )}
        </button>
      </div>
    </div>
  );
};

export default CodeEditor;
