import React from "react";
import ReactMarkdown from "react-markdown";

export default function BeginnerTips() {
  const markdown = `
  # Header 1
  ## Header 2

  _ italic _

  ** bold **

  <b> bold Html </b>
  `;

  return (
    <div className="BeginnerTips">
      <ReactMarkdown source={markdown} />
    </div>
  );
}
