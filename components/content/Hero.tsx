'use client';

import Image from 'next/image';
import AnimationContainer from '../utils/AnimationContainer';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <div className="flex flex-col-reverse items-center justify-between w-full lg:flex-row">
      <AnimationContainer customClassName="w-full lg:w-3/5">
        <div className="flex flex-col items-center justify-between lg:items-start p-0 lg:pr-8">
          <h1 className="mx-auto mb-3 text-3xl font-bold tracking-tight text-center text-white lg:text-5xl lg:text-start lg:mx-0 bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
            Chanthawat Kiriyadee
          </h1>
        </div>

        <h2 className="flex items-center gap-2 mx-auto mb-8 text-gray-200 text-xl lg:text-2xl lg:mx-0">
          <span className="font-semibold text-indigo-300">ComEng</span>
          <span className="relative">
            Student
            <motion.span
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                width: '100%',
                height: '2px',
                backgroundColor: '#818cf8'
              }}
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 1, delay: 0.5 }}
            />
          </span>
        </h2>

        <p className="text-gray-300 max-w-lg mb-6 text-center lg:text-left">
          Passionate about building beautiful and functional web experiences.
          Constantly learning and experimenting with new technologies.
        </p>
      </AnimationContainer>

      <AnimationContainer customClassName="w-full lg:w-2/5 flex justify-center lg:justify-end">
        <div className="relative w-[120px] sm:w-[200px] mb-6 lg:mb-0 group">
          <div className="absolute inset-0 rounded-[12px] bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 blur-md opacity-70 group-hover:opacity-100 transition-opacity duration-300"></div>
          <Image
            alt="Chanthawat Kiriyadee"
            height={200}
            width={200}
            src="/profile.jpeg"
            sizes="(max-width: 640px) 120px, 200px"
            priority
            className="rounded-[12px] relative z-10 filter grayscale hover:grayscale-0 transition-all duration-300 ease transform group-hover:scale-105"
          />
        </div>
      </AnimationContainer>
    </div>
  );
};

export default Hero;
