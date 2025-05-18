// lib/rehype-auto-headings.ts
import { Root, Element } from 'hast';
import { Plugin } from 'unified';
import { visit } from 'unist-util-visit';
import slugify from 'slugify';

// Plugin to automatically add IDs to headings in HTML for anchor links
const rehypeAutoHeadings: Plugin<[], Root> = () => {
  return (tree) => {
    visit(tree, 'element', (node: Element) => {
      // Process only h1-h6 elements
      if (/^h[1-6]$/.test(node.tagName)) {
        // Get text content from the heading 
        const text = getTextContent(node);
        
        // Generate a slug from the text
        if (text) {
          const slug = slugify(text, {
            lower: true,
            strict: true,
            locale: 'en'
          });
          
          // Add id attribute to the heading
          node.properties = node.properties || {};
          node.properties.id = slug;
          
          // Add a link inside to make it clickable
          // This preserves the original content and adds a subtle anchor
          const children = [...node.children];
          
          // Create the anchor with a # symbol that appears on hover
          const anchor: Element = {
            type: 'element',
            tagName: 'a',
            properties: {
              href: `#${slug}`,
              className: 'anchor invisible ml-2 text-gray-500 hover:text-blue-500 group-hover:visible'
            },
            children: [
              {
                type: 'text',
                value: '#'
              }
            ]
          };
          
          // Make the heading group focusable and create hover context
          node.properties.className = [
            ...(Array.isArray(node.properties.className) 
              ? node.properties.className 
              : (node.properties.className ? [node.properties.className] : [])),
            'group',
            'flex',
            'items-center',
            'scroll-mt-20' // Add space for fixed header
          ].join(' ');
          
          // Add the anchor at the end of the heading
          node.children = [...children, anchor];
        }
      }
    });
  };
};

// Helper function to extract text content from an element
function getTextContent(node: Element): string {
  let text = '';
  
  if (node.children) {
    for (const child of node.children) {
      if (child.type === 'text') {
        text += child.value;
      } else if (child.type === 'element') {
        text += getTextContent(child);
      }
    }
  }
  
  return text;
}

export default rehypeAutoHeadings;
