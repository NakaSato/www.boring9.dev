'use client';

import AnimationContainer from '../utils/AnimationContainer';
import { Timeline, TimelineEvent } from './TimeLineExp';

const CurrentTimeLineExp = () => {
  return (
    <AnimationContainer customClassName="w-full">
      <Timeline>
        <TimelineEvent active>
          <TimelineEvent.Title>
            <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.15em]">
              <span className="text-gray-500">June 2024 — Present</span>
              <span className="inline-flex items-center gap-1.5 text-primary-300">
                <span className="w-1.5 h-1.5 rounded-full bg-primary-400 animate-pulse" />
                Current
              </span>
            </div>
            <h3 className="text-xl md:text-2xl font-bold tracking-tight text-gray-50">
              Draftsman Technician
            </h3>
            <p className="text-base text-gray-400">
              TC Renewable Energy Co., Ltd.
            </p>
          </TimelineEvent.Title>

          <TimelineEvent.Description>
            Working as a Draftsman on technical solar projects, creating
            detailed technical drawings and documentation for renewable energy
            installations. Gaining hands-on experience in solar system design,
            electrical schematics, and project documentation while developing
            technical drafting skills in the renewable energy sector.
          </TimelineEvent.Description>
        </TimelineEvent>

        <TimelineEvent last>
          <TimelineEvent.Title>
            <div className="font-mono text-xs uppercase tracking-[0.15em] text-gray-500">
              May 2022 — April 2024 · 2 years
            </div>
            <h3 className="text-xl md:text-2xl font-bold tracking-tight text-gray-100">
              Electrical Technician
            </h3>
            <p className="text-base text-gray-400">
              Fulcrum Engineering Thailand
            </p>
          </TimelineEvent.Title>

          <TimelineEvent.Description>
            Worked as an Electrical Engineer while spending free time learning
            coding and cybersecurity. Developed strong problem-solving skills
            and discovered a passion for programming, particularly interested in
            the Rust programming language and security tools like BurpSuite for
            penetration testing.
          </TimelineEvent.Description>
        </TimelineEvent>
      </Timeline>
    </AnimationContainer>
  );
};

export default CurrentTimeLineExp;
