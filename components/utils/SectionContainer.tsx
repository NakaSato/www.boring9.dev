const SectionContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="w-3/4 lg:max-w-screen-md flex flex-col items-center justify-center lg:items-start lg:mx-auto mt-8 pb-16" style={{
      // Chrome optimization: Section container performance
      contain: "layout style",
      transform: "translateZ(0)"
    }}>
      {children}
    </section>
  );
};

export default SectionContainer;
