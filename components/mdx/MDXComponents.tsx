import React from 'react';
import SyntaxHighlighterCodeBlock from '../blog/syntax-highlighter-code-block';
import Image from 'next/image';
import Link from 'next/link';

const MDXComponents = {
  img: (props: any) => (
    <div className="my-8">
      <Image
        {...props}
        alt={props.alt || 'Blog image'}
        className="rounded-lg mx-auto"
        width={props.width || 800}
        height={props.height || 500}
      />
      {props.caption && (
        <p className="text-center text-sm text-gray-500 mt-2">
          {props.caption}
        </p>
      )}
    </div>
  ),
  a: (props: any) => (
    <Link
      {...props}
      className="text-blue-500 hover:text-blue-600 transition-colors duration-200"
    >
      {props.children}
    </Link>
  ),
  pre: (props: any) => {
    // Extract code and language from pre>code
    const childrenArray = React.Children.toArray(props.children);
    const codeElement = childrenArray.find((child: any) => {
      // Check if it's a code element by checking type or nodeName
      return (
        child?.type === 'code' ||
        (typeof child === 'object' && child?.props?.mdxType === 'code') ||
        child?.props?.originalType === 'code'
      );
    });

    // Type assertion with a more specific type
    if (codeElement && React.isValidElement(codeElement)) {
      // Now TypeScript knows it's a valid React element
      const elementProps = codeElement.props as {
        className?: string;
        children?: React.ReactNode;
      };

      const className = elementProps.className || '';
      const language = className.replace(/language-/, '') || 'text';
      let code = '';

      if (React.isValidElement(elementProps.children)) {
        // Handle nested elements - try to extract text content
        code = String(
          React.Children.toArray(elementProps.children)
            .map((child) => (typeof child === 'string' ? child : ''))
            .join('')
        );
      } else {
        code = String(elementProps.children || '');
      }

      return (
        <SyntaxHighlighterCodeBlock
          code={code}
          language={language}
          className="my-6"
        />
      );
    }

    return (
      <pre
        {...props}
        className="rounded-lg bg-gray-800 p-4 overflow-x-auto my-6"
      />
    );
  },
  code: (props: any) => {
    // This is for inline code, not code blocks (which are handled by the pre component)
    if (
      typeof props.children === 'string' &&
      !props.className?.includes('language-')
    ) {
      return (
        <code
          {...props}
          className="bg-gray-800 text-gray-200 rounded px-1.5 py-0.5 font-mono text-sm"
        >
          {props.children}
        </code>
      );
    }

    return <code {...props} />;
  }
};

export default MDXComponents;
