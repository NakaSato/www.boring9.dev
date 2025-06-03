'use client';

import { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Check, Copy, FileCode } from 'lucide-react';

interface SyntaxHighlighterCodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
  showLineNumbers?: boolean;
  maxHeight?: string;
  className?: string;
}

export default function SyntaxHighlighterCodeBlock({
  code,
  language = 'text',
  filename,
  showLineNumbers = true,
  maxHeight = '400px',
  className = ''
}: SyntaxHighlighterCodeBlockProps) {
  const [copied, setCopied] = useState(false);

  // Language mapping to handle aliases and ensure proper highlighting
  const getLanguage = (lang: string): string => {
    const languageMap: Record<string, string> = {
      js: 'javascript',
      jsx: 'jsx',
      ts: 'typescript',
      tsx: 'tsx',
      py: 'python',
      rs: 'rust',
      sh: 'bash',
      shell: 'bash',
      yml: 'yaml',
      md: 'markdown',
      json: 'json',
      html: 'markup',
      xml: 'markup',
      css: 'css',
      scss: 'scss',
      sass: 'sass',
      sql: 'sql',
      php: 'php',
      go: 'go',
      java: 'java',
      c: 'c',
      cpp: 'cpp',
      csharp: 'csharp',
      ruby: 'ruby',
      swift: 'swift',
      kotlin: 'kotlin',
      dart: 'dart',
      r: 'r',
      perl: 'perl',
      lua: 'lua',
      vim: 'vim',
      diff: 'diff',
      dockerfile: 'docker',
      makefile: 'makefile',
      ini: 'ini',
      toml: 'toml',
      csv: 'csv',
      nginx: 'nginx',
      apache: 'apacheconf',
      git: 'git',
      graphql: 'graphql',
      regex: 'regex',
      wasm: 'wasm'
    };

    const normalizedLang = lang.toLowerCase().trim();
    return languageMap[normalizedLang] || normalizedLang;
  };

  const mappedLanguage = getLanguage(language);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
      // Fallback for older browsers or when clipboard API is not available
      try {
        const textArea = document.createElement('textarea');
        textArea.value = code;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (fallbackErr) {
        console.error('Fallback copy failed:', fallbackErr);
      }
    }
  };

  // Custom theme based on oneDark but with some enhancements
  const customTheme = {
    ...oneDark,
    'pre[class*="language-"]': {
      ...oneDark['pre[class*="language-"]'],
      background: 'transparent',
      margin: 0,
      padding: '1rem',
      borderRadius: 0,
      overflow: 'auto',
      maxHeight: maxHeight
    },
    'code[class*="language-"]': {
      ...oneDark['code[class*="language-"]'],
      background: 'transparent'
    }
  };

  return (
    <div
      className={`enhanced-code-block group relative my-6 overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 shadow-lg backdrop-blur-sm ${className}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-gray-100/50 dark:bg-gray-800/50 border-b border-gray-200/50 dark:border-gray-700/50 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          {filename && (
            <>
              <FileCode className="h-4 w-4 text-gray-500 dark:text-gray-400" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {filename}
              </span>
              <span className="text-gray-300 dark:text-gray-600">•</span>
            </>
          )}
          <span className="text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wide">
            {mappedLanguage}
          </span>
        </div>

        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 bg-white/50 dark:bg-gray-900/50 hover:bg-white/80 dark:hover:bg-gray-900/80 border border-gray-200/50 dark:border-gray-700/50 rounded-md transition-all duration-200 hover:shadow-md hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          aria-label={copied ? 'Copied!' : 'Copy code to clipboard'}
          title={copied ? 'Copied!' : 'Copy code'}
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5 text-green-500" />
              <span className="text-green-500">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code Content */}
      <div className="relative">
        {(SyntaxHighlighter as any)({
          language: mappedLanguage,
          style: customTheme,
          showLineNumbers: showLineNumbers,
          customStyle: {
            margin: 0,
            background: 'transparent',
            fontSize: '14px',
            lineHeight: '1.5'
          },
          lineNumberStyle: {
            color: '#6b7280',
            backgroundColor: 'rgba(243, 244, 246, 0.5)',
            paddingLeft: '0.5rem',
            paddingRight: '0.5rem',
            borderRight: '1px solid rgba(229, 231, 235, 0.5)',
            marginRight: '1rem',
            minWidth: '3rem',
            textAlign: 'right'
          },
          wrapLines: true,
          wrapLongLines: true,
          children: code
        })}
      </div>
    </div>
  );
}
