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

  // useEffect(() => {
  //   console.log(test.current);
  // }, []);

  function goToSectionOne() {
    sectionsRef[0].current.scrollIntoView({ behavior: "smooth" });
  }

  function goToSectionTwo() {
    sectionsRef[1].current.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <Container>
      <div style={{ float: "left" }}>
        <div>
          <Button onClick={goToSectionOne}>Introduction</Button>
        </div>
        <div>
          <Button onClick={goToSectionTwo}>What is exercise?</Button>
        </div>
        <div>
          <Button>FAQs</Button>
        </div>
        <div>
          <Button>Reference</Button>
        </div>
      </div>
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
