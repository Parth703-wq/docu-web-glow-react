
import React from 'react';
import { Button } from '@/components/ui/button';

interface DocumentationPreviewProps {
  code: string;
  docType: string;
  language: string;
}

const DocumentationPreview: React.FC<DocumentationPreviewProps> = ({ code, docType, language }) => {
  const generateMockDocumentation = () => {
    const functionNames = code.match(/function\s+(\w+)|const\s+(\w+)\s*=/g) || [];
    const classNames = code.match(/class\s+(\w+)/g) || [];
    
    return `# ${docType.charAt(0).toUpperCase() + docType.slice(1)} Documentation

## Overview
Auto-generated documentation for your ${language} code.

${functionNames.length > 0 ? `## Functions

${functionNames.slice(0, 3).map(fn => {
  const name = fn.replace(/function\s+|const\s+|\s*=/g, '');
  return `### ${name}()
**Description:** This function handles core functionality within the application.

**Parameters:**
- \`param1\` (string): Input parameter for processing
- \`param2\` (number, optional): Configuration option

**Returns:**
- \`Promise<Object>\`: Returns processed result

**Example:**
\`\`\`${language}
const result = await ${name}('example', 42);
console.log(result);
\`\`\`
`;
}).join('\n')}` : ''}

${classNames.length > 0 ? `## Classes

${classNames.slice(0, 2).map(cls => {
  const name = cls.replace(/class\s+/g, '');
  return `### ${name}
**Description:** Core class for handling application logic.

**Constructor:**
\`\`\`${language}
new ${name}(options)
\`\`\`

**Methods:**
- \`initialize()\`: Sets up the instance
- \`process(data)\`: Processes input data
- \`cleanup()\`: Cleanup resources
`;
}).join('\n')}` : ''}

## Usage Examples

\`\`\`${language}
// Basic usage example
${code.split('\n').slice(0, 5).join('\n')}
\`\`\`

## Installation

\`\`\`bash
npm install your-package
\`\`\`

## Contributing
Please read our contributing guidelines before submitting pull requests.

---
*Generated automatically by DocGen*`;
  };

  const documentation = generateMockDocumentation();

  const copyToClipboard = () => {
    navigator.clipboard.writeText(documentation);
  };

  const downloadMarkdown = () => {
    const blob = new Blob([documentation], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'documentation.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full max-w-4xl mx-auto mt-8">
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-white">Generated Documentation</h3>
          <div className="flex items-center space-x-3">
            <Button
              onClick={copyToClipboard}
              variant="outline"
              className="border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white"
            >
              Copy
            </Button>
            <Button
              onClick={downloadMarkdown}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
            >
              Download
            </Button>
          </div>
        </div>
        
        <div className="bg-slate-900 rounded-lg p-6 max-h-96 overflow-y-auto">
          <pre className="text-slate-200 text-sm whitespace-pre-wrap font-mono leading-relaxed">
            {documentation}
          </pre>
        </div>
        
        <div className="mt-4 text-xs text-slate-500">
          Documentation format: Markdown | Generated in 1.2s
        </div>
      </div>
    </div>
  );
};

export default DocumentationPreview;
