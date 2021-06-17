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

import { article, sectionHeadings } from "../../data/beginnerGuideMD";

export default function BeginnerGuide() {
  const sectionsRef = article.map(() => useRef());

  function goToSection(section) {
    sectionsRef[section].current.scrollIntoView({ behavior: "smooth" });
  }

  const tableOfContents = (
    <div style={{ float: "left" }}>
      <br />
      <br />
      <br />
      {sectionHeadings.map((placeholder, index) => (
        <div>
          <Button
            style={{ justifyContent: "flex-start" }}
            fullWidth={true}
            onClick={() => goToSection(index)}
          >
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
