import "../styles/navbtn.css";
import { FaSun, FaMoon } from "react-icons/fa";
import { ImEarth } from "react-icons/im";
import { GrDocumentPdf } from "react-icons/gr";
import { FcAbout } from "react-icons/fc";
import { MdMilitaryTech, MdContacts } from "react-icons/md";
import { AiOutlineFundProjectionScreen } from "react-icons/ai";

import {
  Box,
  Flex,
  HStack,
  IconButton,
  Button,
  useDisclosure,
  useColorModeValue,
  Stack,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { useColorMode } from "@chakra-ui/react";
import { useContext, useEffect } from "react";
import { ScrollContext } from "../Context/ScrollContext";
// import faisal from "./Faisal-Mujtaba-Resume.pdf";
import aman from './amanResume.pdf'
export default function Navbar({ sections }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();
  const isDark = colorMode === "dark";
  const { scrollref, setscroll } = useContext(ScrollContext);

  const handleClick = (ref) => {
    setscroll(ref);
    ref.current.scrollIntoView({ behavior: "smooth" });
    onClose()
  };


  useEffect(() => {
    scrollref?.current.scrollIntoView({ behavior: "smooth" });
  }, [scrollref]);

  return (
    <>
      <Box
        id="nav-menu"
        w={"100%"}
        position="fixed"
        zIndex={"4"}
        bgGradient={useColorModeValue(
          "linear(to-r, cyan.400, teal.100, purple.600)",
          "linear(to-r, cyan.400, blue.500, purple.600)"
        )}
         px={2}
      >
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            bg={"none"}
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack id="navbtn" spacing={8} alignItems={"center"}>
            <Button
              onClick={() => handleClick(sections.aboutRef)}
              bg="none"
              leftIcon={<ImEarth />}
              fontWeight={"bold"}
             fontFamily={"san-serif"}
              className="nav-link home"
            >
              {" "}
              Home
            </Button>
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              <Button
                leftIcon={<FcAbout />}
                bg={"none"}
                onClick={() => handleClick(sections.aboutRef)}
                px={2}
                py={1}
                rounded={"md"}
                _hover={{
                  textDecoration: "none",
                  bg: useColorModeValue("gray.200", "gray.700"),
                  color: "white",
                }}
                className="nav-link about"
                fontWeight={"bold"}
                fontFamily={"san-serif"}
              >
                About Me
              </Button>
              <Button
                leftIcon={<MdMilitaryTech />}
                bg={"none"}
                onClick={() => handleClick(sections.expRef)}
                px={2}
                py={1}
                rounded={"md"}
                _hover={{
                  textDecoration: "none",
                  bg: useColorModeValue("gray.200", "gray.700"),
                  color: "white",
                }}
                className="nav-link skills"
                fontWeight={"bold"}
                fontFamily={"san-serif"}
              >
               Experience
              </Button>
              <Button
                leftIcon={<MdMilitaryTech />}
                bg={"none"}
                onClick={() => handleClick(sections.skillsRef)}
                px={2}
                py={1}
                rounded={"md"}
                _hover={{
                  textDecoration: "none",
                  bg: useColorModeValue("gray.200", "gray.700"),
                  color: "white",
                }}
                className="nav-link skills"
                fontWeight={"bold"}
                fontFamily={"san-serif"}
              >
                Skills
              </Button>
              <Button
                leftIcon={<AiOutlineFundProjectionScreen />}
                bg={"none"}
                onClick={() => handleClick(sections.projectRef)}
                px={2}
                py={1}
                rounded={"md"}
                _hover={{
                  textDecoration: "none",
                  bg: useColorModeValue("gray.200", "gray.700"),
                  color: "white",
                }}
                className="nav-link projects"
                fontWeight={"bold"}
                fontFamily={"san-serif"}
              >
                Projects
              </Button>
              <Button
                leftIcon={<MdContacts />}
                bg={"none"}
                onClick={() => handleClick(sections.contactRef)}
                px={2}
                py={1}
                rounded={"md"}
                _hover={{
                  textDecoration: "none",
                  bg: useColorModeValue("gray.200", "gray.700"),
                  color: "white",
                }}
                className="nav-link contact"
                fontWeight={"bold"}
                fontFamily={"san-serif"}
              >
                Contact
              </Button>
              <Button
                leftIcon={<GrDocumentPdf />}
                onClick={() => {
                  window.open(
                    'https://drive.google.com/file/d/1w6skRez72kCV9W7hv4TTjIqgrYb9NASF/view?usp=share_link'
                  )
                  // downloadFile();
                }}
                bg="none"
                px={2}
                py={1}
                rounded={"md"}
                _hover={{
                  textDecoration: "none",
                  bg: useColorModeValue("gray.200", "gray.700"),
                  color: "white",
                }}
                className="nav-link resume"
                id="resume-button-1"
                fontWeight={"bold"}
                fontFamily={"san-serif"}
              >
                <a id="resume-link-1" href={aman} download={"Aman-Modanwal-Resume"}>   Resume </a>

              </Button>
            </HStack>
          </HStack>
          <Flex alignItems={"center"}>
            <IconButton
              bg={"none"}
              ml={8}
              icon={isDark ? <FaSun /> : <FaMoon />}
              isRound="true"
              onClick={toggleColorMode}
            ></IconButton>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              <Button
                leftIcon={<FcAbout />}
                bg={"none"}
                onClick={() => handleClick(sections.aboutRef)}
                px={2}
                py={1}
                rounded={"md"}
                _hover={{
                  textDecoration: "none",
                  bg: "gray.200",
                  color: "black",
                }}
                href={"#"}
              >
                About Me
              </Button>
              <Button
                leftIcon={<MdMilitaryTech />}
                bg={"none"}
                onClick={() => handleClick(sections.expRef)}
                px={2}
                py={1}
                rounded={"md"}
                _hover={{
                  textDecoration: "none",
                  bg: "gray.200",
                  color: "black",
                }}
                href={"#"}
              >
              Experience
              </Button>
              <Button
                leftIcon={<MdMilitaryTech />}
                bg={"none"}
                onClick={() => handleClick(sections.skillsRef)}
                px={2}
                py={1}
                rounded={"md"}
                _hover={{
                  textDecoration: "none",
                  bg: "gray.200",
                  color: "black",
                }}
                href={"#"}
              >
                Skills
              </Button>
              <Button
                leftIcon={<AiOutlineFundProjectionScreen />}
                bg={"none"}
                onClick={() => handleClick(sections.projectRef)}
                px={2}
                py={1}
                rounded={"md"}
                _hover={{
                  textDecoration: "none",
                  bg: "gray.200",
                  color: "black",
                }}
                href={"#"}
              >
                Projects
              </Button>
              <Button
                leftIcon={<MdContacts />}
                onClick={() => handleClick(sections.contactRef)}
                bg={"none"}
                px={2}
                py={1}
                rounded={"md"}
                _hover={{
                  textDecoration: "none",
                  bg: "gray.200",
                  color: "black",
                }}
                href={"#"}
              >
                Contact
              </Button>
              <Button
                leftIcon={<GrDocumentPdf />}
                onClick={() =>
                  (window.location.href =
                    "https://drive.google.com/uc?id=1w6skRez72kCV9W7hv4TTjIqgrYb9NASF&export=download")
                }
                bg={"none"}
                px={2}
                py={1}
                rounded={"md"}
                _hover={{
                  color: "black",
                  textDecoration: "none",
                  bg: "gray.200",
                }}
              >
                Resume
              </Button>
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}
