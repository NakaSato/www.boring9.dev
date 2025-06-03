'use client';

const ShowSkills = ({ skills }: { skills: string | string[] }) => {
  if (skills instanceof Array) {
    return (
      <>
        {skills.map((skill) => (
          <span
            key={skill}
            className="mx-1 inline-block px-3 py-1.5 bg-primary-900/80 border border-primary-600/30 text-primary-100 rounded-md font-medium text-sm tracking-wide transition-all duration-300 hover:scale-110 hover:bg-primary-800/90"
          >
            {skill}
          </span>
        ))}
      </>
    );
  }

  return (
    <span 
      className="inline-block px-3 py-1.5 bg-primary-900/80 border border-primary-600/30 text-primary-100 rounded-md font-medium text-sm tracking-wide transition-all duration-300 hover:scale-110 hover:bg-primary-800/90"
    >
      {skills}
    </span>
  );
};

export default ShowSkills;
