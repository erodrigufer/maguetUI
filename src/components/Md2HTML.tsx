import React from "react";
import ReactMarkdown from "react-markdown";

interface Props {
  markdownText: string;
}

const Md2HTML = (props: Props) => {
  return (
    <div>
      <ReactMarkdown>{props.markdownText}</ReactMarkdown>
    </div>
  );
};

export default Md2HTML;
