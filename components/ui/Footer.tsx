import React from 'react';
import Link from 'next/link';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const navigationLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/projects', label: 'Projects' },
    { href: '/blog', label: 'Blog' },
    { href: '/contact', label: 'Contact' }
  ];

  const socialLinks = [
    { href: 'https://github.com', label: 'GitHub', icon: '󰊤' },
    { href: 'https://linkedin.com', label: 'LinkedIn', icon: '󰌻' },
    { href: 'https://twitter.com', label: 'Twitter', icon: '󰕄' }
  ];

  return (
    <footer className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border-t border-slate-700/50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(59,130,246,0.05),transparent_70%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(16,185,129,0.05),transparent_70%)] pointer-events-none" />

      <div className="relative container mx-auto px-4 py-16">
        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand Section */}
          <div className="md:col-span-1 text-center md:text-left">
            <div className="mb-4">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-white via-blue-100 to-emerald-100 bg-clip-text text-transparent mb-2">
                Boring9.dev
              </h2>
              <p className="text-slate-400 text-sm leading-relaxed">
                Simple digital experiences crafted with passion for IoT &
                Fintech innovation
              </p>
            </div>

            {/* Social Links */}
            <div className="flex justify-center md:justify-start gap-4 mt-6">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700/50 hover:border-slate-600/50 rounded-lg flex items-center justify-center text-slate-400 hover:text-white transition-all duration-300 hover:scale-105"
                  aria-label={social.label}
                >
                  <span className="text-lg font-mono">{social.icon}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-1 text-center">
            <h3 className="text-lg font-semibold text-white mb-6">
              Quick Links
            </h3>
            <nav className="space-y-3">
              {navigationLinks.map((link) => (
                <div key={link.href}>
                  <Link
                    href={link.href}
                    className="text-slate-300 hover:text-white transition-all duration-300 hover:translate-x-1 inline-block group"
                  >
                    <span className="group-hover:text-blue-400 transition-colors">
                      {link.label}
                    </span>
                  </Link>
                </div>
              ))}
            </nav>
          </div>

          {/* Contact Info */}
          <div className="md:col-span-1 text-center md:text-right">
            <h3 className="text-lg font-semibold text-white mb-6">
              Get in Touch
            </h3>
            <div className="space-y-3 text-slate-300 text-sm">
              <p className="hover:text-white transition-colors cursor-pointer">
                hello@boring9.dev
              </p>
              <p className="text-slate-400">
                Building the future, one line at a time
              </p>
              <div className="pt-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  🟢 Available for projects
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-slate-700/50">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="text-xs text-slate-400 text-center sm:text-left">
              © {currentYear} Boring9.dev. All rights reserved. Built with
              Next.js & Tailwind CSS.
            </div>
            <div className="flex gap-6 text-xs text-slate-400">
              <Link
                href="/privacy"
                className="hover:text-white transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="hover:text-white transition-colors"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
