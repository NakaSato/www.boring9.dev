'use client';

import { Badge } from '@mantine/core';

const ShowSkills = ({ skills }: { skills: string | string[] }) => {
  if (skills instanceof Array) {
    return (
      <>
        {skills.map((skill) => (
          <Badge
            key={skill}
            className="mx-1 transition-all duration-300 hover:scale-110"
            color="primary"
            size="lg"
            radius="md"
            variant="filled"
            styles={(theme) => ({
              root: {
                backgroundColor: 'rgba(var(--color-primary-900), 0.8)',
                borderColor: 'rgba(var(--color-primary-600), 0.3)',
                color: 'rgba(var(--color-primary-100), 1)',
                border: '1px solid',
                padding: '6px 12px',
                fontWeight: 500,
                letterSpacing: '0.02em',
                '&:hover': {
                  backgroundColor: 'rgba(var(--color-primary-800), 0.9)',
                }
              }
            })}
          >
            {skill}
          </Badge>
        ))}
      </>
    );
  }

  return (
    <Badge 
      color="primary"
      size="lg"
      radius="md"
      variant="filled"
      styles={(theme) => ({
        root: {
          backgroundColor: 'rgba(var(--color-primary-900), 0.8)',
          borderColor: 'rgba(var(--color-primary-600), 0.3)',
          color: 'rgba(var(--color-primary-100), 1)',
          border: '1px solid',
          padding: '6px 12px',
          fontWeight: 500,
          letterSpacing: '0.02em',
          '&:hover': {
            backgroundColor: 'rgba(var(--color-primary-800), 0.9)',
          }
        }
      })}
      className="transition-all duration-300 hover:scale-110"
    >
      {skills}
    </Badge>
  );
};

export default ShowSkills;
