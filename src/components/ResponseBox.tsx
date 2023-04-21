import { ReactNode } from "react";
import Md2HTML from "./Md2HTML";
import { Container } from "@chakra-ui/react";

interface Props {
  responseText: string | undefined;
  children?: ReactNode;
}

function ResponseBox(props: Props) {
  return (
    <>
      <Container
        p={2}
        pl={10}
        pr={10}
        maxW="container.lg"
        maxH="25em"
        borderWidth="1px"
        borderRadius="lg"
        overflowY="scroll"
        shadow="md"
      >
        {props?.responseText && <Md2HTML markdownText={props.responseText} />}
        {props?.children}
      </Container>
    </>
  );
}

export default ResponseBox;
