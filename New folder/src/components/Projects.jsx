import {
  Box,
  Button,
  chakra,
  Flex,
  Heading,
  HStack,
  Icon,
  Image,
  SimpleGrid,
  useColorModeValue,
  Text,
} from "@chakra-ui/react";
import { useContext, useEffect } from "react";
import { DiBootstrap, DiCss3, DiJavascript } from "react-icons/di";
import { FaHtml5 } from "react-icons/fa";
import { AiOutlineFundProjectionScreen } from "react-icons/ai";
import {
  SiChakraui,
  SiExpress,
  SiFirebase,
  SiGithub,
  SiJavascript,
  SiJson,
  SiMaterialui,
  SiMongodb,
  SiNetlify,
  SiNodedotjs,
  SiReact,
  SiRedux,
  SiSocketdotio,
  SiTypescript,
} from "react-icons/si";
import { ScrollContext } from "../Context/ScrollContext";
import "../styles/project.css";
export const bs =
  "0px 8px 16px -8px rgba(50, 50, 93, 0.25), 0px 16px 32px -16px rgba(0, 0, 0, 0.3), 0px -2px 6px 0px rgba(10, 37, 64, 0.35) inset, 0px -2px 8px 0px rgba(255, 255, 255, 0.5) inset";
const testimonials = [
  {
    role: "Healthistic- a great place for people serious about health and fitness. We're a young start-up of around 400 people that work for your needs in fitness and well-being",
    content: "Healthistic (HealthKart.in Clone) Full Stack App",
    l1: "Mongodb",
    l2: "Express",
    l3: "React",
    l4: "NodeJS",
    l5: "Chakra",
    l6: "Bcrypt",
    Icon1: SiMongodb,
    Icon3: SiNodedotjs,
    Icon4: SiReact,
    Icon2: SiExpress,
    Icon5: SiChakraui,
    url: "https://res.cloudinary.com/dq674z2lp/image/upload/v1680457610/18-admin-add-pc_uwpsgz.png",
    github: "https://github.com/faisalinfinity/cuddly-smoke-9747",
    netlify: "https://frontend-snowy-eta.vercel.app/",
    light:
      "https://res.cloudinary.com/dq674z2lp/image/upload/v1680457612/mobile_xgjbgy.png",
  },
  {
    role: "Captain America - A Multiplayer Game with Realtime Global chat and scores built within 48hrs.",
    content: "Captain America - Game  (Full Stack App)",
    l1: "Mongodb",
    l2: "Typescript",
    l3: "React",
    l4: "NodeJS",
    l5: "Socket.io",
    l6: "Bcrypt",
    Icon1: SiMongodb,
    Icon3: SiNodedotjs,
    Icon4: SiReact,
    Icon2: SiTypescript,
    Icon5: SiSocketdotio,
    url: "https://res.cloudinary.com/dq674z2lp/image/upload/v1681144295/mobile_3_ty3cgl.png",
    github: "https://github.com/faisalinfinity/Captain-America-The-Game",
    netlify: "https://captainamerica.vercel.app",
    light:
      "https://res.cloudinary.com/dq674z2lp/image/upload/v1681144285/mobile_5_usvxm5.png",
  },
  {
    role: "Productify is an Ecommerce Website which serves as a platform by offering buyers and sellers a wide range of choice to buy and sell goods through listing format, item condition and delivery format.",
    content: "Productify (Ebay.com Clone)",
    l1: "Redux",
    l2: "Firebase",
    l3: "React",
    l4: "JavaScript",
    l5: "Chakra",
    l6: "Bcrypt",
    Icon1: SiRedux,
    Icon3: SiJavascript,
    Icon4: SiReact,
    Icon2: SiFirebase,
    Icon5: SiChakraui,
    url: "https://res.cloudinary.com/dq674z2lp/image/upload/v1680538738/mobile_2_j3yfx3.png",
    github: "https://github.com/faisalinfinity/hilarious-sort-6480",
    netlify: "https://productify.vercel.app/",
    light:
      "https://res.cloudinary.com/dq674z2lp/image/upload/v1680538611/mobile_1_gi9c0h.png",
  },
  {
    role: "This is an order matching system web application that allows users to place orders, view pending orders, and see completed orders with matched prices with dynamic chart built within 2-Days",
    content: "Order Matching System like Stock Market (Full Stack App)",
    l1: "Mongodb",
    l2: "Express",
    l3: "React",
    l4: "NodeJS",
    l5: "Chakra",
    l6: "Bcrypt",
    Icon1: SiMongodb,
    Icon3: SiNodedotjs,
    Icon4: SiReact,
    Icon2: SiExpress,
    Icon5: SiChakraui,
    url: "https://res.cloudinary.com/dq674z2lp/image/upload/v1682970518/mobile_10_xkgsec.png",
    github: "https://github.com/faisalinfinity/order-matching-system",
    netlify: "https://order-matching-system-omega.vercel.app",
    light:
      "https://res.cloudinary.com/dq674z2lp/image/upload/v1682970518/desktop-1_valny0.png",
  },
  {
    l1: "React",
    l2: "Javacript",
    l3: "Redux",
    l4: "Firebase",
    l5: "MUI",
    l6: "React",
    name: "Daniel T.",
    role: "Musafir is a website for tours and travel created with one thought that is to empower Indian traveler with instant bookings and comprehensive choices.",
    Icon1: SiReact,
    Icon3: SiFirebase,
    Icon4: SiRedux,
    Icon2: DiJavascript,
    Icon5: SiMaterialui,
    content: "Musafir (Make my trip Clone)",
    url: "https://i.postimg.cc/7hWcV4sV/musafir-dark.png",
    github: "https://github.com/hr927/Musafir-mmt-clone-",
    netlify: "https://musafir-mmt.netlify.app",
    light: "https://i.postimg.cc/x13d6FQm/musafir-light.png",
  },
  {
    role: "Mediagenix helps you build an audience organically. We’re a values-driven company that provides affordable, intuitive, marketing tools for ambitious people and teams",
    content: "Mediagenix (Buffer.com Clone)",
    l1: "React",
    l2: "Javacript",
    l3: "CSS",
    l4: "HTML",
    l5: "Chakra",
    l6: "Bootstrap",
    Icon1: SiReact,
    Icon3: FaHtml5,
    Icon4: DiCss3,
    Icon2: DiJavascript,
    Icon5: SiChakraui,
    url: "https://i.postimg.cc/pd8M0mz6/mediagenix-dark.png",
    github:
      "https://github.com/faisalinfinity/limitless-temper-4281/tree/main/mediagenix",
    netlify: "https://mediagenix.netlify.app/",
    light: "https://i.postimg.cc/7Y36R43V/mediagenix-light.png",
  },
  {
    role: "Hiring Heroes is a global online marketplace for freelance services. Fiverr’s platform connects freelancers to people or businesses looking to hire.",
    l1: "Bootstrap",
    l2: "Javacript",
    l3: "CSS",
    l4: "HTML",
    l5: "JSON",
    l6: "Bootstrap",
    Icon1: DiBootstrap,
    Icon3: FaHtml5,
    Icon4: DiCss3,
    Icon2: DiJavascript,
    Icon5: SiJson,
    content: " Hiring Heroes (Fiverr.com Clone)",
    url: "https://i.postimg.cc/4x0X2CMm/hh-dark.png",
    github: "https://github.com/Tushit99/tedious-advertisement-2369",
    netlify: "https://helpful-cheesecake-78e935.netlify.app/",
    light: "https://i.postimg.cc/HssHps1r/hh-light.png",
  },
  {
    role: "TimeCamp is a simple, yet feature-rich time tracking app to help you gain insights into yourprojects and tasks.",
    l1: "Bootstrap",
    l2: "Javacript",
    l3: "CSS",
    l4: "HTML",
    l5: "JSON",
    l6: "Bootstrap",
    Icon1: DiBootstrap,
    Icon3: FaHtml5,
    Icon4: DiCss3,
    Icon2: DiJavascript,
    Icon5: SiJson,
    content: "TimeCamp.com (Clone)",
    url: "https://i.postimg.cc/vmmG3Y3R/tc-light.png",
    github: "https://github.com/faisalinfinity/utmost-creature-1022",
    netlify: "https://incomparable-sable-d0bb36.netlify.app/",
    light: "https://i.postimg.cc/DfQyvMWM/tc-dark.png",
  },
];

