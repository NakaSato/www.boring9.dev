import CurrentTimeLineExp from '../content/CurrentTimeLineExp';
import AnimationContainer from '../utils/AnimationContainer';
import ShowSkills from '../utils/show-skill';
import { skills } from '../utils/mySkills';

const Section = ({
  id,
  num,
  kicker,
  title,
  children
}: {
  id?: string;
  num: string;
  kicker: string;
  title: string;
  children: React.ReactNode;
}) => (
  <section
    id={id}
    className="grid md:grid-cols-[7rem_1fr] gap-x-10 gap-y-8 scroll-mt-24 py-16 md:py-24"
  >
    <div className="flex items-baseline gap-4 md:flex-col md:items-start md:gap-2">
      <span className="font-mono text-5xl md:text-6xl font-bold leading-none text-white/[0.08] select-none">
        {num}
      </span>
      <span className="font-mono text-[0.7rem] uppercase tracking-[0.25em] text-primary-400/80">
        {kicker}
      </span>
    </div>
    <div className="min-w-0">
      <h2 className="mb-8 md:mb-10 text-3xl md:text-5xl font-bold tracking-tight leading-[1.05] text-gray-50">
        {title}
      </h2>
      {children}
    </div>
  </section>
);

const AboutSection = () => {
  return (
    <section className="w-full max-w-4xl mx-auto px-5 sm:px-8">
      <AnimationContainer customClassName="pt-16 md:pt-24 pb-4">
        <p className="mb-6 font-mono text-xs uppercase tracking-[0.3em] text-primary-400/80">
          About
        </p>
        <h1 className="font-bold uppercase tracking-tight leading-[0.9] text-gray-50 text-5xl sm:text-7xl lg:text-8xl">
          Who I am.
        </h1>
      </AnimationContainer>

      <div className="divide-y divide-white/[0.07]">
        <Section num="01" kicker="Intro" title="Engineer & lifelong learner.">
          <p className="max-w-2xl text-xl md:text-2xl text-gray-300 leading-relaxed font-light">
            Currently pursuing expertise in Cybersecurity while actively
            building full-stack applications. I thrive on continuous learning,
            exploring new frameworks, and contributing to projects that
            challenge me to grow. My goal is to bridge the gap between secure,
            scalable systems and exceptional user experiences.
          </p>
        </Section>

        <Section num="02" kicker="Career" title="Where I've worked.">
          <CurrentTimeLineExp />
        </Section>

        <Section num="03" kicker="Stack" title="Skills & tools.">
          <div className="flex flex-col gap-10">
            {skills.map(({ title, techs }) => (
              <div key={title} className="w-full">
                <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-gray-500 mb-5">
                  {title}
                </h3>
                <div className="flex items-center flex-wrap">
                  <ShowSkills skills={techs} />
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Section num="04" kicker="Now" title="Current focus.">
          <p className="max-w-2xl text-lg md:text-xl text-gray-300 leading-relaxed font-light">
            Deepening my expertise in backend development with Rust and Python,
            exploring their performance characteristics and use cases.
            Particularly interested in building high-performance APIs and secure
            distributed systems.
          </p>
        </Section>
      </div>
    </section>
  );
};

export default AboutSection;
