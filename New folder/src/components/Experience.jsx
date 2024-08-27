import React from "react";
import { Box, Center, Heading, Text, VStack } from "@chakra-ui/react";

const Experience = ({expRef}) => {
  return (
    <Box ref={expRef} padding={'10px'}>
      <Center>
        {' '}
        <Heading fontWeight={'bold'} fontSize="3xl" mb="6">
          Experience
        </Heading>
      </Center>

      <VStack spacing="4">
        <Center>
          <Box width={{ base: 'full', sm: 'lg', lg: 'xl' }}>
            <Heading fontSize="lg" mb="2">
              Assistant Software Engineer | PPS International
            </Heading>
            <Text color="gray.600" mb="2">
              December 2022 - Present
            </Text>
            <Text>
              Developed and maintained web application using Nextjs ,Nodejs and
              MongoDB , resulting in increased user engagement and improved
              functionality. Collaborated with cross-functional teams to
              identify and resolve technical issues, ensuring seamless
              integration of back-end and front-end systems.
            </Text>
          </Box>
        </Center>

        <Center>
          <Box width={{ base: 'full', sm: 'lg', lg: 'xl' }}>
            <Heading fontSize="lg" mb="2">
              Full Stack Developer |Apna College
            </Heading>
            <Text color="gray.600" mb="2">
              Febuary 2024 - Present
            </Text>
            <Text>
              I've gained valuable experience developing multiple MERN stack
              projects. From creating robust APIs with Express.js and Node.js to
              building dynamic user interfaces with React, these projects have
              enhanced my skills in end-to-end web development. Collaborating
              with cross-functional teams, I've learned to adapt quickly and
              deliver high-quality solutions
            </Text>
          </Box>
        </Center>
      </VStack>
    </Box>
  )
};

export default Experience;