export const backgrounds = [
  `url("data:image/svg+xml, %3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'560\' height=\'185\' viewBox=\'0 0 560 185\' fill=\'none\'%3E%3Cellipse cx=\'102.633\' cy=\'61.0737\' rx=\'102.633\' ry=\'61.0737\' fill=\'%23ED64A6\' /%3E%3Cellipse cx=\'399.573\' cy=\'123.926\' rx=\'102.633\' ry=\'61.0737\' fill=\'%23F56565\' /%3E%3Cellipse cx=\'366.192\' cy=\'73.2292\' rx=\'193.808\' ry=\'73.2292\' fill=\'%2338B2AC\' /%3E%3Cellipse cx=\'222.705\' cy=\'110.585\' rx=\'193.808\' ry=\'73.2292\' fill=\'%23ED8936\' /%3E%3C/svg%3E")`,
  `url("data:image/svg+xml, %3Csvg xmlns='http://www.w3.org/2000/svg' width='560' height='185' viewBox='0 0 560 185' fill='none'%3E%3Cellipse cx='457.367' cy='123.926' rx='102.633' ry='61.0737' transform='rotate(-180 457.367 123.926)' fill='%23ED8936'/%3E%3Cellipse cx='160.427' cy='61.0737' rx='102.633' ry='61.0737' transform='rotate(-180 160.427 61.0737)' fill='%2348BB78'/%3E%3Cellipse cx='193.808' cy='111.771' rx='193.808' ry='73.2292' transform='rotate(-180 193.808 111.771)' fill='%230BC5EA'/%3E%3Cellipse cx='337.295' cy='74.415' rx='193.808' ry='73.2292' transform='rotate(-180 337.295 74.415)' fill='%23ED64A6'/%3E%3C/svg%3E")`,
  `url("data:image/svg+xml, %3Csvg xmlns='http://www.w3.org/2000/svg' width='560' height='185' viewBox='0 0 560 185' fill='none'%3E%3Cellipse cx='102.633' cy='61.0737' rx='102.633' ry='61.0737' fill='%23ED8936'/%3E%3Cellipse cx='399.573' cy='123.926' rx='102.633' ry='61.0737' fill='%2348BB78'/%3E%3Cellipse cx='366.192' cy='73.2292' rx='193.808' ry='73.2292' fill='%230BC5EA'/%3E%3Cellipse cx='222.705' cy='110.585' rx='193.808' ry='73.2292' fill='%23ED64A6'/%3E%3C/svg%3E")`,
  `url("data:image/svg+xml, %3Csvg xmlns='http://www.w3.org/2000/svg' width='560' height='185' viewBox='0 0 560 185' fill='none'%3E%3Cellipse cx='457.367' cy='123.926' rx='102.633' ry='61.0737' transform='rotate(-180 457.367 123.926)' fill='%23ECC94B'/%3E%3Cellipse cx='160.427' cy='61.0737' rx='102.633' ry='61.0737' transform='rotate(-180 160.427 61.0737)' fill='%239F7AEA'/%3E%3Cellipse cx='193.808' cy='111.771' rx='193.808' ry='73.2292' transform='rotate(-180 193.808 111.771)' fill='%234299E1'/%3E%3Cellipse cx='337.295' cy='74.415' rx='193.808' ry='73.2292' transform='rotate(-180 337.295 74.415)' fill='%2348BB78'/%3E%3C/svg%3E")`,
];

