import Hero from '../content/Hero';
import AboutMe from '../content/AboutMe';
import CurrentTimeLineExp from '../content/CurrentTimeLineExp';
import CurrentFavTech from '../content/CurrentFavTech';
import CurrentLearning from '../content/CurrentLearning';
import ContactMe from '../content/ContactMe';

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
    className="grid md:grid-cols-[7rem_1fr] gap-x-10 gap-y-8 scroll-mt-24 py-16 md:py-28"
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

const HomeSection = () => {
  return (
    <main className="w-full max-w-4xl mx-auto px-5 sm:px-8">
      <div className="pt-12 md:pt-20">
        <Hero />
      </div>

      <div className="divide-y divide-white/[0.07]">
        <Section num="01" kicker="About" title="Engineer, learner, builder.">
          <AboutMe />
        </Section>

        <Section num="02" kicker="Career" title="Where I've worked.">
          <CurrentTimeLineExp />
        </Section>

        <Section num="03" kicker="Stack" title="Tools of the trade.">
          <CurrentFavTech />
        </Section>

        <Section num="04" kicker="Now" title="Currently learning.">
          <CurrentLearning />
        </Section>

        <Section id="contact" num="05" kicker="Say hi" title="Let's talk.">
          <ContactMe />
        </Section>
      </div>
    </main>
  );
};

export default HomeSection;
