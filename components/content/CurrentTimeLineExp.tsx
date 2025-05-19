'use client';

import AnimationContainer from '../utils/AnimationContainer';
import { Timeline, TimelineEvent } from './TimeLineExp';

const CurrentTimeLineExp = () => {
  return (
    <AnimationContainer customClassName="w-full">
      <div className="w-full p-6 bg-gray-900/50 rounded-xl border border-primary-800/20 shadow-lg">
        <h2 className="font-bold text-2xl md:text-3xl tracking-tight mb-8 text-white text-start bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent">
          Experience
        </h2>
        
        <Timeline>
          <TimelineEvent active>
            <TimelineEvent.Title>
              <a
                href="https://www.fulcrum.co.th"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-400 hover:text-primary-300 hover:underline transition-all ease"
              >
                Fulcrum Engineering Thailand
              </a>{' '}
              | may. 2022 - Currently
            </TimelineEvent.Title>

            <TimelineEvent.Description>
              "I spend the majority of my free time learning coding, electrical
              engineering, and hacking. I'm particularly interested in the Rust
              programming language. I've been an amateur programmer for a long time,
              driven by my passion for coding."
            </TimelineEvent.Description>
          </TimelineEvent>
        </Timeline>
      </div>
    </AnimationContainer>
  );
};

export default CurrentTimeLineExp;
