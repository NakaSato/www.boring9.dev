import Link from 'next/link';
import AnimationContainer from '../utils/AnimationContainer';
import ExternalLink from './ExternalLink';

const Footer = () => {
  return (
    <footer className="w-full mt-32 relative overflow-hidden" style={{
      // Chrome optimization: Enable hardware acceleration
      willChange: "transform",
      transform: "translateZ(0)"
    }}>
      {/* Ultra Modern Animated Background */}
      <div className="absolute inset-0">
        {/* Dynamic Mesh Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950/50" />
        
        {/* Floating Glass Orbs */}
        <div className="absolute top-10 left-10 w-72 h-72 bg-gradient-to-br from-blue-400/20 via-cyan-400/15 to-purple-500/20 rounded-full blur-3xl animate-pulse opacity-60" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-gradient-to-br from-purple-400/20 via-pink-400/15 to-orange-500/20 rounded-full blur-3xl animate-pulse opacity-60" style={{ animationDelay: '3s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-emerald-400/20 via-teal-400/15 to-cyan-500/20 rounded-full blur-3xl animate-pulse opacity-60" style={{ animationDelay: '6s' }} />
        
        {/* Advanced Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(59,130,246,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        
        {/* Radial Gradients */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(99,102,241,0.1),transparent_50%)] dark:bg-[radial-gradient(circle_at_25%_25%,rgba(99,102,241,0.05),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_75%,rgba(168,85,247,0.1),transparent_50%)] dark:bg-[radial-gradient(circle_at_75%_75%,rgba(168,85,247,0.05),transparent_50%)]" />
        
        {/* Noise Texture */}
        <div className="absolute inset-0 opacity-[0.015] bg-[url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20256%20256%22%3E%3Cfilter%20id%3D%22noise%22%3E%3CfeTurbulence%20baseFrequency%3D%220.9%22%20stitchTiles%3D%22stitch%22%2F%3E%3C%2Ffilter%3E%3Crect%20width%3D%22256%22%20height%3D%22256%22%20filter%3D%22url(%23noise)%22%20opacity%3D%221%22%2F%3E%3C%2Fsvg%3E')]" />
      </div>

      <AnimationContainer>
        <div className="relative max-w-7xl mx-auto px-6 py-24">
          
          {/* Ultra Modern Top Accent */}
          <div className="flex items-center justify-center mb-20">
            <div className="relative flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-px bg-gradient-to-r from-transparent via-blue-500/60 to-transparent" />
                <div className="w-2 h-2 bg-gradient-to-br from-blue-500 via-purple-500 to-cyan-500 rounded-full animate-pulse shadow-lg shadow-blue-500/25" />
                <div className="w-8 h-px bg-gradient-to-r from-transparent via-purple-500/60 to-transparent" />
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-1 h-1 bg-blue-400 rounded-full animate-pulse" />
                <div className="w-1 h-1 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
                <div className="w-1 h-1 bg-cyan-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-px bg-gradient-to-r from-transparent via-cyan-500/60 to-transparent" />
                <div className="w-2 h-2 bg-gradient-to-br from-cyan-500 via-emerald-500 to-teal-500 rounded-full animate-pulse shadow-lg shadow-cyan-500/25" style={{ animationDelay: '1.5s' }} />
                <div className="w-8 h-px bg-gradient-to-r from-transparent via-emerald-500/60 to-transparent" />
              </div>
            </div>
          </div>

          {/* Revolutionary Grid Layout */}
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-16 lg:gap-20">
            
            {/* Futuristic Brand Section */}
            <div className="xl:col-span-5 text-center xl:text-left">
              
              {/* Next-Gen Logo Design */}
              <div className="mb-12">
                <div className="flex items-center justify-center xl:justify-start mb-8">
                  <div className="relative group">
                    {/* Glowing Background */}
                    <div className="absolute -inset-2 bg-gradient-to-r from-blue-600 via-purple-600 via-cyan-500 to-emerald-600 rounded-3xl blur opacity-25 group-hover:opacity-40 transition-all duration-700 animate-pulse" />
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 rounded-2xl blur-sm opacity-50 group-hover:opacity-70 transition-all duration-500" />
                    
                    {/* Logo Container */}
                    <div className="relative w-16 h-16 bg-gradient-to-br from-blue-500 via-purple-600 via-cyan-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-blue-500/25 group-hover:shadow-purple-500/25 transition-all duration-500 group-hover:scale-105">
                      <span className="text-white font-black text-2xl tracking-tight">B</span>
                      
                      {/* Inner Glow */}
                      <div className="absolute inset-1 bg-gradient-to-br from-white/20 to-transparent rounded-xl" />
                    </div>
                    
                    {/* Floating Particles */}
                    <div className="absolute -top-1 -right-1 w-1 h-1 bg-cyan-400 rounded-full animate-ping opacity-75" />
                    <div className="absolute -bottom-1 -left-1 w-1 h-1 bg-purple-400 rounded-full animate-ping opacity-75" style={{ animationDelay: '1s' }} />
                  </div>
                  
                  {/* Brand Text */}
                  <div className="ml-6">
                    <h2 className="text-3xl xl:text-4xl font-black mb-2">
                      <span className="bg-gradient-to-r from-gray-900 via-blue-800 via-purple-800 to-cyan-800 dark:from-white dark:via-blue-200 dark:via-purple-200 dark:to-cyan-200 bg-clip-text text-transparent">
                        boring9.dev
                      </span>
                    </h2>
                    <div className="relative">
                      <div className="w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 via-cyan-500 to-emerald-500 rounded-full" />
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-400 via-cyan-400 to-emerald-400 rounded-full blur-sm opacity-60" />
                    </div>
                  </div>
                </div>
                
                {/* Enhanced Description */}
                <p className="text-gray-600 dark:text-gray-300 text-lg xl:text-xl leading-relaxed max-w-lg mx-auto xl:mx-0 mb-10 font-medium">
                  Crafting <span className="text-blue-600 dark:text-blue-400 font-semibold">revolutionary</span> digital experiences with 
                  <span className="text-purple-600 dark:text-purple-400 font-semibold"> cutting-edge technology</span> and 
                  <span className="text-cyan-600 dark:text-cyan-400 font-semibold">boundless creativity</span>.
                </p>
                
                {/* Ultra Modern Stats */}
                <div className="grid grid-cols-3 gap-8 max-w-md mx-auto xl:mx-0">
                  <div className="relative group text-center xl:text-left">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-2xl blur group-hover:blur-none transition-all duration-300" />
                    <div className="relative bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-4 border border-blue-200/30 dark:border-blue-700/30 group-hover:border-blue-400/50 transition-all duration-300">
                      <div className="text-2xl xl:text-3xl font-black bg-gradient-to-br from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-1">50+</div>
                      <div className="text-xs xl:text-sm text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wider">Projects</div>
                    </div>
                  </div>
                  
                  <div className="relative group text-center xl:text-left">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-2xl blur group-hover:blur-none transition-all duration-300" />
                    <div className="relative bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-4 border border-purple-200/30 dark:border-purple-700/30 group-hover:border-purple-400/50 transition-all duration-300">
                      <div className="text-2xl xl:text-3xl font-black bg-gradient-to-br from-purple-600 to-pink-600 bg-clip-text text-transparent mb-1">5+</div>
                      <div className="text-xs xl:text-sm text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wider">Years</div>
                    </div>
                  </div>
                  
                  <div className="relative group text-center xl:text-left">
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 rounded-2xl blur group-hover:blur-none transition-all duration-300" />
                    <div className="relative bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-4 border border-emerald-200/30 dark:border-emerald-700/30 group-hover:border-emerald-400/50 transition-all duration-300">
                      <div className="text-2xl xl:text-3xl font-black bg-gradient-to-br from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-1">∞</div>
                      <div className="text-xs xl:text-sm text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wider">Ideas</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Revolutionary Navigation Columns */}
            <div className="xl:col-span-7 grid grid-cols-1 md:grid-cols-3 gap-12">
              
              {/* Explore Section - Blue Theme */}
              <div className="text-center md:text-left">
                <div className="mb-8">
                  <div className="flex items-center justify-center md:justify-start mb-4">
                    <div className="relative">
                      <div className="w-3 h-3 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full animate-pulse shadow-lg shadow-blue-500/50" />
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full blur-sm animate-pulse" />
                    </div>
                    <h3 className="text-xl font-black text-gray-900 dark:text-white ml-4 tracking-tight">
                      Explore
                    </h3>
                  </div>
                  <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 mx-auto md:mx-0 rounded-full shadow-lg shadow-blue-500/25" />
                </div>
                
                <nav className="space-y-5">
                  <Link
                    href="/"
                    className="group flex items-center justify-center md:justify-start text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 hover:translate-x-1"
                    style={{
                      willChange: "color, transform",
                      transform: "translateZ(0)"
                    }}
                  >
                    <div className="w-1.5 h-1.5 bg-current rounded-full mr-4 opacity-0 group-hover:opacity-100 transition-all duration-300 scale-0 group-hover:scale-100" />
                    <span className="relative font-medium">
                      Home
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 group-hover:w-full transition-all duration-500 ease-out" />
                    </span>
                  </Link>
                  
                  <Link
                    href="/about"
                    className="group flex items-center justify-center md:justify-start text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 hover:translate-x-1"
                    style={{
                      willChange: "color, transform",
                      transform: "translateZ(0)"
                    }}
                  >
                    <div className="w-1.5 h-1.5 bg-current rounded-full mr-4 opacity-0 group-hover:opacity-100 transition-all duration-300 scale-0 group-hover:scale-100" />
                    <span className="relative font-medium">
                      About
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 group-hover:w-full transition-all duration-500 ease-out" />
                    </span>
                  </Link>
                  
                  <Link
                    href="/projects"
                    className="group flex items-center justify-center md:justify-start text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 hover:translate-x-1"
                    style={{
                      willChange: "color, transform",
                      transform: "translateZ(0)"
                    }}
                  >
                    <div className="w-1.5 h-1.5 bg-current rounded-full mr-4 opacity-0 group-hover:opacity-100 transition-all duration-300 scale-0 group-hover:scale-100" />
                    <span className="relative font-medium">
                      Projects
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 group-hover:w-full transition-all duration-500 ease-out" />
                    </span>
                  </Link>
                </nav>
              </div>

              {/* Content Section - Purple Theme */}
              <div className="text-center md:text-left">
                <div className="mb-8">
                  <div className="flex items-center justify-center md:justify-start mb-4">
                    <div className="relative">
                      <div className="w-3 h-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full animate-pulse shadow-lg shadow-purple-500/50" style={{ animationDelay: '1s' }} />
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full blur-sm animate-pulse" style={{ animationDelay: '1s' }} />
                    </div>
                    <h3 className="text-xl font-black text-gray-900 dark:text-white ml-4 tracking-tight">
                      Content
                    </h3>
                  </div>
                  <div className="w-16 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto md:mx-0 rounded-full shadow-lg shadow-purple-500/25" />
                </div>
                
                <nav className="space-y-5">
                  <Link
                    href="/blog"
                    className="group flex items-center justify-center md:justify-start text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-all duration-300 hover:translate-x-1"
                    style={{
                      willChange: "color, transform",
                      transform: "translateZ(0)"
                    }}
                  >
                    <div className="w-1.5 h-1.5 bg-current rounded-full mr-4 opacity-0 group-hover:opacity-100 transition-all duration-300 scale-0 group-hover:scale-100" />
                    <span className="relative font-medium">
                      Blog
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 group-hover:w-full transition-all duration-500 ease-out" />
                    </span>
                  </Link>
                  
                  <Link
                    href="/contact"
                    className="group flex items-center justify-center md:justify-start text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-all duration-300 hover:translate-x-1"
                    style={{
                      willChange: "color, transform",
                      transform: "translateZ(0)"
                    }}
                  >
                    <div className="w-1.5 h-1.5 bg-current rounded-full mr-4 opacity-0 group-hover:opacity-100 transition-all duration-300 scale-0 group-hover:scale-100" />
                    <span className="relative font-medium">
                      Contact
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 group-hover:w-full transition-all duration-500 ease-out" />
                    </span>
                  </Link>
                </nav>
              </div>

              {/* Connect Section - Green Theme */}
              <div className="text-center md:text-left">
                <div className="mb-8">
                  <div className="flex items-center justify-center md:justify-start mb-4">
                    <div className="relative">
                      <div className="w-3 h-3 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full animate-pulse shadow-lg shadow-emerald-500/50" style={{ animationDelay: '2s' }} />
                      <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 to-teal-400 rounded-full blur-sm animate-pulse" style={{ animationDelay: '2s' }} />
                    </div>
                    <h3 className="text-xl font-black text-gray-900 dark:text-white ml-4 tracking-tight">
                      Connect
                    </h3>
                  </div>
                  <div className="w-16 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 mx-auto md:mx-0 rounded-full shadow-lg shadow-emerald-500/25" />
                </div>
                
                {/* Ultra Modern Social Links */}
                <div className="flex justify-center md:justify-start space-x-4">
                  <ExternalLink 
                    href="https://github.com/NakaSato"
                    customClassName="group relative p-4 bg-white/70 dark:bg-gray-800/70 backdrop-blur-md rounded-3xl border border-gray-200/50 dark:border-gray-700/50 text-gray-600 dark:text-gray-400 hover:text-white hover:bg-gray-900 dark:hover:bg-white dark:hover:text-gray-900 transition-all duration-700 hover:scale-110 hover:rotate-6 shadow-xl hover:shadow-2xl hover:shadow-gray-500/25 overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-500/10 to-gray-700/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      className="relative z-10 transition-transform duration-500 group-hover:scale-110"
                      style={{
                        shapeRendering: "geometricPrecision",
                        transform: "translateZ(0)"
                      }}
                    >
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </ExternalLink>

                  <ExternalLink 
                    href="https://linkedin.com"
                    customClassName="group relative p-4 bg-white/70 dark:bg-gray-800/70 backdrop-blur-md rounded-3xl border border-gray-200/50 dark:border-gray-700/50 text-gray-600 dark:text-gray-400 hover:text-white hover:bg-blue-600 transition-all duration-700 hover:scale-110 hover:rotate-6 shadow-xl hover:shadow-2xl hover:shadow-blue-500/25 overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-blue-700/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      className="relative z-10 transition-transform duration-500 group-hover:scale-110"
                      style={{
                        shapeRendering: "geometricPrecision",
                        transform: "translateZ(0)"
                      }}
                    >
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </ExternalLink>

                  <ExternalLink 
                    href="https://twitter.com/"
                    customClassName="group relative p-4 bg-white/70 dark:bg-gray-800/70 backdrop-blur-md rounded-3xl border border-gray-200/50 dark:border-gray-700/50 text-gray-600 dark:text-gray-400 hover:text-white hover:bg-sky-500 transition-all duration-700 hover:scale-110 hover:rotate-6 shadow-xl hover:shadow-2xl hover:shadow-sky-500/25 overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-sky-500/10 to-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      className="relative z-10 transition-transform duration-500 group-hover:scale-110"
                      style={{
                        shapeRendering: "geometricPrecision",
                        transform: "translateZ(0)"
                      }}
                    >
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                    </svg>
                  </ExternalLink>
                </div>
              </div>
            </div>
          </div>

          {/* Ultra Modern Bottom Section */}
          <div className="mt-20 pt-12 border-t border-gradient-to-r from-transparent via-gray-200/60 to-transparent dark:via-gray-700/60">
            <div className="flex flex-col lg:flex-row justify-between items-center space-y-6 lg:space-y-0">
              
              {/* Tech Stack Display */}
              <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-8 text-sm text-gray-500 dark:text-gray-400">
                <span className="flex items-center font-medium">
                  Built with <span className="text-red-500 mx-2 animate-pulse text-lg">♥</span> and
                </span>
                <div className="flex items-center space-x-4">
                  <div className="relative group">
                    <span className="px-4 py-2 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950/50 dark:to-cyan-950/50 text-blue-700 dark:text-blue-300 rounded-2xl text-xs font-bold uppercase tracking-wider border border-blue-200/50 dark:border-blue-700/50 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                      React
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  
                  <div className="relative group">
                    <span className="px-4 py-2 bg-gradient-to-r from-gray-900 to-black dark:from-white dark:to-gray-100 text-white dark:text-black rounded-2xl text-xs font-bold uppercase tracking-wider shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                      Next.js
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-gray-700/20 to-black/20 dark:from-gray-300/20 dark:to-white/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  
                  <div className="relative group">
                    <span className="px-4 py-2 bg-gradient-to-r from-cyan-50 to-teal-50 dark:from-cyan-950/50 dark:to-teal-950/50 text-cyan-700 dark:text-cyan-300 rounded-2xl text-xs font-bold uppercase tracking-wider border border-cyan-200/50 dark:border-cyan-700/50 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                      Tailwind
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-teal-500/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </div>
              </div>
              
              {/* Copyright */}
              <div className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                © {new Date().getFullYear()} <span className="font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">boring9.dev</span> • All rights reserved
              </div>
            </div>
          </div>
        </div>
      </AnimationContainer>
    </footer>
  );
};

export default Footer;
