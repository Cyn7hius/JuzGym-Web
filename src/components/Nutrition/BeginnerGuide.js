import React, { useRef } from "react";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import { Button, Typography, Container, Box, Paper } from "@material-ui/core";
import { article, sectionHeadings } from "../../data/beginnerGuideMD";

import "../../styles.css";

export default function BeginnerGuide() {
  // Used a useRef hook to get a reference for each section
  const sectionsRef = article.map(() => useRef());

  // simple function to use the ref from above and scroll to it
  function goToSection(section) {
    sectionsRef[section].current.scrollIntoView({ behavior: "smooth" });
  }

  // Component to be placed at the side of the article to allow skipping to each header
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

  // Main layout of the page
  return (
    <Container>
      {tableOfContents}
      <Paper style={{ maxHeight: "80vh", overflow: "auto" }}>
        <Box m={2}>
          <Typography align="left">
            {/* Map each section to a Markdown Component to be displayed, ties in together with the refs to allow scroll to certain sections */}
            {article.map((sections, index) => (
              <div ref={sectionsRef[index]}>
                <ReactMarkdown
                  remarkPlugins={[gfm]}
                  escapeHtml={false}
                  children={sections}
                />
              </div>
            ))}
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}
