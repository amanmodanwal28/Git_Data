import { Box, Center, Heading, VStack } from "@chakra-ui/react";
import React from "react";
import GitHubCalendar from "react-github-calendar";

function GithubCal() {
  const colourTheme = {
    background: "transparent",
    text: "",
    grade4: "#19c9ea",
    grade3: "#19c9ea",
    grade2: "#19c9ea",
    grade1: "#19c9ea",
    grade0: "#19c9ea",
  };
  return (
    <Box  width={"90%"} margin={"auto"}>
      <Center>
        <Heading>GitHub Calendar</Heading>
      </Center>
      <VStack style={{ justifyContent: "center", paddingBottom: "10px" }}>
        <h1 className="project-heading" style={{ paddingBottom: "20px" }}>
          Days I <strong className="green">Code</strong>
        </h1>
        <GitHubCalendar
          class="react-activity-calendar"
          username="faisalinfinity"
          blockSize={15}
          blockMargin={5}
          fontSize={16}
        />
      </VStack>
    </Box>
  );
}

export default GithubCal;
