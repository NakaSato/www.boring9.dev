const BlogContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="min-h-screen w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
      <div className="flex flex-col gap-8">{children}</div>
    </section>
  );
};

export default BlogContainer;
