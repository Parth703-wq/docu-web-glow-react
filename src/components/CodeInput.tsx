
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';

interface CodeInputProps {
  onAnalyze: (code: string, docType: string, language: string) => void;
}

const CodeInput: React.FC<CodeInputProps> = ({ onAnalyze }) => {
  const [code, setCode] = useState('');
  const [docType, setDocType] = useState('api');
  const [language, setLanguage] = useState('javascript');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyze = async () => {
    if (!code.trim()) return;
    
    setIsAnalyzing(true);
    setTimeout(() => {
      onAnalyze(code, docType, language);
      setIsAnalyzing(false);
    }, 1500);
  };

  const lineCount = code.split('\n').length;

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-white">Code Input</h3>
          <div className="flex items-center space-x-4">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-slate-700 text-white rounded-lg px-3 py-2 text-sm border border-slate-600 focus:border-purple-500 focus:outline-none"
            >
              <option value="javascript">JavaScript</option>
              <option value="typescript">TypeScript</option>
              <option value="python">Python</option>
              <option value="java">Java</option>
              <option value="csharp">C#</option>
            </select>
            <select
              value={docType}
              onChange={(e) => setDocType(e.target.value)}
              className="bg-slate-700 text-white rounded-lg px-3 py-2 text-sm border border-slate-600 focus:border-purple-500 focus:outline-none"
            >
              <option value="api">API Documentation</option>
              <option value="function">Function Docs</option>
              <option value="class">Class Documentation</option>
              <option value="module">Module Overview</option>
            </select>
          </div>
        </div>
        
        <div className="relative">
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Paste your JavaScript, React, or any code here..."
            className="w-full h-80 bg-slate-900 text-slate-200 rounded-lg p-4 border border-slate-600 focus:border-purple-500 focus:outline-none resize-none font-mono text-sm leading-6"
            style={{ 
              tabSize: 2,
              fontFamily: 'Monaco, Menlo, "Ubuntu Mono", monospace'
            }}
          />
          <div className="absolute bottom-4 left-4 text-xs text-slate-500">
            Lines: {lineCount} | Characters: {code.length}
          </div>
        </div>

        <div className="flex items-center justify-between mt-6">
          <div className="text-sm text-slate-400">
            Supports multiple programming languages and documentation formats
          </div>
          <Button
            onClick={handleAnalyze}
            disabled={!code.trim() || isAnalyzing}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-3 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isAnalyzing ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Generating...</span>
              </div>
            ) : (
              'Generate Documentation'
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CodeInput;
