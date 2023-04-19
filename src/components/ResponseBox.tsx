import "./responseBox.css";
import TestText from "../testText";
import { ReactNode } from "react";

interface Props {
  responseText: string | undefined;
  children?: ReactNode;
}

function ResponseBox(props: Props) {
  return (
    <>
      <div className="responseBox">
        {props?.responseText}
        {props?.children}
      </div>
    </>
  );
}

export default ResponseBox;
