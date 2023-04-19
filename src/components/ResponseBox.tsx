import "./responseBox.css";
import TestText from "../TestText";
import { ReactNode } from "react";
import Md2HTML from "./Md2HTML";

interface Props {
  responseText: string | undefined;
  children?: ReactNode;
}

function ResponseBox(props: Props) {
  return (
    <>
      <div className="responseBox">
        {props?.responseText && <Md2HTML markdownText={props.responseText} />}
        {props?.children}
      </div>
    </>
  );
}

export default ResponseBox;
