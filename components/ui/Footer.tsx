import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 border-t border-slate-700 py-12">
      <div className="container mx-auto px-4 text-center">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-white mb-2">Boring9.dev</h2>
          <p className="text-slate-300 text-sm">Simple digital experiences</p>
        </div>

        <div className="flex flex-wrap justify-center gap-6 mb-8 text-sm">
          <a
            href="/"
            className="text-slate-300 hover:text-white transition-colors"
          >
            Home
          </a>
          <a
            href="/about"
            className="text-slate-300 hover:text-white transition-colors"
          >
            About
          </a>
          <a
            href="/projects"
            className="text-slate-300 hover:text-white transition-colors"
          >
            Projects
          </a>
          <a
            href="/blog"
            className="text-slate-300 hover:text-white transition-colors"
          >
            Blog
          </a>
          <a
            href="/contact"
            className="text-slate-300 hover:text-white transition-colors"
          >
            Contact
          </a>
        </div>

        <div className="text-xs text-slate-400">
          © {currentYear} Boring9.dev. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
