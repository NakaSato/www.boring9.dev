# Syntax Highlighter Code Block Component

## Overview

The `SyntaxHighlighterCodeBlock` component provides enhanced code syntax highlighting for the blog system, replacing the basic code blocks with a feature-rich, modern code presentation solution.

## Features

- **Multi-language support**: Supports 40+ programming languages including JavaScript, TypeScript, Python, Rust, HTML, CSS, and more
- **Copy-to-clipboard functionality**: One-click code copying with visual feedback
- **Modern design**: Beautiful dark theme with gradient backgrounds and smooth animations
- **Line numbers**: Optional line numbering for better code readability
- **Language detection**: Automatic language mapping and alias resolution
- **Responsive design**: Works seamlessly across different screen sizes
- **Accessibility**: Proper ARIA labels and keyboard navigation support

## Supported Languages

The component automatically maps common language aliases:

| Alias         | Mapped Language | Description    |
| ------------- | --------------- | -------------- |
| `js`          | `javascript`    | JavaScript     |
| `jsx`         | `jsx`           | React JSX      |
| `ts`          | `typescript`    | TypeScript     |
| `tsx`         | `tsx`           | TypeScript JSX |
| `py`          | `python`        | Python         |
| `rs`          | `rust`          | Rust           |
| `sh`, `shell` | `bash`          | Shell scripts  |
| `yml`         | `yaml`          | YAML           |
| `md`          | `markdown`      | Markdown       |

And many more! The component supports all languages available in Prism.js.

## Usage

### In MDX Files

The component is automatically used for all code blocks in blog posts:

````markdown
```javascript
console.log('Hello, World!');
```
````

```rust
fn main() {
    println!("Hello, World!");
}
```

### Direct Component Usage

```tsx
import SyntaxHighlighterCodeBlock from '@/components/blog/syntax-highlighter-code-block';

<SyntaxHighlighterCodeBlock
  code="console.log('Hello, World!');"
  language="javascript"
  filename="example.js"
  showLineNumbers={true}
  maxHeight="400px"
/>;
```

## Props

| Prop              | Type      | Default   | Description                                  |
| ----------------- | --------- | --------- | -------------------------------------------- |
| `code`            | `string`  | -         | The code content to highlight                |
| `language`        | `string`  | `'text'`  | Programming language for syntax highlighting |
| `filename`        | `string`  | -         | Optional filename to display in header       |
| `showLineNumbers` | `boolean` | `true`    | Whether to show line numbers                 |
| `maxHeight`       | `string`  | `'400px'` | Maximum height before scrolling              |
| `className`       | `string`  | `''`      | Additional CSS classes                       |

## Integration

The component is integrated into the MDX rendering system through `MDXComponents.tsx`:

1. **Pre-element handling**: Intercepts `<pre>` elements containing code blocks
2. **Language extraction**: Extracts language from className (e.g., `language-javascript`)
3. **Code extraction**: Safely extracts code content from nested elements
4. **Component rendering**: Renders the enhanced syntax highlighter

## Browser Compatibility

- **Modern browsers**: Uses `navigator.clipboard` API for optimal copy experience
- **Legacy browsers**: Falls back to `document.execCommand('copy')` for older browser support
- **No JavaScript**: Gracefully degrades to basic styled code blocks

## Performance Considerations

- **ESM imports**: Uses optimized ESM imports for smaller bundle size
- **Prism backend**: Leverages efficient Prism.js syntax highlighting
- **Code splitting**: Component is only loaded when needed
- **Minimal dependencies**: Uses lightweight lucide-react for icons

## Styling

The component uses Tailwind CSS with custom theme integration:

- **Dark theme**: Based on `oneDark` Prism theme
- **Custom styling**: Enhanced with gradients and backdrop blur effects
- **Responsive design**: Adapts to different screen sizes
- **Animation**: Smooth hover effects and state transitions

## Future Enhancements

Potential improvements for the component:

1. **Theme switching**: Add light/dark theme toggle
2. **Language auto-detection**: Automatic language detection for unlabeled code
3. **Code folding**: Collapsible sections for long code blocks
4. **Diff highlighting**: Support for code diffs and changes
5. **Plugin system**: Extensible architecture for custom features

## Troubleshooting

### Common Issues

1. **Missing language highlighting**: Ensure the language is supported by Prism.js
2. **Copy not working**: Check browser clipboard permissions
3. **Styling conflicts**: Verify Tailwind CSS classes are properly loaded

### Debug Mode

Enable debug logging by adding to the browser console:

```javascript
localStorage.setItem('debug-syntax-highlighter', 'true');
```

## Dependencies

- `react-syntax-highlighter`: ^15.6.1
- `lucide-react`: ^0.474.0
- Tailwind CSS for styling
- Next.js for SSR/SSG support
