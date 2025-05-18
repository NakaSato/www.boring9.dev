// src/lib/markdown.ts
import { remark } from 'remark';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypePrism from 'rehype-prism-plus';
import rehypeSanitize from 'rehype-sanitize';
import rehypeStringify from 'rehype-stringify';
import { visit } from 'unist-util-visit';
import { Element, Root, Parent } from 'hast';
import { Plugin } from 'unified';
import rehypeAutoHeadings from './rehype-auto-headings';

// Extend the Element type to include parent property
declare module 'hast' {
  interface Element {
    parent?: Parent;
  }
}

// Custom plugin to handle unknown languages in code blocks
const safeRehypePrism: Plugin<[], Root> = () => {
  return (tree) => {
    // Find all pre > code elements
    visit(tree, 'element', (node: Element) => {
      if (
        node.tagName === 'pre' &&
        node.children?.[0]?.type === 'element' &&
        node.children[0].tagName === 'code'
      ) {
        const codeNode = node.children[0] as Element;
        const className = codeNode.properties?.className as string[] || [];
        
        // If language class is present, ensure it's one that rehype-prism-plus supports
        // Common languages: javascript, typescript, jsx, tsx, css, html, json, bash, etc.
        const supportedLanguages = [
          'javascript', 'js', 
          'typescript', 'ts', 
          'jsx', 'tsx',
          'css', 'html', 'xml',
          'json', 'yaml', 'yml',
          'markdown', 'md',
          'bash', 'shell', 'sh',
          'python', 'py',
          'ruby', 'rb',
          'java', 'c', 'cpp', 'csharp', 'cs',
          'go', 'rust', 'php'
        ];
        
        // Get the language from class (language-xxx)
        const langClass = className.find((cls) => 
          typeof cls === 'string' && cls.startsWith('language-')
        );
        
        if (langClass) {
          const lang = langClass.replace('language-', '');
          if (!supportedLanguages.includes(lang)) {
            // Replace with a supported language (plain text)
            const idx = className.indexOf(langClass);
            if (idx !== -1) {
              className[idx] = 'language-text';
            }
          }
        }
        
        codeNode.properties!.className = className;
      }
    });
  };
};

// Custom plugin to enhance code blocks with proper styling
const enhanceCodeBlocks: Plugin<[], Root> = () => {
  return (tree) => {
    // Find all pre elements
    visit(tree, 'element', (node: Element) => {
      if (node.tagName === 'pre' && node.children?.[0]?.type === 'element') {
        // Add styling classes to pre elements
        if (!node.properties) {
          node.properties = {};
        }
        
        // Preserve existing classes if any
        const existingClasses = node.properties.className || [];
        const classes = Array.isArray(existingClasses) ? existingClasses : [existingClasses as string];
        
        node.properties.className = [
          ...classes,
          'rounded-lg',
          'bg-slate-900',
          'p-4',
          'md:p-6', 
          'overflow-x-auto',
          'my-6',
          'md:my-8',
          'shadow-xl',
          'border',
          'border-slate-800',
          'relative',
          'font-mono',
          'text-sm',
          'leading-relaxed'
        ];

        // Add data attribute for styling hooks
        node.properties['data-code-block'] = true;
        
        // Add copy button functionality hint
        node.properties['data-copyable'] = true;
      }

      // Enhance code element inside pre as well
      if (node.tagName === 'code' && 
          node.properties && 
          node.parent?.type === 'element' && 
          (node.parent as Element).tagName === 'pre') {
          
        const existingClasses = node.properties.className || [];
        const classes = Array.isArray(existingClasses) ? existingClasses : [existingClasses as string];
        
        node.properties.className = [
          ...classes,
          'font-mono',
          'text-sm',
          'md:text-base',
          'block',
          'w-full',
          'text-slate-100'
        ];
      }
    });
  };
};

const customRenderer: Plugin<[], Root> = () => {
  return (tree: Root) => {
    visit(tree, 'element', (node: Element) => {
      if (node.tagName) {
        const props = node.properties || {};

        switch (node.tagName) {
          case 'h1':
            props.className = [
              'text-4xl',
              'font-bold',
              'text-gray-900',
              'mt-8',
              'mb-4',
              'scroll-mt-20'
            ];
            break;
          case 'h2':
            props.className = [
              'text-3xl',
              'font-bold',
              'text-gray-900',
              'mt-6',
              'mb-4',
              'scroll-mt-20'
            ];
            break;
          case 'h3':
            props.className = [
              'text-2xl',
              'font-bold',
              'text-gray-900',
              'mt-4',
              'mb-2',
              'scroll-mt-20'
            ];
            break;
          case 'p':
            props.className = ['text-gray-800', 'leading-relaxed', 'mb-4'];
            break;
          case 'a':
            props.className = [
              'text-blue-600',
              'hover:text-blue-800',
              'transition-colors',
              'duration-200'
            ];
            props.target = '_blank';
            props.rel = 'noopener noreferrer';
            break;
          case 'ul':
            props.className = ['list-disc', 'list-inside', 'mb-4', 'space-y-2'];
            break;
          case 'ol':
            props.className = [
              'list-decimal',
              'list-inside',
              'mb-4',
              'space-y-2'
            ];
            break;
          case 'blockquote':
            props.className = [
              'border-l-4',
              'border-gray-200',
              'pl-4',
              'italic',
              'my-4',
              'text-gray-600'
            ];
            break;
          case 'code':
            props.className = props.className || [];
            if (typeof props.className === 'object') {
              props.className.push('language-javascript');
            }
            break;
          case 'pre':
            props.className = [
              'bg-gray-900',
              'rounded-lg',
              'p-4',
              'overflow-x-auto',
              'mb-4'
            ];
            break;
          case 'img':
            props.className = ['rounded-lg', 'shadow-lg', 'my-4'];
            break;
          default:
            break;
        }

        node.properties = props;
      }
    });
  };
};

export async function markdownToHtml(markdown: string) {
  const result = await remark()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(customRenderer)
    .use(rehypeAutoHeadings) // Add automatic heading IDs
    .use(safeRehypePrism) // Apply our safe wrapper first
    .use(enhanceCodeBlocks) // Add proper styling to code blocks
    .use(rehypePrism, { ignoreMissing: true }) // Tell rehype-prism to ignore missing languages
    .use(rehypeSanitize)
    .use(rehypeStringify)
    .process(markdown);

  return result.toString();
}
