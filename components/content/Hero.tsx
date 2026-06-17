'use client';

import Image from 'next/image';
import AnimationContainer from '../utils/AnimationContainer';

const Hero = () => {
  return (
    <div className="w-full mb-20 md:mb-28">
      <AnimationContainer customClassName="w-full">
        <div className="flex flex-col-reverse lg:flex-row lg:items-end lg:justify-between gap-10 lg:gap-12">
          <div className="lg:flex-1">
            <p className="mb-6 font-mono text-xs uppercase tracking-[0.3em] text-primary-400/80">
              Hi, I&apos;m
            </p>
            <h1 className="font-bold uppercase tracking-tight leading-[0.9] text-gray-50 text-5xl sm:text-7xl lg:text-8xl">
              Chanthawat
              <br />
              <span className="text-white/90">Kiriyadee</span>
            </h1>
          </div>

          <div className="group relative w-44 sm:w-52 lg:w-60 shrink-0">
            <span
              aria-hidden
              className="absolute -bottom-3 -right-3 h-full w-full border border-primary-500/40 transition-all duration-500 group-hover:-bottom-2 group-hover:-right-2"
            />
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                alt="Chanthawat Kiriyadee"
                fill
                src="/profile.jpeg"
                sizes="(max-width: 640px) 176px, (max-width: 1024px) 208px, 240px"
                priority
                className="object-cover grayscale transition-all duration-700 ease-out scale-105 group-hover:grayscale-0 group-hover:scale-100"
              />
              <span
                aria-hidden
                className="absolute inset-0 ring-1 ring-inset ring-white/10"
              />
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-baseline gap-x-3 gap-y-1 text-xl sm:text-2xl">
          <span className="font-semibold text-primary-400">ComEng</span>
          <span className="text-gray-600">×</span>
          <span className="font-semibold text-gray-200">AI</span>
          <span className="font-medium text-gray-400">Student</span>
        </div>

        <p className="mt-8 max-w-xl text-lg text-gray-400 leading-relaxed">
          Passionate about building beautiful and functional web experiences.
          Constantly learning and experimenting with new technologies.
        </p>

        <div className="mt-10 flex flex-wrap gap-4">
          <a
            href="https://github.com/NakaSato"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 px-6 py-3 bg-gray-50 text-gray-950 font-semibold rounded-none hover:bg-primary-400 transition-colors duration-300"
          >
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                clipRule="evenodd"
              ></path>
            </svg>
            <span>GitHub</span>
          </a>
          <a
            href="mailto:wit.chanthawat@gmail.com"
            className="group inline-flex items-center gap-2 px-6 py-3 border border-white/20 text-gray-100 font-semibold rounded-none hover:border-primary-400 hover:text-primary-400 transition-colors duration-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            <span>Contact Me</span>
          </a>
        </div>
      </AnimationContainer>
    </div>
  );
};

export default Hero;
