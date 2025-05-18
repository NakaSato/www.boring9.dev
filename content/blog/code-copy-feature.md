---
title: "Adding Copy to Clipboard Feature to Code Blocks"
date: "2025-05-18"
excerpt: "Learn how to implement a click-to-copy feature for code blocks in your markdown blog."
coverImage: "/images/blog/code-copy-feature.jpg"
author: "Boring9 Dev"
authorImage: "/profile.jpeg"
authorBio: "Full-stack developer and technical writer passionate about modern web development."
category: "Development"
tags: ["JavaScript", "React", "UI/UX", "Web Development"]
---

# Blog Post with Copy Code Functionality

This update adds a "copy code" button to all code blocks in your blog posts. When users hover over a code block, they'll see a copy button that allows them to easily copy the code to their clipboard.

## Features Added

- Click to copy button appears on hover over code blocks
- Visual feedback when code is copied
- Works with all existing code blocks
- Client-side implementation with no server changes required
- Accessible with keyboard navigation

## Implementation Details

1. Created a new client component `EnhancedCodeBlock` that dynamically adds copy buttons to code blocks
2. Added the component to the blog post page
3. The copy functionality works with any code language and any content

## Sample Code Examples

Here are some examples to demonstrate the copy code functionality.

### JavaScript Example

```javascript
function calculateTotal(items) {
  return items
    .map(item => item.price * item.quantity)
    .reduce((total, value) => total + value, 0);
}

const cart = [
  { name: 'Widget', price: 9.99, quantity: 2 },
  { name: 'Gadget', price: 14.99, quantity: 1 }
];

const total = calculateTotal(cart);
console.log(`Total: $${total.toFixed(2)}`);
```

### React Component Example

```jsx
import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div className="counter">
      <h2>Current count: {count}</h2>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
      <button onClick={() => setCount(count - 1)}>
        Decrement
      </button>
    </div>
  );
}

export default Counter;
```

### CSS Example

```css
.code-block {
  position: relative;
  background-color: #1e293b;
  border-radius: 0.5rem;
  padding: 1rem;
  margin: 1.5rem 0;
  overflow-x: auto;
}

.copy-button {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background-color: rgba(255, 255, 255, 0.1);
  border: none;
  border-radius: 0.25rem;
  padding: 0.25rem 0.5rem;
  color: #cbd5e1;
  opacity: 0;
  transition: opacity 0.2s, background-color 0.2s;
}

.code-block:hover .copy-button {
  opacity: 1;
}

.copy-button:hover {
  background-color: rgba(255, 255, 255, 0.2);
  cursor: pointer;
}
```

### Python Example

```python
def fibonacci(n):
    """Generate Fibonacci sequence up to n"""
    fib_sequence = [0, 1]
    
    while fib_sequence[-1] + fib_sequence[-2] <= n:
        fib_sequence.append(fib_sequence[-1] + fib_sequence[-2])
    
    return fib_sequence

# Generate first 10 Fibonacci numbers
fib_numbers = fibonacci(100)
print(f"Fibonacci sequence up to 100: {fib_numbers}")

# Using list comprehension for even numbers
even_fibs = [num for num in fib_numbers if num % 2 == 0]
print(f"Even Fibonacci numbers: {even_fibs}")
```

### React Component Example

```jsx
import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div className="counter">
      <h2>Current count: {count}</h2>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
      <button onClick={() => setCount(count - 1)}>
        Decrement
      </button>
    </div>
  );
}

export default Counter;
```

### CSS Example

```css
.code-block {
  position: relative;
  background-color: #1e293b;
  border-radius: 0.5rem;
  padding: 1rem;
  margin: 1.5rem 0;
  overflow-x: auto;
}

.copy-button {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background-color: rgba(255, 255, 255, 0.1);
  border: none;
  border-radius: 0.25rem;
  padding: 0.25rem 0.5rem;
  color: #cbd5e1;
  opacity: 0;
  transition: opacity 0.2s, background-color 0.2s;
}

.code-block:hover .copy-button {
  opacity: 1;
}

.copy-button:hover {
  background-color: rgba(255, 255, 255, 0.2);
  cursor: pointer;
}
```

### Python Example

```python
def fibonacci(n):
    """Generate Fibonacci sequence up to n"""
    fib_sequence = [0, 1]
    
    while fib_sequence[-1] + fib_sequence[-2] <= n:
        fib_sequence.append(fib_sequence[-1] + fib_sequence[-2])
    
    return fib_sequence

# Generate first 10 Fibonacci numbers
fib_numbers = fibonacci(100)
print(f"Fibonacci sequence up to 100: {fib_numbers}")

# Using list comprehension for even numbers
even_fibs = [num for num in fib_numbers if num % 2 == 0]
print(f"Even Fibonacci numbers: {even_fibs}")
```
