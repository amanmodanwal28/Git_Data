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

import { FaReact, FaTools } from "react-icons/fa";
import {
  SiChakraui,
  SiCodesandbox,
  SiCoronarenderer,
  SiDjango,
  SiExpress,
  SiFirebase,
  SiGit,
  SiGithub,
  SiHtml5,
  SiJavascript,
  SiMaterialui,
  SiMongodb,
  SiNetlify,
  SiNodedotjs,
  SiRedux,
  SiReplit,
  SiTypescript,
  SiVisualstudiocode,
} from "react-icons/si";
import { IoLogoCss3, IoLogoNpm } from "react-icons/io";
import { TbBrandNextjs, TbBrandVercel } from "react-icons/tb";
import { MdMilitaryTech } from "react-icons/md";
const Toolset = ({ skillsRef }) => {
  const [isNotSmallerScreen] = useMediaQuery("(min-width:600px)");

  return (
    <Box>
      <Heading
        display={"flex"}
        flexDirection="row"
        gap="10px"
        justifyContent={"center"}
        alignItems="center"
      >
        <Icon as={FaTools}></Icon>
        <Text> Toolsets</Text>
      </Heading>
      <Grid
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
          ml={isNotSmallerScreen ? 4 : 0}
          bg="gray.100"
          h={{ base: "20vh", lg: "25vh" }}
          w={{ base: "20vh", lg: "25vh" }}
          justify="flex-end"
          _hover={{ bg: "green.400" }}
          onClick={() => window.open("https://npmjs.com/")}
        >
          <Icon as={IoLogoNpm} p="4" w="20" h="20" color="black" />
          <Text color="black" p="4" fontWeight="semibold">
            NPM
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
          onClick={() => window.open("https://www.netlify.com/")}
        >
          <Icon as={SiNetlify} p="4" w="20" h="20" color="black" />
          <Text color="black" p="4" fontWeight="semibold">
            Netlify
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
          onClick={() => window.open("https://vercel.com/")}
        >
          <Icon as={TbBrandVercel} p="4" w="20" h="20" color="black" />
          <Text color="black" p="4" fontWeight="semibold">
            Vercel
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
          onClick={() => window.open("https://github.com/")}
        >
          <Icon as={SiGithub} p="4" w="20" h="20" color="black" />
          <Text color="black" p="4" fontWeight="semibold">
            Github
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
          onClick={() => window.open("https://console.firebase.google.com/")}
        >
          <Icon as={SiFirebase} p="4" w="20" h="20" color="black" />
          <Text color="black" p="4" fontWeight="semibold">
            Firebase
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
          onClick={() => window.open("https://code.visualstudio.com/")}
        >
          <Icon as={SiVisualstudiocode} p="4" w="20" h="20" color="black" />
          <Text color="black" p="4" fontWeight="semibold">
            VS code
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
          onClick={() => window.open("https://git-scm.com/")}
        >
          <Icon as={SiGit} p="4" w="20" h="20" color="black" />
          <Text color="black" p="4" fontWeight="semibold">
            Git
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
          onClick={() => window.open("https://replit.com/")}
        >
          <Icon as={SiReplit} p="4" w="20" h="20" color="black" />
          <Text color="black" p="4" fontWeight="semibold">
            Replit
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
          onClick={() => window.open("https://codesandbox.io/")}
        >
          <Icon as={SiCodesandbox} p="4" w="20" h="20" color="black" />
          <Text color="black" p="4" fontWeight="semibold">
            Code Sandbox
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
          onClick={() => window.open("https://codepen.io/")}
        >
          <Icon as={SiCodesandbox} p="4" w="20" h="20" color="black" />
          <Text color="black" p="4" fontWeight="semibold">
            Code Pen
          </Text>
        </Flex> */}
      </Grid>
    </Box>
  );
};

export default Toolset;
