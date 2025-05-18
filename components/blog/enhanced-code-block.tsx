'use client';

import { useEffect, useRef } from 'react';

export default function EnhancedCodeBlock() {
  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    // Find all code blocks
    const codeBlocks = document.querySelectorAll('pre code');
    
    codeBlocks.forEach((codeBlock) => {
      // Get the parent pre element
      const preElement = codeBlock.parentElement;
      if (!preElement) return;
      
      // Skip if this code block already has a copy button (avoid duplicates on re-renders)
      if (preElement.parentElement?.querySelector('.copy-code-button')) return;
      
      // Create container element with position relative
      const container = document.createElement('div');
      container.className = 'relative group';
      container.setAttribute('data-enhanced', 'true');
      
      // Create copy button
      const copyButton = document.createElement('button');
      copyButton.className = 'copy-code-button absolute top-2 right-2 p-2 rounded-md bg-gray-700 hover:bg-gray-600 transition-colors duration-200 opacity-0 group-hover:opacity-100 focus:opacity-100 focus:outline-none';
      copyButton.setAttribute('aria-label', 'Copy code');
      copyButton.setAttribute('title', 'Copy code');
      copyButton.setAttribute('tabindex', '0'); // Make button focusable with keyboard
      
      // Create button icon
      const copyIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      copyIcon.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
      copyIcon.setAttribute('fill', 'none');
      copyIcon.setAttribute('viewBox', '0 0 24 24');
      copyIcon.setAttribute('stroke-width', '1.5');
      copyIcon.setAttribute('stroke', 'currentColor');
      copyIcon.setAttribute('class', 'h-5 w-5 text-gray-300');
      
      const copyPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      copyPath.setAttribute('stroke-linecap', 'round');
      copyPath.setAttribute('stroke-linejoin', 'round');
      copyPath.setAttribute('d', 'M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5A3.375 3.375 0 006.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0015 2.25h-1.5a2.251 2.251 0 00-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 00-9-9z');
      
      copyIcon.appendChild(copyPath);
      copyButton.appendChild(copyIcon);
      
      // Handle copy functionality
      const copyCode = async () => {
        try {
          const code = codeBlock.textContent || '';
          await navigator.clipboard.writeText(code);
          
          // Show copied state
          copyButton.setAttribute('aria-label', 'Copied!');
          copyButton.setAttribute('title', 'Copied!');
          
          // Replace icon with check icon
          copyIcon.innerHTML = '';
          const checkPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
          checkPath.setAttribute('stroke-linecap', 'round');
          checkPath.setAttribute('stroke-linejoin', 'round');
          checkPath.setAttribute('d', 'M4.5 12.75l6 6 9-13.5');
          checkPath.setAttribute('class', 'text-green-400');
          copyIcon.appendChild(checkPath);
          
          // Reset after 2 seconds
          setTimeout(() => {
            copyButton.setAttribute('aria-label', 'Copy code');
            copyButton.setAttribute('title', 'Copy code');
            
            // Restore copy icon
            copyIcon.innerHTML = '';
            copyIcon.appendChild(copyPath.cloneNode(true));
          }, 2000);
        } catch (err) {
          console.error('Failed to copy text: ', err);
        }
      };
      
      // Add click event
      copyButton.addEventListener('click', copyCode);
      
      // Add keyboard event for accessibility
      copyButton.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          copyCode();
        }
      });
      
      // Create wrapper if it doesn't exist
      if (!preElement.parentElement?.classList.contains('relative')) {
        // Insert wrapper before pre element
        preElement.parentNode?.insertBefore(container, preElement);
        // Move pre into wrapper
        container.appendChild(preElement);
        // Add copy button to wrapper
        container.appendChild(copyButton);
      }
    });
  }, []);

  return null;
}
