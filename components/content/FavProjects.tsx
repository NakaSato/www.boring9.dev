'use client';

import { Card, Text, Button, Group, Badge, Container } from '@mantine/core';
import { Carousel } from '@mantine/carousel';
import Link from 'next/link';
import AnimationContainer from '../utils/AnimationContainer';

const myProjects = [
  {
    title: 'Project One',
    description:
      'A sample project description that shows what this project is about.',
    image: '/images/project1.jpg',
    tech: ['React', 'Next.js', 'TypeScript'],
    githubUrl: 'https://github.com/username/project1',
    liveUrl: 'https://project1.com',
    status: 'Completed'
  },
  {
    title: 'Project Two',
    description:
      'Another project description explaining the features and purpose.',
    image: '/images/project2.jpg',
    tech: ['Vue.js', 'Node.js', 'MongoDB'],
    githubUrl: 'https://github.com/username/project2',
    liveUrl: null,
    status: 'In Progress'
  }
  // Add more projects as needed
];

const FavProjects = () => {
  return (
    <AnimationContainer customClassName="w-full">
      <Container size="lg" py="xl">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold mb-4 text-white">
            Featured Projects
          </h2>
          <Text size="lg" c="dimmed">
            Here are some of my favorite projects I've worked on
          </Text>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {myProjects.map((project, index) => (
            <Card
              key={index}
              shadow="sm"
              padding="lg"
              radius="md"
              withBorder
              className="h-full flex flex-col"
            >
              <Card.Section>
                <div
                  className="h-40 bg-gray-200"
                  style={{
                    backgroundImage: `url(${project.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                />
              </Card.Section>

              <div className="flex-1 flex flex-col">
                <Group justify="space-between" mt="md" mb="xs">
                  <Text fw={500} size="lg" className="truncate">
                    {project.title}
                  </Text>
                  <Badge color="pink" variant="light">
                    {project.status}
                  </Badge>
                </Group>

                <Text size="sm" c="dimmed" className="flex-1 line-clamp-3">
                  {project.description}
                </Text>

                <div className="mt-auto">
                  <Group gap="xs" mb="md">
                    {project.tech.slice(0, 3).map((tech, techIndex) => (
                      <Badge key={techIndex} size="xs" variant="outline">
                        {tech}
                      </Badge>
                    ))}
                    {project.tech.length > 3 && (
                      <Badge size="xs" variant="outline" c="dimmed">
                        +{project.tech.length - 3}
                      </Badge>
                    )}
                  </Group>

                  <Group gap="xs">
                    <Button
                      component={Link}
                      href={project.githubUrl}
                      variant="light"
                      size="xs"
                      className="flex-1"
                    >
                      GitHub
                    </Button>
                    {project.liveUrl && (
                      <Button
                        component={Link}
                        href={project.liveUrl}
                        size="xs"
                        className="flex-1"
                      >
                        Live Demo
                      </Button>
                    )}
                  </Group>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </AnimationContainer>
  );
};

export default FavProjects;
