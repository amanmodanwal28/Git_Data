import { Box, Center, Heading, Icon, Text } from "@chakra-ui/react";
import React from "react";
import { SiGithub } from "react-icons/si";
import Styles from "../styles/stats.module.css";
import GitHubCalendar from "github-calendar"
import { bs } from "./Projects";

// https://github-readme-streak-stats.herokuapp.com?user=
// https://streak-stats.demolab.com?user=faisalinfinity&_border=true&theme=dark&hide_border=true&theme=react

// https://github-readme-stats.vercel.app/api/top-langs/?username=
// https://github-readme-stats-sigma-five.vercel.app/api?username=faisalinfinity&theme=react&border_radius=4.6&hide_border=true&layout=compact&show_icons=true"
// https://github-readme-stats-sigma-five.vercel.app/api?username=faisalinfinity&theme=react&border_radius=4.6&hide_border=true&layout=compact&show_icons=true"
// https://github-readme-stats.vercel.app/api?username=
//https://github-readme-stats.vercel.app/api?username=faisalinfinity&theme=react&border_radius=4.6&hide_border=true&layout=compact&show_icons=true
//https://github-readme-stats.vercel.app/api/top-langs/?username=faisalinfinity&theme=react&border_radius=4.6&show_icons=true&count_private=true&hide_border=true&show_icons=true
const Githubstat = () => {


  return (
    <Box width="90%" margin="auto">
      <br />
      <Center>
        {' '}
        <Heading>
          <Icon as={SiGithub}></Icon> Github Stats
        </Heading>
      </Center>
      <div className={Styles.stats}>
        <div style={{ columnSpan: '2' }}>
          <img
            style={{ display: 'block', margin: 'auto' }}
            id="github-streak-stats"
            alt="streak"
            src="https://github-readme-streak-stats.herokuapp.com?user=amanmodanwal28&_border=true&theme=dark&hide_border=true&theme=react"
            // style={{ width: "50%" }}
          />
        </div>

        <div align="center" className={Styles.stats2}>
          <img
            id="github-stats-card"
            style={{ display: 'block', margin: 'auto' }}
            alt="streak"
            src="https://github-readme-stats-sigma-five.vercel.app/api?username=amanmodanwal28&theme=react&border_radius=4.6&hide_border=true&layout=compact&show_icons=true"
            // style={{ width: "50%" }}
          />

          <img
            id="github-top-langs"
            style={{ display: 'block', margin: 'auto' }}
            alt="streak"
            src="https://github-readme-stats-sigma-five.vercel.app/api/top-langs/?username=amanmodanwal28&theme=react&border_radius=4.6&show_icons=true&count_private=true&hide_border=true&show_icons=true"
            // style={{ width: "50%" }}
          />
        </div>
        <div>
          <Center>
            <Text>⚡Activity Graph:</Text>
          </Center>

          <img
            style={{ display: 'block', margin: 'auto', width: '80%' }}
            alt="Faisal Activity Graph"
            src="https://github-readme-activity-graph.vercel.app/graph?username=amanmodanwal28&bg_color=000000&color=1dc2d7&line=42fffc&point=faffff&area=true&hide_border=true"
          />
        </div>
      </div>
    </Box>
  )
};

export default Githubstat;
