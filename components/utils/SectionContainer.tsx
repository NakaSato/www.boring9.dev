const SectionContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="w-full max-w-screen-lg mx-auto flex flex-col items-center justify-center lg:items-start mt-8">
      {children}
    </section>
  );
};

export default SectionContainer;
