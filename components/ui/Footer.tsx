import React from 'react';
import Link from 'next/link';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { href: 'https://github.com/NakaSato', label: 'GitHub', icon: '󰊤' },
    {
      href: 'https://linkedin.com/in/chanthawat',
      label: 'LinkedIn',
      icon: '󰌻'
    },
    { href: 'https://twitter.com/ENWUFT', label: 'Twitter', icon: '󰕄' }
  ];

  return (
    <footer className="relative bg-gradient-to-b from-slate-950 via-slate-900 to-black border-t border-slate-800/50 backdrop-blur-xl">
      {/* Modern gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 pointer-events-none"></div>

      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.15)_1px,transparent_0)] bg-[length:20px_20px] pointer-events-none"></div>

      <div className="relative container mx-auto px-4 py-12">
        {/* Main Content */}
        <div className="flex flex-col lg:flex-row justify-between items-center gap-8">
          {/* Brand & Description */}
          <div className="text-center lg:text-left max-w-md">
            <div className="mb-4">
              <h2 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent mb-3">
                Boring9.dev
              </h2>
              <p className="text-slate-300 text-base leading-relaxed">
                Crafting simple yet powerful digital experiences with modern web
                technologies
              </p>
            </div>

            {/* Tech stack badges */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-2 mb-6">
              {['Next.js', 'TypeScript', 'Tailwind'].map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 text-xs font-medium bg-slate-800/60 text-slate-300 rounded-full border border-slate-700/50 backdrop-blur-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Social Links & Contact */}
          <div className="text-center lg:text-right">
            <h3 className="text-lg font-semibold text-white mb-4">
              Let's Connect
            </h3>
            <div className="flex justify-center lg:justify-end gap-3 mb-6">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative w-12 h-12 bg-slate-800/60 backdrop-blur-sm rounded-xl flex items-center justify-center text-slate-400 border border-slate-700/50 hover:text-white hover:bg-slate-700/60 hover:border-slate-600/50"
                  aria-label={social.label}
                >
                  <span className="text-xl relative z-10">{social.icon}</span>
                  {/* Subtle hover glow */}
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 blur-sm"></div>
                </a>
              ))}
            </div>

            {/* Contact info */}
            <div className="text-sm text-slate-400 space-y-1">
              <p>Available for collaborations</p>
              <p className="text-slate-500">Based in Thailand</p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="my-8 h-px bg-gradient-to-r from-transparent via-slate-700/50 to-transparent"></div>

        {/* Bottom Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-4 text-sm text-slate-400">
            <p>© {currentYear} Boring9.dev. All rights reserved.</p>
            <div className="flex items-center gap-1 text-xs text-slate-500">
              <span>Built with</span>
              <span className="text-red-400">♥</span>
              <span>using Next.js</span>
            </div>
          </div>

          <div className="flex items-center gap-6 text-sm">
            <Link
              href="/privacy"
              className="text-slate-400 hover:text-white border-b border-transparent hover:border-slate-400"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="text-slate-400 hover:text-white border-b border-transparent hover:border-slate-400"
            >
              Terms
            </Link>
            <Link
              href="/sitemap.xml"
              className="text-slate-400 hover:text-white border-b border-transparent hover:border-slate-400"
            >
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
