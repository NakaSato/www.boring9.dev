import Link from 'next/link';
import AnimationContainer from '../utils/AnimationContainer';
import ExternalLink from './ExternalLink';

const Footer = () => {
  return (
    <footer className="w-full mt-32 relative overflow-hidden group" style={{
      // Chrome optimization: Enable hardware acceleration
      willChange: "transform",
      transform: "translateZ(0)"
    }}>
      {/* Ultra-Advanced Animated Background System */}
      <div className="absolute inset-0">
        {/* Revolutionary Dynamic Mesh Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50/95 via-white/98 to-indigo-50/50 dark:from-slate-950/98 dark:via-slate-900/95 dark:to-indigo-950/70" />
        
        {/* Interactive Floating Glass Orbs with Advanced Animations */}
        <div 
          className="absolute top-10 left-10 w-80 h-80 bg-gradient-to-br from-blue-400/30 via-cyan-400/25 to-purple-500/30 rounded-full blur-3xl opacity-75 cursor-pointer transition-all duration-1000 hover:opacity-90 hover:scale-110"
          style={{
            animation: 'floatComplex 12s ease-in-out infinite',
            animationDelay: '0s'
          }}
        />
        <div 
          className="absolute bottom-10 right-10 w-96 h-96 bg-gradient-to-br from-purple-400/30 via-pink-400/25 to-orange-500/30 rounded-full blur-3xl opacity-75 cursor-pointer transition-all duration-1000 hover:opacity-90 hover:scale-110"
          style={{
            animation: 'floatComplex 15s ease-in-out infinite reverse',
            animationDelay: '3s'
          }}
        />
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-br from-emerald-400/30 via-teal-400/25 to-cyan-500/30 rounded-full blur-3xl opacity-75 cursor-pointer transition-all duration-1000 hover:opacity-90 hover:scale-110"
          style={{
            animation: 'floatComplex 18s ease-in-out infinite',
            animationDelay: '6s'
          }}
        />
        
        {/* Floating Particle System */}
        <div 
          className="absolute top-20 right-1/3 w-32 h-32 bg-gradient-to-br from-rose-400/20 to-pink-500/20 rounded-full blur-2xl opacity-60"
          style={{
            animation: 'particleFloat 8s ease-in-out infinite',
            animationDelay: '1s'
          }}
        />
        <div 
          className="absolute bottom-32 left-1/3 w-24 h-24 bg-gradient-to-br from-violet-400/20 to-purple-500/20 rounded-full blur-xl opacity-50"
          style={{
            animation: 'particleFloat 10s ease-in-out infinite reverse',
            animationDelay: '4s'
          }}
        />
        <div 
          className="absolute top-1/3 right-20 w-16 h-16 bg-gradient-to-br from-amber-400/25 to-orange-500/25 rounded-full blur-lg opacity-40"
          style={{
            animation: 'particleFloat 6s ease-in-out infinite',
            animationDelay: '2s'
          }}
        />
        
        {/* Advanced Grid Pattern with Complex Animation */}
        <div 
          className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.06)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:3rem_3rem]"
          style={{
            animation: 'gridComplexShift 25s linear infinite'
          }}
        />
        
        {/* Revolutionary Gradient Mesh System */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_25%_25%,rgba(99,102,241,0.15),transparent_65%)] dark:bg-[radial-gradient(ellipse_at_25%_25%,rgba(99,102,241,0.08),transparent_65%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_75%_75%,rgba(168,85,247,0.15),transparent_65%)] dark:bg-[radial-gradient(ellipse_at_75%_75%,rgba(168,85,247,0.08),transparent_65%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_15%,rgba(16,185,129,0.10),transparent_55%)] dark:bg-[radial-gradient(ellipse_at_50%_15%,rgba(16,185,129,0.05),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_40%,rgba(236,72,153,0.08),transparent_50%)] dark:bg-[radial-gradient(ellipse_at_80%_40%,rgba(236,72,153,0.04),transparent_50%)]" />
        
        {/* Enhanced Noise Texture with Animation */}
        <div 
          className="absolute inset-0 opacity-[0.025] dark:opacity-[0.015] bg-[url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20256%20256%22%3E%3Cfilter%20id%3D%22noise%22%3E%3CfeTurbulence%20baseFrequency%3D%221.2%22%20stitchTiles%3D%22stitch%22%2F%3E%3C%2Ffilter%3E%3Crect%20width%3D%22256%22%20height%3D%22256%22%20filter%3D%22url(%23noise)%22%20opacity%3D%221%22%2F%3E%3C%2Fsvg%3E')]"
          style={{
            animation: 'noiseShift 30s linear infinite'
          }}
        />
        
        {/* Dynamic Border Gradient System */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />
        <div 
          className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-blue-500/20 via-purple-500/30 to-cyan-500/20 opacity-60"
          style={{
            animation: 'borderPulse 4s ease-in-out infinite'
          }}
        />
      </div>

      {/* Ultra-Advanced CSS Animation System */}
      <style jsx>{`
        @keyframes floatComplex {
          0%, 100% { 
            transform: translateY(0px) translateX(0px) scale(1) rotate(0deg); 
            filter: blur(3rem) brightness(1);
          }
          25% { 
            transform: translateY(-15px) translateX(5px) scale(1.03) rotate(1deg); 
            filter: blur(2.8rem) brightness(1.1);
          }
          50% { 
            transform: translateY(-30px) translateX(-8px) scale(1.08) rotate(-0.5deg); 
            filter: blur(2.5rem) brightness(1.2);
          }
          75% { 
            transform: translateY(-20px) translateX(10px) scale(1.05) rotate(0.8deg); 
            filter: blur(2.7rem) brightness(1.15);
          }
        }
        
        @keyframes particleFloat {
          0%, 100% { 
            transform: translateY(0px) translateX(0px) scale(1); 
            opacity: 0.4;
          }
          33% { 
            transform: translateY(-20px) translateX(15px) scale(1.1); 
            opacity: 0.7;
          }
          66% { 
            transform: translateY(-10px) translateX(-10px) scale(0.9); 
            opacity: 0.5;
          }
        }
        
        @keyframes gridComplexShift {
          0% { 
            background-position: 0 0; 
            opacity: 1;
          }
          25% { 
            background-position: 1.5rem 0.75rem; 
            opacity: 0.8;
          }
          50% { 
            background-position: 3rem 1.5rem; 
            opacity: 0.6;
          }
          75% { 
            background-position: 1.5rem 2.25rem; 
            opacity: 0.8;
          }
          100% { 
            background-position: 0 3rem; 
            opacity: 1;
          }
        }
        
        @keyframes noiseShift {
          0%, 100% { 
            transform: translateX(0) translateY(0) scale(1); 
            opacity: 0.025;
          }
          25% { 
            transform: translateX(2px) translateY(-1px) scale(1.01); 
            opacity: 0.035;
          }
          50% { 
            transform: translateX(-1px) translateY(2px) scale(0.99); 
            opacity: 0.02;
          }
          75% { 
            transform: translateX(1px) translateY(1px) scale(1.005); 
            opacity: 0.03;
          }
        }
        
        @keyframes borderPulse {
          0%, 100% { 
            opacity: 0.4; 
            transform: scaleX(1);
          }
          50% { 
            opacity: 0.8; 
            transform: scaleX(1.02);
          }
        }
        
        @keyframes glowAdvanced {
          0%, 100% { 
            box-shadow: 0 0 20px rgba(59, 130, 246, 0.3), 
                        0 0 40px rgba(59, 130, 246, 0.1),
                        inset 0 0 20px rgba(59, 130, 246, 0.05);
          }
          25% { 
            box-shadow: 0 0 30px rgba(168, 85, 247, 0.4), 
                        0 0 60px rgba(168, 85, 247, 0.15),
                        inset 0 0 30px rgba(168, 85, 247, 0.08);
          }
          50% { 
            box-shadow: 0 0 40px rgba(16, 185, 129, 0.5), 
                        0 0 80px rgba(16, 185, 129, 0.2),
                        inset 0 0 40px rgba(16, 185, 129, 0.1);
          }
          75% { 
            box-shadow: 0 0 35px rgba(236, 72, 153, 0.45), 
                        0 0 70px rgba(236, 72, 153, 0.18),
                        inset 0 0 35px rgba(236, 72, 153, 0.09);
          }
        }
        
        @keyframes textShimmer {
          0%, 100% { 
            background-position: -200% 0; 
          }
          50% { 
            background-position: 200% 0; 
          }
        }
        
        /* Dark mode specific enhancements */
        @media (prefers-color-scheme: dark) {
          @keyframes noiseShift {
            0%, 100% { 
              opacity: 0.015;
            }
            50% { 
              opacity: 0.025;
            }
          }
        }
        
        /* Reduced motion accessibility */
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>

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
              
              {/* Revolutionary Logo Design */}
              <div className="mb-12">
                <div className="flex items-center justify-center xl:justify-start mb-8">
                  <div className="relative group cursor-pointer">
                    {/* Advanced Glowing Background System */}
                    <div 
                      className="absolute -inset-3 bg-gradient-to-r from-blue-600 via-purple-600 via-cyan-500 to-emerald-600 rounded-3xl blur-lg opacity-20 group-hover:opacity-40 transition-all duration-1000"
                      style={{
                        animation: 'glowAdvanced 8s ease-in-out infinite'
                      }}
                    />
                    <div 
                      className="absolute -inset-2 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 rounded-2xl blur-md opacity-40 group-hover:opacity-70 transition-all duration-700"
                      style={{
                        animation: 'glowAdvanced 6s ease-in-out infinite reverse'
                      }}
                    />
                    <div 
                      className="absolute -inset-1 bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 rounded-xl blur-sm opacity-60 group-hover:opacity-80 transition-all duration-500"
                      style={{
                        animation: 'borderPulse 4s ease-in-out infinite'
                      }}
                    />
                    
                    {/* Enhanced Logo Container */}
                    <div className="relative w-18 h-18 bg-gradient-to-br from-blue-500 via-purple-600 via-cyan-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-blue-500/30 group-hover:shadow-purple-500/40 transition-all duration-700 group-hover:scale-110 group-hover:rotate-3 overflow-hidden">
                      {/* Logo Text with Enhanced Typography */}
                      <span className="text-white font-black text-3xl tracking-tight relative z-10 group-hover:scale-110 transition-transform duration-500">B</span>
                      
                      {/* Multi-layer Inner Glow */}
                      <div className="absolute inset-1 bg-gradient-to-br from-white/25 via-white/10 to-transparent rounded-xl" />
                      <div className="absolute inset-2 bg-gradient-to-tl from-transparent via-white/5 to-white/15 rounded-lg" />
                      
                      {/* Dynamic Reflection Effect */}
                      <div 
                        className="absolute inset-0 bg-gradient-to-br from-transparent via-white/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        style={{
                          background: 'linear-gradient(135deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%)',
                          animation: 'textShimmer 3s ease-in-out infinite'
                        }}
                      />
                    </div>
                    
                    {/* Enhanced Floating Particles */}
                    <div 
                      className="absolute -top-2 -right-2 w-2 h-2 bg-cyan-400 rounded-full animate-ping opacity-75"
                      style={{
                        animation: 'particleFloat 4s ease-in-out infinite'
                      }}
                    />
                    <div 
                      className="absolute -bottom-2 -left-2 w-2 h-2 bg-purple-400 rounded-full animate-ping opacity-75" 
                      style={{ 
                        animation: 'particleFloat 5s ease-in-out infinite reverse',
                        animationDelay: '2s' 
                      }} 
                    />
                    <div 
                      className="absolute top-1/2 -right-3 w-1 h-1 bg-emerald-400 rounded-full animate-ping opacity-60" 
                      style={{ 
                        animation: 'particleFloat 3s ease-in-out infinite',
                        animationDelay: '1s' 
                      }} 
                    />
                  </div>
                  
                  {/* Enhanced Brand Text with Advanced Typography */}
                  <div className="ml-7">
                    <h2 className="text-3xl xl:text-4xl font-black mb-3 relative group cursor-pointer">
                      <span 
                        className="bg-gradient-to-r from-gray-900 via-blue-800 via-purple-800 to-cyan-800 dark:from-white dark:via-blue-200 dark:via-purple-200 dark:to-cyan-200 bg-clip-text text-transparent bg-[length:200%_100%] group-hover:bg-[length:100%_100%] transition-all duration-1000"
                        style={{
                          animation: 'textShimmer 8s ease-in-out infinite'
                        }}
                      >
                        boring9.dev
                      </span>
                      {/* Text Glow Effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-cyan-500/20 blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
                    </h2>
                    <div className="relative group">
                      <div 
                        className="w-full h-1.5 bg-gradient-to-r from-blue-500 via-purple-500 via-cyan-500 to-emerald-500 rounded-full shadow-lg transition-all duration-500 group-hover:h-2 group-hover:shadow-xl"
                        style={{
                          animation: 'borderPulse 3s ease-in-out infinite'
                        }}
                      />
                      <div 
                        className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-400 via-cyan-400 to-emerald-400 rounded-full blur-sm opacity-60 group-hover:opacity-80 transition-opacity duration-500"
                        style={{
                          animation: 'glowAdvanced 4s ease-in-out infinite'
                        }}
                      />
                    </div>
                  </div>
                </div>
                
                {/* Enhanced Description */}
                <p className="text-gray-600 dark:text-gray-300 text-lg xl:text-xl leading-relaxed max-w-lg mx-auto xl:mx-0 mb-10 font-medium">
                  Crafting <span className="text-blue-600 dark:text-blue-400 font-semibold">revolutionary</span> digital experiences with 
                  <span className="text-purple-600 dark:text-purple-400 font-semibold"> cutting-edge technology</span> and 
                  <span className="text-cyan-600 dark:text-cyan-400 font-semibold">boundless creativity</span>.
                </p>
                
                {/* Ultra Modern Stats with Advanced Interactions */}
                <div className="grid grid-cols-3 gap-8 max-w-md mx-auto xl:mx-0">
                  <div className="relative group text-center xl:text-left cursor-pointer">
                    {/* Enhanced Background Effects */}
                    <div 
                      className="absolute -inset-1 bg-gradient-to-br from-blue-500/15 to-cyan-500/15 rounded-3xl blur-sm opacity-0 group-hover:opacity-100 transition-all duration-500"
                      style={{
                        animation: 'borderPulse 4s ease-in-out infinite'
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 rounded-2xl blur group-hover:blur-none transition-all duration-300" />
                    
                    {/* Card Content */}
                    <div className="relative bg-white/60 dark:bg-gray-800/60 backdrop-blur-md rounded-2xl p-5 border border-blue-200/40 dark:border-blue-700/40 group-hover:border-blue-400/60 transition-all duration-500 group-hover:scale-105 group-hover:shadow-xl group-hover:shadow-blue-500/20 overflow-hidden">
                      {/* Animated Number */}
                      <div 
                        className="text-2xl xl:text-3xl font-black bg-gradient-to-br from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300"
                        style={{
                          animation: 'textShimmer 6s ease-in-out infinite'
                        }}
                      >
                        50+
                      </div>
                      <div className="text-xs xl:text-sm text-gray-500 dark:text-gray-400 font-semibold uppercase tracking-wider group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                        Projects
                      </div>
                      
                      {/* Hover Effect Overlay */}
                      <div 
                        className="absolute inset-0 bg-gradient-to-br from-blue-400/10 via-transparent to-cyan-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
                        style={{
                          animation: 'textShimmer 4s ease-in-out infinite'
                        }}
                      />
                    </div>
                  </div>
                  
                  <div className="relative group text-center xl:text-left cursor-pointer">
                    {/* Enhanced Background Effects */}
                    <div 
                      className="absolute -inset-1 bg-gradient-to-br from-purple-500/15 to-pink-500/15 rounded-3xl blur-sm opacity-0 group-hover:opacity-100 transition-all duration-500"
                      style={{
                        animation: 'borderPulse 4s ease-in-out infinite',
                        animationDelay: '1s'
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 rounded-2xl blur group-hover:blur-none transition-all duration-300" />
                    
                    {/* Card Content */}
                    <div className="relative bg-white/60 dark:bg-gray-800/60 backdrop-blur-md rounded-2xl p-5 border border-purple-200/40 dark:border-purple-700/40 group-hover:border-purple-400/60 transition-all duration-500 group-hover:scale-105 group-hover:shadow-xl group-hover:shadow-purple-500/20 overflow-hidden">
                      {/* Animated Number */}
                      <div 
                        className="text-2xl xl:text-3xl font-black bg-gradient-to-br from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300"
                        style={{
                          animation: 'textShimmer 6s ease-in-out infinite',
                          animationDelay: '2s'
                        }}
                      >
                        5+
                      </div>
                      <div className="text-xs xl:text-sm text-gray-500 dark:text-gray-400 font-semibold uppercase tracking-wider group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">
                        Years
                      </div>
                      
                      {/* Hover Effect Overlay */}
                      <div 
                        className="absolute inset-0 bg-gradient-to-br from-purple-400/10 via-transparent to-pink-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
                        style={{
                          animation: 'textShimmer 4s ease-in-out infinite',
                          animationDelay: '1s'
                        }}
                      />
                    </div>
                  </div>
                  
                  <div className="relative group text-center xl:text-left cursor-pointer">
                    {/* Enhanced Background Effects */}
                    <div 
                      className="absolute -inset-1 bg-gradient-to-br from-emerald-500/15 to-teal-500/15 rounded-3xl blur-sm opacity-0 group-hover:opacity-100 transition-all duration-500"
                      style={{
                        animation: 'borderPulse 4s ease-in-out infinite',
                        animationDelay: '2s'
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-teal-500/5 rounded-2xl blur group-hover:blur-none transition-all duration-300" />
                    
                    {/* Card Content */}
                    <div className="relative bg-white/60 dark:bg-gray-800/60 backdrop-blur-md rounded-2xl p-5 border border-emerald-200/40 dark:border-emerald-700/40 group-hover:border-emerald-400/60 transition-all duration-500 group-hover:scale-105 group-hover:shadow-xl group-hover:shadow-emerald-500/20 overflow-hidden">
                      {/* Animated Number */}
                      <div 
                        className="text-2xl xl:text-3xl font-black bg-gradient-to-br from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300"
                        style={{
                          animation: 'textShimmer 6s ease-in-out infinite',
                          animationDelay: '4s'
                        }}
                      >
                        ∞
                      </div>
                      <div className="text-xs xl:text-sm text-gray-500 dark:text-gray-400 font-semibold uppercase tracking-wider group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-300">
                        Ideas
                      </div>
                      
                      {/* Hover Effect Overlay */}
                      <div 
                        className="absolute inset-0 bg-gradient-to-br from-emerald-400/10 via-transparent to-teal-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
                        style={{
                          animation: 'textShimmer 4s ease-in-out infinite',
                          animationDelay: '2s'
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Revolutionary Navigation Columns */}
            <div className="xl:col-span-7 grid grid-cols-1 md:grid-cols-3 gap-12">
              
              {/* Explore Section - Enhanced Blue Theme */}
              <div className="text-center md:text-left">
                <div className="mb-8">
                  <div className="flex items-center justify-center md:justify-start mb-4 group cursor-pointer">
                    <div className="relative">
                      <div 
                        className="w-3 h-3 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full shadow-lg shadow-blue-500/50 group-hover:scale-125 transition-transform duration-300"
                        style={{
                          animation: 'glowAdvanced 6s ease-in-out infinite'
                        }}
                      />
                      <div 
                        className="absolute inset-0 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full blur-sm opacity-60 group-hover:opacity-80 transition-opacity duration-300"
                        style={{
                          animation: 'borderPulse 4s ease-in-out infinite'
                        }}
                      />
                      <div className="absolute -inset-1 bg-blue-400/20 rounded-full blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    <h3 className="text-xl font-black text-gray-900 dark:text-white ml-4 tracking-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                      Explore
                    </h3>
                  </div>
                  <div 
                    className="w-16 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 mx-auto md:mx-0 rounded-full shadow-lg shadow-blue-500/25 hover:w-20 hover:h-1.5 transition-all duration-500 cursor-pointer"
                    style={{
                      animation: 'borderPulse 5s ease-in-out infinite'
                    }}
                  />
                </div>
                
                <nav className="space-y-5">
                  <Link
                    href="/"
                    className="group flex items-center justify-center md:justify-start text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-500 hover:translate-x-2 hover:scale-105 relative"
                    style={{
                      willChange: "color, transform",
                      transform: "translateZ(0)"
                    }}
                  >
                    <div className="w-1.5 h-1.5 bg-current rounded-full mr-4 opacity-0 group-hover:opacity-100 transition-all duration-300 scale-0 group-hover:scale-125 shadow-lg shadow-current/50" />
                    <span className="relative font-medium group-hover:font-semibold transition-all duration-300">
                      Home
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 group-hover:w-full transition-all duration-700 ease-out shadow-lg shadow-blue-500/30" />
                      <span className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-sm" />
                    </span>
                  </Link>
                  
                  <Link
                    href="/about"
                    className="group flex items-center justify-center md:justify-start text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-500 hover:translate-x-2 hover:scale-105 relative"
                    style={{
                      willChange: "color, transform",
                      transform: "translateZ(0)"
                    }}
                  >
                    <div className="w-1.5 h-1.5 bg-current rounded-full mr-4 opacity-0 group-hover:opacity-100 transition-all duration-300 scale-0 group-hover:scale-125 shadow-lg shadow-current/50" />
                    <span className="relative font-medium group-hover:font-semibold transition-all duration-300">
                      About
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 group-hover:w-full transition-all duration-700 ease-out shadow-lg shadow-blue-500/30" />
                      <span className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-sm" />
                    </span>
                  </Link>
                  
                  <Link
                    href="/projects"
                    className="group flex items-center justify-center md:justify-start text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-500 hover:translate-x-2 hover:scale-105 relative"
                    style={{
                      willChange: "color, transform",
                      transform: "translateZ(0)"
                    }}
                  >
                    <div className="w-1.5 h-1.5 bg-current rounded-full mr-4 opacity-0 group-hover:opacity-100 transition-all duration-300 scale-0 group-hover:scale-125 shadow-lg shadow-current/50" />
                    <span className="relative font-medium group-hover:font-semibold transition-all duration-300">
                      Projects
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 group-hover:w-full transition-all duration-700 ease-out shadow-lg shadow-blue-500/30" />
                      <span className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-sm" />
                    </span>
                  </Link>
                </nav>
              </div>

              {/* Content Section - Enhanced Purple Theme */}
              <div className="text-center md:text-left">
                <div className="mb-8">
                  <div className="flex items-center justify-center md:justify-start mb-4 group cursor-pointer">
                    <div className="relative">
                      <div 
                        className="w-3 h-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full shadow-lg shadow-purple-500/50 group-hover:scale-125 transition-transform duration-300" 
                        style={{ 
                          animation: 'glowAdvanced 6s ease-in-out infinite',
                          animationDelay: '2s' 
                        }} 
                      />
                      <div 
                        className="absolute inset-0 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full blur-sm opacity-60 group-hover:opacity-80 transition-opacity duration-300" 
                        style={{ 
                          animation: 'borderPulse 4s ease-in-out infinite',
                          animationDelay: '1s' 
                        }} 
                      />
                      <div className="absolute -inset-1 bg-purple-400/20 rounded-full blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    <h3 className="text-xl font-black text-gray-900 dark:text-white ml-4 tracking-tight group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">
                      Content
                    </h3>
                  </div>
                  <div 
                    className="w-16 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto md:mx-0 rounded-full shadow-lg shadow-purple-500/25 hover:w-20 hover:h-1.5 transition-all duration-500 cursor-pointer"
                    style={{
                      animation: 'borderPulse 5s ease-in-out infinite',
                      animationDelay: '1s'
                    }}
                  />
                </div>
                
                <nav className="space-y-5">
                  <Link
                    href="/blog"
                    className="group flex items-center justify-center md:justify-start text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-all duration-500 hover:translate-x-2 hover:scale-105 relative"
                    style={{
                      willChange: "color, transform",
                      transform: "translateZ(0)"
                    }}
                  >
                    <div className="w-1.5 h-1.5 bg-current rounded-full mr-4 opacity-0 group-hover:opacity-100 transition-all duration-300 scale-0 group-hover:scale-125 shadow-lg shadow-current/50" />
                    <span className="relative font-medium group-hover:font-semibold transition-all duration-300">
                      Blog
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 group-hover:w-full transition-all duration-700 ease-out shadow-lg shadow-purple-500/30" />
                      <span className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-sm" />
                    </span>
                  </Link>
                  
                  <Link
                    href="/contact"
                    className="group flex items-center justify-center md:justify-start text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-all duration-500 hover:translate-x-2 hover:scale-105 relative"
                    style={{
                      willChange: "color, transform",
                      transform: "translateZ(0)"
                    }}
                  >
                    <div className="w-1.5 h-1.5 bg-current rounded-full mr-4 opacity-0 group-hover:opacity-100 transition-all duration-300 scale-0 group-hover:scale-125 shadow-lg shadow-current/50" />
                    <span className="relative font-medium group-hover:font-semibold transition-all duration-300">
                      Contact
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 group-hover:w-full transition-all duration-700 ease-out shadow-lg shadow-purple-500/30" />
                      <span className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-sm" />
                    </span>
                  </Link>
                </nav>
              </div>

              {/* Connect Section - Enhanced Green Theme */}
              <div className="text-center md:text-left">
                <div className="mb-8">
                  <div className="flex items-center justify-center md:justify-start mb-4 group cursor-pointer">
                    <div className="relative">
                      <div 
                        className="w-3 h-3 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full shadow-lg shadow-emerald-500/50 group-hover:scale-125 transition-transform duration-300" 
                        style={{ 
                          animation: 'glowAdvanced 6s ease-in-out infinite',
                          animationDelay: '4s' 
                        }} 
                      />
                      <div 
                        className="absolute inset-0 bg-gradient-to-br from-emerald-400 to-teal-400 rounded-full blur-sm opacity-60 group-hover:opacity-80 transition-opacity duration-300" 
                        style={{ 
                          animation: 'borderPulse 4s ease-in-out infinite',
                          animationDelay: '2s' 
                        }} 
                      />
                      <div className="absolute -inset-1 bg-emerald-400/20 rounded-full blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    <h3 className="text-xl font-black text-gray-900 dark:text-white ml-4 tracking-tight group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-300">
                      Connect
                    </h3>
                  </div>
                  <div 
                    className="w-16 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 mx-auto md:mx-0 rounded-full shadow-lg shadow-emerald-500/25 hover:w-20 hover:h-1.5 transition-all duration-500 cursor-pointer"
                    style={{
                      animation: 'borderPulse 5s ease-in-out infinite',
                      animationDelay: '2s'
                    }}
                  />
                </div>
                
                {/* Ultra Modern Social Links with 3D Effects */}
                <div className="flex justify-center md:justify-start space-x-5">
                  <ExternalLink 
                    href="https://github.com/NakaSato"
                    customClassName="group relative p-5 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl border border-gray-200/60 dark:border-gray-700/60 text-gray-600 dark:text-gray-400 hover:text-white hover:bg-gray-900 dark:hover:bg-white dark:hover:text-gray-900 transition-all duration-1000 hover:scale-125 hover:rotate-12 shadow-2xl hover:shadow-3xl hover:shadow-gray-500/30 overflow-hidden transform-gpu perspective-1000"
                  >
                    {/* Multi-layered Background Effects */}
                    <div 
                      className="absolute inset-0 bg-gradient-to-br from-gray-500/15 via-gray-600/10 to-gray-700/15 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 rounded-3xl"
                      style={{
                        animation: 'textShimmer 5s ease-in-out infinite'
                      }}
                    />
                    <div className="absolute -inset-1 bg-gradient-to-br from-gray-400/20 to-gray-600/20 rounded-3xl blur opacity-0 group-hover:opacity-100 transition-all duration-700" />
                    <div className="absolute inset-0 bg-gray-900/5 dark:bg-white/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    {/* Enhanced Icon */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="26"
                      height="26"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      className="relative z-10 transition-all duration-700 group-hover:scale-125 group-hover:rotate-6 filter group-hover:drop-shadow-lg"
                      style={{
                        shapeRendering: "geometricPrecision",
                        transform: "translateZ(0)",
                        filter: "drop-shadow(0 0 0 currentColor)"
                      }}
                    >
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                    
                    {/* Floating Particles */}
                    <div 
                      className="absolute top-1 right-1 w-1 h-1 bg-current rounded-full opacity-0 group-hover:opacity-60 transition-opacity duration-500"
                      style={{
                        animation: 'particleFloat 3s ease-in-out infinite'
                      }}
                    />
                  </ExternalLink>

                  <ExternalLink 
                    href="https://linkedin.com"
                    customClassName="group relative p-5 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl border border-gray-200/60 dark:border-gray-700/60 text-gray-600 dark:text-gray-400 hover:text-white hover:bg-blue-600 transition-all duration-1000 hover:scale-125 hover:rotate-12 shadow-2xl hover:shadow-3xl hover:shadow-blue-500/30 overflow-hidden transform-gpu perspective-1000"
                  >
                    {/* Multi-layered Background Effects */}
                    <div 
                      className="absolute inset-0 bg-gradient-to-br from-blue-500/15 via-blue-600/10 to-blue-700/15 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 rounded-3xl"
                      style={{
                        animation: 'textShimmer 5s ease-in-out infinite',
                        animationDelay: '1s'
                      }}
                    />
                    <div className="absolute -inset-1 bg-gradient-to-br from-blue-400/20 to-blue-600/20 rounded-3xl blur opacity-0 group-hover:opacity-100 transition-all duration-700" />
                    <div className="absolute inset-0 bg-blue-600/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    {/* Enhanced Icon */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="26"
                      height="26"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      className="relative z-10 transition-all duration-700 group-hover:scale-125 group-hover:rotate-6 filter group-hover:drop-shadow-lg"
                      style={{
                        shapeRendering: "geometricPrecision",
                        transform: "translateZ(0)",
                        filter: "drop-shadow(0 0 0 currentColor)"
                      }}
                    >
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                    
                    {/* Floating Particles */}
                    <div 
                      className="absolute top-1 right-1 w-1 h-1 bg-current rounded-full opacity-0 group-hover:opacity-60 transition-opacity duration-500"
                      style={{
                        animation: 'particleFloat 3s ease-in-out infinite',
                        animationDelay: '0.5s'
                      }}
                    />
                  </ExternalLink>

                  <ExternalLink 
                    href="https://twitter.com/"
                    customClassName="group relative p-5 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl border border-gray-200/60 dark:border-gray-700/60 text-gray-600 dark:text-gray-400 hover:text-white hover:bg-sky-500 transition-all duration-1000 hover:scale-125 hover:rotate-12 shadow-2xl hover:shadow-3xl hover:shadow-sky-500/30 overflow-hidden transform-gpu perspective-1000"
                  >
                    {/* Multi-layered Background Effects */}
                    <div 
                      className="absolute inset-0 bg-gradient-to-br from-sky-500/15 via-sky-600/10 to-blue-600/15 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 rounded-3xl"
                      style={{
                        animation: 'textShimmer 5s ease-in-out infinite',
                        animationDelay: '2s'
                      }}
                    />
                    <div className="absolute -inset-1 bg-gradient-to-br from-sky-400/20 to-blue-600/20 rounded-3xl blur opacity-0 group-hover:opacity-100 transition-all duration-700" />
                    <div className="absolute inset-0 bg-sky-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    {/* Enhanced Icon */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="26"
                      height="26"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      className="relative z-10 transition-all duration-700 group-hover:scale-125 group-hover:rotate-6 filter group-hover:drop-shadow-lg"
                      style={{
                        shapeRendering: "geometricPrecision",
                        transform: "translateZ(0)",
                        filter: "drop-shadow(0 0 0 currentColor)"
                      }}
                    >
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                    </svg>
                    
                    {/* Floating Particles */}
                    <div 
                      className="absolute top-1 right-1 w-1 h-1 bg-current rounded-full opacity-0 group-hover:opacity-60 transition-opacity duration-500"
                      style={{
                        animation: 'particleFloat 3s ease-in-out infinite',
                        animationDelay: '1s'
                      }}
                    />
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
