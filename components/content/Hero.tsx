'use client';

import Image from 'next/image';
import AnimationContainer from '../utils/AnimationContainer';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <div className="flex flex-col-reverse items-center justify-between w-full lg:flex-row mb-16 md:mb-24">
      <AnimationContainer customClassName="w-full lg:w-3/5">
        <div className="flex flex-col items-center justify-between lg:items-start p-0 lg:pr-8">
          <h1 className="mx-auto mb-3 text-3xl font-bold tracking-tight text-center text-gray-900 lg:text-5xl lg:text-start lg:mx-0 bg-clip-text text-transparent bg-gradient-to-r from-primary-400 via-secondary-400 to-accent-400">
            Chanthawat Kiriyadee
          </h1>
        </div>

        <h2 className="flex items-center gap-2 mx-auto mb-8 text-gray-700 text-xl lg:text-2xl lg:mx-0">
          <span className="font-semibold text-primary-600">ComEng</span>
          <span className="relative">
            Student
            <motion.span
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                width: '100%',
                height: '2px',
                backgroundColor: 'var(--color-primary-400)'
              }}
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 1, delay: 0.5 }}
            />
          </span>
        </h2>

        <p className="text-gray-600 max-w-lg mb-8 text-center lg:text-left">
          Passionate about building beautiful and functional web experiences.
          Constantly learning and experimenting with new technologies.
        </p>
        
        <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
          <a 
            href="https://github.com/NakaSato" 
            target="_blank" 
            rel="noopener noreferrer"
            className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-md transition-all duration-300 flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"></path>
            </svg>
            GitHub
          </a>
          <a 
            href="#contact" 
            className="px-4 py-2 bg-accent-600 hover:bg-accent-700 text-white rounded-md transition-all duration-300 flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Contact Me
          </a>
        </div>
      </AnimationContainer>

      <AnimationContainer customClassName="w-full lg:w-2/5 flex justify-center lg:justify-end">
        <div className="relative w-[120px] sm:w-[200px] mb-6 lg:mb-0 group">
          <div className="absolute inset-0 rounded-[12px] bg-gradient-to-r from-accent-500 via-secondary-500 to-primary-500 blur-md opacity-70 group-hover:opacity-100 transition-opacity duration-300"></div>
          <Image
            alt="Chanthawat Kiriyadee"
            height={200}
            width={200}
            src="/profile.jpeg"
            sizes="(max-width: 640px) 120px, 200px"
            priority
            className="rounded-[12px] relative z-10 filter grayscale hover:grayscale-0 transition-all duration-300 ease transform group-hover:scale-105 shadow-lg border-2 border-gray-200"
          />
        </div>
      </AnimationContainer>
    </div>
  );
};

export default Hero;
