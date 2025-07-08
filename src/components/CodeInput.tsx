
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';

interface CodeInputProps {
  onAnalyze: (code: string, docType: string, language: string) => void;
}

const CodeInput: React.FC<CodeInputProps> = ({ onAnalyze }) => {
  const [inputMode, setInputMode] = useState<'manual' | 'github'>('manual');
  const [code, setCode] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [docType, setDocType] = useState('function');
  const [language, setLanguage] = useState('typescript');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyze = async () => {
    if (inputMode === 'manual' && !code.trim()) return;
    if (inputMode === 'github' && !githubUrl.trim()) return;
    
    setIsAnalyzing(true);
    setTimeout(() => {
      const inputData = inputMode === 'manual' ? code : `GitHub Repository: ${githubUrl}`;
      onAnalyze(inputData, docType, language);
      setIsAnalyzing(false);
    }, 1500);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        setCode(content);
        setInputMode('manual'); // Switch to manual mode to show the uploaded content
      };
      reader.onerror = (e) => {
        console.error('Error reading file:', e);
      };
      reader.readAsText(file);
    }
  };

  const lineCount = code.split('\n').length;

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Mode Toggle */}
      <div className="flex justify-center mb-6">
        <div className="flex bg-slate-800/50 rounded-lg p-1 border border-slate-700">
          <button
            onClick={() => setInputMode('manual')}
            className={`px-6 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
              inputMode === 'manual'
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Manual Input
          </button>
          <button
            onClick={() => setInputMode('github')}
            className={`px-6 py-2 rounded-md text-sm font-medium transition-all duration-200 flex items-center space-x-2 ${
              inputMode === 'github'
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            <span>GitHub Repository</span>
          </button>
        </div>
      </div>

      <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 p-6">
        {inputMode === 'github' ? (
          <>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-white">GitHub Repository Analysis</h3>
              <Button
                onClick={handleAnalyze}
                disabled={!githubUrl.trim() || isAnalyzing}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-6 py-2 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isAnalyzing ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Analyzing...</span>
                  </div>
                ) : (
                  'Analyze Repository'
                )}
              </Button>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-300 mb-2">
                GitHub Repository URL
              </label>
              <input
                type="text"
                value={githubUrl}
                onChange={(e) => setGithubUrl(e.target.value)}
                placeholder="https://github.com/username/repository"
                className="w-full bg-slate-700 text-white rounded-lg px-4 py-3 border border-slate-600 focus:border-purple-500 focus:outline-none transition-colors"
              />
            </div>

            <div className="flex items-center justify-center my-6">
              <div className="flex-1 h-px bg-slate-600"></div>
              <span className="px-4 text-slate-400 text-sm">OR</span>
              <div className="flex-1 h-px bg-slate-600"></div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Upload Repository Files
              </label>
              <div className="border-2 border-dashed border-slate-600 rounded-lg p-8 text-center hover:border-purple-500 transition-colors">
                <input
                  type="file"
                  multiple
                  accept=".js,.jsx,.ts,.tsx"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="file-upload"
                />
                <label htmlFor="file-upload" className="cursor-pointer">
                  <div className="flex flex-col items-center space-y-3">
                    <svg className="w-12 h-12 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <div>
                      <p className="text-slate-300 font-medium">Click to upload files or drag and drop</p>
                      <p className="text-slate-500 text-sm mt-1">Supports .js, .jsx, .ts, .tsx files</p>
                    </div>
                  </div>
                </label>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-white">Code Input</h3>
            </div>
            
            <div className="relative">
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Paste your code here..."
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
          </>
        )}
      </div>
    </div>
  );
};

export default CodeInput;
