import React, { useContext, useEffect, useRef } from "react";
import {
  Box,
  Flex,
  Grid,
  Heading,
  Icon,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";

import { FaReact } from "react-icons/fa";
import {
  SiChakraui,
  SiExpress,
  SiHtml5,
  SiJavascript,
  SiMaterialui,
  SiMongodb,
  SiNodedotjs,
  SiRedux,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";
import { IoLogoCss3 } from "react-icons/io";
import { TbBrandNextjs } from "react-icons/tb";
import { MdMilitaryTech } from "react-icons/md";
const Skills = ({ skillsRef }) => {
  const [isNotSmallerScreen] = useMediaQuery("(min-width:600px)");

  return (
    <Box ref={skillsRef} name="skills" id="skills">
      <Heading
        display={"flex"}
        flexDirection="row"
        gap="10px"
        justifyContent={"center"}
        alignItems="center"
      >
        <Icon as={MdMilitaryTech}></Icon>
        <Text>Skills</Text>
      </Heading>
      <Grid
        // className="skills-card"
        p={"0 20px 0 20px"}
        templateColumns={{
          base: "repeat(2,1fr)",
          md: "repeat(3,1fr)",
          lg: "repeat(4,1fr)",
        }}
        gap="10px"
        direction={isNotSmallerScreen ? "row" : "column"}
        mt={8}
      >
        <Flex
          className="skills-card"
          rounded="xl"
          direction="column"
          mt={4}
          bg="blue.400"
          h={{ base: "20vh", lg: "25vh" }}
          w={{ base: "20vh", lg: "25vh" }}
          justify="flex-end"
          onClick={() => window.open("https://reactjs.org/")}
        >
          <Icon
            color="white"
            p="4"
            as={FaReact}
            w="20"
            h="20"
            className="skills-card-img"
          />
          <Text
            className="skills-card-name"
            color="white"
            p="4"
            fontWeight="semibold"
          >
            React
          </Text>
        </Flex>
        {/* <Flex
          className="skills-card"
          rounded="xl"
          direction="column"
          mt={4}
          ml={isNotSmallerScreen ? 4 : 0}
          bg="gray.100"
          h={{ base: "20vh", lg: "25vh" }}
          w={{ base: "20vh", lg: "25vh" }}
          justify="flex-end"
          _hover={{ bg: "teal.400" }}
          onClick={() => window.open("https://redux.js.org/")}
        >
          <Icon
            className="skills-card-img"
            color="#764abc"
            p="4"
            as={SiRedux}
            w="20"
            h="20"
          />
          <Text
            className="skills-card-name"
            color="black"
            p="4"
            fontWeight="semibold"
          >
            Redux
          </Text>
        </Flex> */}
        <Flex
          className="skills-card"
          rounded="xl"
          direction="column"
          mt={4}
          ml={isNotSmallerScreen ? 4 : 0}
          bg="gray.100"
          h={{ base: "20vh", lg: "25vh" }}
          w={{ base: "20vh", lg: "25vh" }}
          justify="flex-end"
          _hover={{ bg: "green.400" }}
          onClick={() =>
            window.open(
              "https://developer.mozilla.org/en-US/docs/Web/JavaScript"
            )
          }
        >
          <Icon
            className="skills-card-img"
            as={SiJavascript}
            p="4"
            w="20"
            h="20"
            color="#efd81d"
          />
          <Text
            className="skills-card-name"
            color="black"
            p="4"
            fontWeight="semibold"
          >
            JavaScript
          </Text>
        </Flex>
        {/* <Flex
          className="skills-card"
          rounded="xl"
          direction="column"
          mt={4}
          ml={isNotSmallerScreen ? 4 : 0}
          bg="gray.100"
          h={{ base: "20vh", lg: "25vh" }}
          w={{ base: "20vh", lg: "25vh" }}
          justify="flex-end"
          _hover={{ bg: "green.400" }}
          onClick={() => window.open("https://www.typescriptlang.org/")}
        >
          <Icon
            className="skills-card-img"
            as={SiTypescript}
            p="4"
            w="20"
            h="20"
            color="#3178c6"
          />
          <Text
            className="skills-card-name"
            color="black"
            p="4"
            fontWeight="semibold"
          >
            TypeScript
          </Text>
        </Flex> */}
        <Flex
          className="skills-card"
          rounded="xl"
          direction="column"
          mt={4}
          ml={isNotSmallerScreen ? 4 : 0}
          bg="gray.100"
          h={{ base: "20vh", lg: "25vh" }}
          w={{ base: "20vh", lg: "25vh" }}
          justify="flex-end"
          _hover={{ bg: "green.400" }}
          onClick={() =>
            window.open("https://developer.mozilla.org/en-US/docs/Web/CSS")
          }
        >
          <Icon
            className="skills-card-img"
            as={IoLogoCss3}
            p="4"
            w="20"
            h="20"
            color="#254bdd"
          />
          <Text
            className="skills-card-name"
            color="black"
            p="4"
            fontWeight="semibold"
          >
            CSS3
          </Text>
        </Flex>
        <Flex
          className="skills-card"
          rounded="xl"
          direction="column"
          mt={4}
          ml={isNotSmallerScreen ? 4 : 0}
          bg="gray.100"
          h={{ base: "20vh", lg: "25vh" }}
          w={{ base: "20vh", lg: "25vh" }}
          justify="flex-end"
          _hover={{ bg: "green.400" }}
          onClick={() =>
            window.open("https://developer.mozilla.org/en-US/docs/Web/HTML")
          }
        >
          <Icon
            className="skills-card-img"
            as={SiHtml5}
            p="4"
            w="20"
            h="20"
            color="#dd4b25"
          />
          <Text
            className="skills-card-name"
            color="black"
            p="4"
            fontWeight="semibold"
          >
            HTML
          </Text>
        </Flex>

        <Flex
          className="skills-card"
          rounded="xl"
          direction="column"
          mt={4}
          ml={isNotSmallerScreen ? 4 : 0}
          bg="gray.100"
          h={{ base: "20vh", lg: "25vh" }}
          w={{ base: "20vh", lg: "25vh" }}
          justify="flex-end"
          _hover={{ bg: "green.400" }}
          onClick={() => window.open("https://nodejs.org/")}
        >
          <Icon
            className="skills-card-img"
            as={SiNodedotjs}
            p="4"
            w="20"
            h="20"
            color="#70a861"
          />
          <Text
            className="skills-card-name"
            color="black"
            p="4"
            fontWeight="semibold"
          >
            NodeJs
          </Text>
        </Flex>
        <Flex
          className="skills-card"
          rounded="xl"
          direction="column"
          mt={4}
          ml={isNotSmallerScreen ? 4 : 0}
          bg="gray.100"
          h={{ base: "20vh", lg: "25vh" }}
          w={{ base: "20vh", lg: "25vh" }}
          justify="flex-end"
          _hover={{ bg: "green.400" }}
          onClick={() => window.open("https://www.mongodb.com/")}
        >
          <Icon
            className="skills-card-img"
            as={SiMongodb}
            p="4"
            w="20"
            h="20"
            color="#00ee65"
          />
          <Text
            className="skills-card-name"
            color="black"
            p="4"
            fontWeight="semibold"
          >
            MongoDB
          </Text>
        </Flex>
{/*
        <Flex
          className="skills-card"
          rounded="xl"
          direction="column"
          mt={4}
          ml={isNotSmallerScreen ? 4 : 0}
          bg="gray.100"
          h={{ base: "20vh", lg: "25vh" }}
          w={{ base: "20vh", lg: "25vh" }}
          justify="flex-end"
          _hover={{ bg: "green.400" }}
          onClick={() => window.open("https://mui.com/")}
        >
          <Icon
            className="skills-card-img"
            as={SiMaterialui}
            p="4"
            w="20"
            h="20"
            color="#007bf7"
          />
          <Text
            className="skills-card-name"
            color="black"
            p="4"
            fontWeight="semibold"
          >
            Material UI
          </Text>
        </Flex>
        <Flex
          className="skills-card"
          rounded="xl"
          direction="column"
          mt={4}
          ml={isNotSmallerScreen ? 4 : 0}
          bg="gray.100"
          h={{ base: "20vh", lg: "25vh" }}
          w={{ base: "20vh", lg: "25vh" }}
          justify="flex-end"
          _hover={{ bg: "green.400" }}
          onClick={() => window.open("https://nextjs.org/")}
        >
          <Icon
            className="skills-card-img"
            as={TbBrandNextjs}
            p="4"
            w="20"
            h="20"
            color="black"
          />
          <Text
            className="skills-card-name"
            color="black"
            p="4"
            fontWeight="semibold"
          >
            NextJS
          </Text>
        </Flex>
        <Flex
          className="skills-card"
          rounded="xl"
          direction="column"
          mt={4}
          ml={isNotSmallerScreen ? 4 : 0}
          bg="gray.100"
          h={{ base: "20vh", lg: "25vh" }}
          w={{ base: "20vh", lg: "25vh" }}
          justify="flex-end"
          _hover={{ bg: "green.400" }}
          onClick={() => window.open("https://chakra-ui.com/")}
        >
          <Icon
            className="skills-card-img"
            as={SiChakraui}
            p="4"
            w="20"
            h="20"
            color="
            #46c8c1"
          />
          <Text
            className="skills-card-name"
            color="black"
            p="4"
            fontWeight="semibold"
          >
            Chakra UI
          </Text>
        </Flex> */}

        <Flex
          className="skills-card"
          rounded="xl"
          direction="column"
          mt={4}
          ml={isNotSmallerScreen ? 4 : 0}
          bg="gray.100"
          h={{ base: "20vh", lg: "25vh" }}
          w={{ base: "20vh", lg: "25vh" }}
          justify="flex-end"
          _hover={{ bg: "green.400" }}
          onClick={() => window.open("https://expressjs.com/")}
        >
          <Icon
            className="skills-card-img"
            as={SiExpress}
            p="4"
            w="20"
            h="20"
            color="black"
          />
          <Text
            className="skills-card-name"
            color="black"
            p="4"
            fontWeight="semibold"
          >
            Express
          </Text>
        </Flex>

        <Flex
          className="skills-card"
          rounded="xl"
          direction="column"
          mt={4}
          ml={isNotSmallerScreen ? 4 : 0}
          bg="gray.100"
          h={{ base: "20vh", lg: "25vh" }}
          w={{ base: "20vh", lg: "25vh" }}
          justify="flex-end"
          _hover={{ bg: "green.400" }}
          onClick={() => window.open("https://expressjs.com/")}
        >
          <Icon
            className="skills-card-img"
            as={SiTailwindcss}
            p="4"
            w="20"
            h="20"
            color="
            #38bdf8"
          />
          <Text
            className="skills-card-name"
            color="black"
            p="4"
            fontWeight="semibold"
          >
          Tailwind CSS
          </Text>
        </Flex>
      </Grid>
    </Box>
  );
};

export default Skills;
