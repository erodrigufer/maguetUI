import { HStack, Heading } from "@chakra-ui/react";

interface Props {
  title: string;
}

function Title({ title }: Props) {
  return (
    <>
      <HStack justify="space-evenly">
        <Heading>{title}</Heading>;
      </HStack>
    </>
  );
}

export default Title;
