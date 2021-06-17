import React, { Component, useRef, useEffect } from "react";
import Markdown from "react-markdown";
import {
  Button,
  ButtonBase,
  Typography,
  makeStyles,
  Grid,
  Container,
  Box,
  Paper,
} from "@material-ui/core";

import { article } from "../../data/beginnerGuideMD";

export default function BeginnerTips() {
  const sectionsRef = article.map(() => useRef());

  // useEffect(() => {
  //   console.log(titleRef.current);
  // }, []);

  // function goToSectionOne() {
  //   sectionsRef[0].current.scrollIntoView({ behavior: "smooth" });
  // }

  function goToSection(section) {
    sectionsRef[section].current.scrollIntoView({ behavior: "smooth" });
  }

  const sectionHeadings = [
    "Introduction",
    "What is exercise",
    "FAQ",
    "Reference",
    "Introduction",
    "What is exercise",
    "FAQ",
    "Reference",
    "Introduction",
    "What is exercise",
    "FAQ",
  ];

  const tableOfContents = (
    <div style={{ float: "left" }}>
      {sectionHeadings.map((placeholder, index) => (
        <div>
          <Button onClick={() => goToSection(index)}>
            {sectionHeadings[index]}
          </Button>
        </div>
      ))}
    </div>
  );

  return (
    <Container>
      {tableOfContents}
      <Paper style={{ maxHeight: "80vh", overflow: "auto" }}>
        <Box m={2}>
          <Typography align="left">
            {article.map((sections, index) => (
              <div ref={sectionsRef[index]}>
                <Markdown children={sections} />
              </div>
            ))}
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}