function ProjectCard(props) {
  const {
    role,
    content,
    index,
    Icon2,
    Icon3,
    Icon4,
    Icon5,
    Icon1,
    url,
    l1,
    l2,
    l3,
    l4,
    l5,
    netlify,
    github,
    light,
  } = props;
  return (
    <Flex
      className="project-card"
      boxShadow={bs}
      maxW={"640px"}
      direction={{ base: "column-reverse", md: "row" }}
      width={"full"}
      rounded={"xl"}
      p={10}
      justifyContent={"space-between"}
      alignItems={{ base: "center" }}
      gap={{ base: "10px" }}
      position={"relative"}
      bg={useColorModeValue("#fff", "black")}
      border={useColorModeValue("", "2px solid teal")}
      _after={{
        content: '""',
        position: "absolute",
        height: "21px",
        width: "29px",
        left: "35px",
        top: "-10px",
        backgroundSize: "cover",
      }}
      _before={{
        content: '""',
        position: "absolute",
        zIndex: "-1",
        height: "full",
        maxW: "640px",
        width: "full",
        filter: "blur(40px)",
        transform: "scale(0.98)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        top: 0,
        left: 0,
        backgroundImage: useColorModeValue(backgrounds[index % 4], ""),
      }}
      borderRadius={"25px"}
    >
      <Flex
        direction={"column"}
        textAlign={"left"}
        justifyContent={"space-between"}
      >
        <Heading className="project-title" fontSize={"20px"}>
          {content}
        </Heading>
        <br />
        <chakra.p
          fontFamily={"san-serif"}
          fontWeight={"medium"}
          fontSize={"15px"}
          pb={4}
          className="project-description"
        >
          {role}
        </chakra.p>
        <chakra.p fontFamily={"Work Sans"} fontWeight={"bold"} fontSize={14}>
          <HStack>
            <Button
              className="project-github-link"
              bg={"black"}
              color={useColorModeValue("white", "white")}
              leftIcon={<SiGithub />}
              bgGradient={useColorModeValue(
                "none",
                "linear(to-r, cyan.400, blue.500, purple.600)"
              )}
              onClick={() => window.open(github)}
            >
              Github{" "}
            </Button>
            <Button
              leftIcon={<SiNetlify />}
              className="project-deployed-link"
              bgGradient={useColorModeValue(
                "linear(to-br, blue.600, teal.300, blue.200)",
                "linear(to-r, cyan.400, blue.500, purple.600)"
              )}
              onClick={() => window.open(netlify)}
            >
              Live Demo{" "}
            </Button>
          </HStack>

          <chakra.span
            fontFamily={"san-serif"}
            fontWeight={"medium"}
            color={"gray.500"}
          >
            {" "}
          </chakra.span>
        </chakra.p>
        <br />
        <Text fontWeight={"bold"}>Tech Stack</Text>
        <br />
        <HStack className="project-tech-stack">
          <Text>
            {" "}
            <Icon
              bgGradient={useColorModeValue(
                "none",
                ""
              )}
              as={Icon2}
              fontSize={"30px"}
            ></Icon>
            {l2}
          </Text>
          <Text>
            <Icon
              bgGradient={useColorModeValue(
                "none",
                ""
              )}
              as={Icon3}
              fontSize={"30px"}
            ></Icon>{" "}
            {l4}
          </Text>
          <Text>
            {" "}
            <Icon
              bgGradient={useColorModeValue(
                "none",
                ""
              )}
              as={Icon1}
              fontSize={"30px"}
            ></Icon>
            {l1}
          </Text>
          <Text>
            {" "}
            <Icon
              bgGradient={useColorModeValue(
                "none",
                ""
              )}
              as={Icon4}
              fontSize={"30px"}
            ></Icon>
            {l3}
          </Text>
          <Text>
            {" "}
            <Icon
              bgGradient={useColorModeValue(
                "none",
                ""
              )}
              as={Icon5}
              fontSize={"30px"}
            ></Icon>
            {l5}
          </Text>
        </HStack>
      </Flex>
      <Image
        w={"50%"}
        maxH={"46%"}
        h="50%"
        src={useColorModeValue(light, url)}
        alt="d"
      ></Image>
    </Flex>
  );
}

