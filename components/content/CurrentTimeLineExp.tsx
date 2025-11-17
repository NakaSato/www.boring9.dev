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
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-semibold">Cloud Engineer</span>
                <span className="text-gray-400">•</span>
                <span>Mars Technology Co., Ltd.</span>
              </div>
              <div className="text-sm font-normal text-primary-400 mt-1 flex items-center gap-2">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <span>October 2025 - Present</span>
                <span className="px-2 py-0.5 bg-primary-500/20 text-primary-300 rounded-full text-xs font-medium">
                  Current
                </span>
              </div>
            </TimelineEvent.Title>

            <TimelineEvent.Description>
              Working as a Cloud Engineer at Mars Technology Co., Ltd., focusing
              on cloud infrastructure, on-premise to cloud migration, and
              observability. Implementing scalable solutions using modern cloud
              technologies and security best practices.
            </TimelineEvent.Description>
          </TimelineEvent>

          <TimelineEvent>
            <TimelineEvent.Title>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-semibold">Draftsman Technician</span>
                <span className="text-gray-400">•</span>
                <span>TC Renewable Energy Co., Ltd.</span>
              </div>
              <div className="text-sm font-normal text-gray-400 mt-1 flex items-center gap-2">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <span>June 2024 - September 2025 • 1 year 4 months</span>
              </div>
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
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-semibold">Electrical Technician</span>
                <span className="text-gray-400">•</span>
                <span>Fulcrum Engineering Thailand</span>
              </div>
              <div className="text-sm font-normal text-gray-400 mt-1 flex items-center gap-2">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <span>May 2022 - April 2024 • 2 years</span>
              </div>
            </TimelineEvent.Title>

            <TimelineEvent.Description>
              Worked as an Electrical Engineer while spending free time learning
              coding and cybersecurity. Developed strong problem-solving skills
              and discovered a passion for programming, particularly interested
              in the Rust programming language and security tools like BurpSuite
              for penetration testing.
            </TimelineEvent.Description>
          </TimelineEvent>
        </Timeline>
      </div>
    </AnimationContainer>
  );
};

export default CurrentTimeLineExp;
