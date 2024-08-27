import { Button } from "@chakra-ui/button";
import { useColorMode } from "@chakra-ui/color-mode";
import { Image } from "@chakra-ui/image";
import { Stack, Flex, Box, Text } from "@chakra-ui/layout";
import { useMediaQuery } from "@chakra-ui/media-query";
// import faisal from "./Faisal-Mujtaba-Resume.pdf";
import aman from './amanResume.pdf'
import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";

function Header() {
  const { colorMode } = useColorMode();
  const isDark = colorMode === "dark";

  const Ref1 = useRef();
  const Ref2 = useRef();

  const [isNotSmallerScreen] = useMediaQuery("(min-width:600px)");
  function downloadFile() {
    const driveUrl =
      "https://drive.google.com/file/d/1w6skRez72kCV9W7hv4TTjIqgrYb9NASF/view?usp=share_link";
    const fileId = driveUrl.match(/\/d\/(.+?)\/view/)[1];
    const pdfUrl = `https://drive.google.com/uc?id=1w6skRez72kCV9W7hv4TTjIqgrYb9NASF&export=download`;
  }

  // const resumedown2 = () => {
  //     window.open(
  //       "https://drive.google.com/file/d/1w6skRez72kCV9W7hv4TTjIqgrYb9NASF/view?usp=share_link",
  //       "_blank"
  //     );
  // };
  const Back = () => {
    return (
      <div className="back" ref={Ref2}>
        <p>
          Some sample text to demonstrate how these cards will work, including
          how they truncate long sentences. This section displays the
          full-length blog post.
        </p>
        <p>
          Bloggity bloggity bloggity blog. This would be the full text of the
          abbreviated blog post.
        </p>
      </div>
    );
  };

  const [flipped, setFlipped] = useState(false);

  const flip = () => {
    setFlipped(!flipped);
    if (flipped) {
      if (Ref1.current) {
        Ref1.current.style.display = "none";
        Ref2.current.style.display = "block";
      }
    } else {
      if (Ref1.current) {
        Ref1.current.style.display = "block";
        Ref2.current.style.display = "none";
      }
    }
  };

  return (
    <Stack>
      <Flex
        id="about"
        className="about section"
        direction={{ base: "column-reverse", md: "row", lg: "row" }}
        spacing="200px"
        p={isNotSmallerScreen ? "32" : "0"}
        alignSelf="flex-start"
        ml="20px"
      >
        <Box mt={isNotSmallerScreen ? "0" : 16} align="flex-start">
          <Text fontSize="5xl" fontWeight="semibold" fontFamily={"san-serif"}>
            Hi, I am
          </Text>
          <Text
            fontSize="7xl"
            fontWeight="bold"
            bgGradient="linear(to-r, cyan.400, blue.500, purple.600)"
            bgClip="text"
            id="user-detail-name"
          >
            Aman Modanwal
          </Text>
          <Text
            fontFamily={"san-serif"}
            fontSize={"xl"}
            width={"90%"}
            id="user-detail-intro"
            color={isDark ? "gray.200" : "gray.500"}
            flexWrap={"wrap"}
          >
            I've gained valuable experience developing multiple MERN stack
            projects. From creating robust APIs with Express.js and Node.js to
            building dynamic user interfaces with React, these projects have
            enhanced my skills in end-to-end web development. Collaborating with
            cross-functional teams, I've learned to adapt quickly and deliver
            high-quality solutions
          </Text>

          <Button
            bgGradient="linear(to-r, cyan.400, blue.500, purple.600)"
            onClick={() => {
              window.open(
                "https://drive.google.com/file/d/1w6skRez72kCV9W7hv4TTjIqgrYb9NASF/view?usp=share_link"
              );
              downloadFile();
            }}
            mt="5px"
            rounded={"md"}
            id="resume-button-2"
          >
            <a
              id="resume-link-2"
              href={aman}
              download={"Aman-Modanwal-Resume"}
            >
              {" "}
              Resume{" "}
            </a>
          </Button>
        </Box>
        <div className="page-container">
          <div

            className={`card-container ${flipped ? "flipped" : ""}`}
          >
            <div className="front" ref={Ref1}>
              <Box className="image-container">
                <Image
                  className="home-img"
                  alignSelf="center"
                  mt={isNotSmallerScreen ? "0" : "12"}
                  mb={isNotSmallerScreen ? "0" : "12"}
                  borderRadius="full"
                  backgroundColor="transparent"
                  boxShadow="lg"
                  src="https://avatars.githubusercontent.com/u/112753840?s=400&u=279b795cbfd8305f87741a6e538962f9193b5f12&v=4"
                />
              </Box>
            </div>
            <Back />
          </div>
        </div>
      </Flex>
    </Stack>
  );
}

export default Header;