export default function Projects({ projectRef, device }) {
  const { scrollref } = useContext(ScrollContext);

  useEffect(() => {
    scrollref?.current.scrollIntoView({ behavior: "smooth" });
  }, [scrollref]);

  return (
    <Flex
      m="auto"
      // mr={device==="Android"?"30px":""}
      ref={projectRef}
      padding={"20px"}
      textAlign={"center"}
      pt={10}
      justifyContent={"center"}
      direction={"column"}
      width={"full"}
      id="projects"
    >
      <Box width={{ base: "full", sm: "lg", lg: "xl" }} margin={"auto"}>
        <chakra.h3
          fontFamily={"san-serif"}
          fontWeight={"bold"}
          fontSize={20}
          textTransform={"uppercase"}
          color={"purple.400"}
        ></chakra.h3>
        <chakra.h1
          name="project"
          display={"flex"}
          flexDirection="row"
          gap="10px"
          justifyContent={"center"}
          alignItems="center"
          py={5}
          fontSize={48}
          fontFamily={"san-serif"}
          fontWeight={"bold"}
          color={useColorModeValue("gray.700", "gray.50")}
        >
          <Icon display={"block"} as={AiOutlineFundProjectionScreen} />
          <Text display={"block"}>Projects</Text>
        </chakra.h1>
        <chakra.h2
          margin={"auto"}
          width={"70%"}
          fontFamily={"san-serif"}
          fontWeight={"medium"}
          color={useColorModeValue("gray.500", "gray.400")}
        >
          <chakra.strong
            color={useColorModeValue("gray.700", "gray.50")}
          ></chakra.strong>{" "}
        </chakra.h2>
      </Box>
      <SimpleGrid
        columns={{ base: 1, xl: 2 }}
        spacing={"20"}
        mt={16}
        mx={"auto"}
      >
        {testimonials.map((cardInfo, index) => (
          <ProjectCard key={index} {...cardInfo} index={index} />
        ))}
      </SimpleGrid>
      <Box>
        <Icon viewBox="0 0 40 35" mt={14} boxSize={10} color={"purple.400"}>
          <path
            fill={"currentColor"}
            d="M10.7964 5.04553e-07C8.66112 -0.000123335 6.57374 0.632971 4.79827 1.81922C3.0228 3.00547 1.63898 4.69158 0.82182 6.66433C0.00466116 8.63708 -0.209132 10.8079 0.207477 12.9021C0.624087 14.9964 1.65239 16.9201 3.16233 18.4299L19.1153 34.3828C19.2395 34.5074 19.3871 34.6062 19.5496 34.6736C19.7121 34.741 19.8863 34.7757 20.0622 34.7757C20.2381 34.7757 20.4123 34.741 20.5748 34.6736C20.7373 34.6062 20.8848 34.5074 21.0091 34.3828L36.962 18.4272C38.9319 16.3917 40.0228 13.6636 39.9996 10.8311C39.9764 7.99858 38.8409 5.28867 36.838 3.28573C34.835 1.28279 32.1251 0.147283 29.2926 0.124081C26.4601 0.100879 23.732 1.19184 21.6965 3.1617L20.0622 4.79337L18.4305 3.1617C17.4276 2.15892 16.237 1.36356 14.9267 0.821064C13.6163 0.278568 12.2119 -0.000433066 10.7937 5.04553e-07H10.7964Z"
          />
        </Icon>
      </Box>
    </Flex>
  );
}
