import { Alert, AlertDescription, AlertIcon } from "@chakra-ui/react";

interface Props {
  errorMessage: string;
}

const Error = (props: Props) => {
  return (
    <>
      <Alert status="error">
        <AlertIcon />
        {/* <AlertTitle></AlertTitle> */}
        <AlertDescription>
          There was an error processing your request: {props.errorMessage}
        </AlertDescription>
      </Alert>
    </>
  );
};

export default Error;
