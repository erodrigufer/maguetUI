import Title from "./components/Title";
import ChatInput from "./components/ChatInput";
import ResponseBox from "./components/ResponseBox";
import Error from "./components/Error";
import { CanceledError } from "./services/apiClient";
import promptService, { prompt, response } from "./services/promptService";
import { useState } from "react";
import { Flex, Grid, GridItem, HStack, Spacer } from "@chakra-ui/react";
import Footer from "./components/Footer";

function App() {
  const chatInputPlaceholderText = "Enter your ChatGPT prompt here...";
  const [promptRes, setPromptRes] = useState<response>();
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  const title = "Cheap Language Model (CLM)";

  const onSubmit = (promptText: string) => {
    setLoading(true);
    const { request, cancel } = promptService.create<prompt>({
      promptText: promptText,
    });
    request
      .then((res) => {
        setPromptRes(res.data);
        setError("");
        console.log(res.data);
        setLoading(false);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message);
        setLoading(false);
      });
  };

  return (
    <>
      <Grid templateAreas={`"header" "main" "footer"`} gap={4}>
        <GridItem area={"header"}>
          <Title title={title} />
        </GridItem>

        <Spacer />

        <GridItem area={"main"} pr={3} pl={3}>
          {/* Create a gap between the components in main, align them in a column,
          we have to use Flex because VStack does not use the whole available space
          of the parent component, so, for example, the input would not expand to
          cover the whole horizontal space if we use VStack instead of Flex.
          */}
          <Flex direction="column" gap={4}>
            <ChatInput
              placeholderText={chatInputPlaceholderText}
              isLoading={isLoading}
              onSubmit={onSubmit}
            />
            {error && <Error errorMessage={error} />}
            <ResponseBox responseText={promptRes?.responseText}>
              {/* <TestText /> */}
            </ResponseBox>
          </Flex>
        </GridItem>

        <GridItem area={"footer"}>
          <HStack justify="space-evenly">
            <Footer />
          </HStack>
        </GridItem>
      </Grid>
    </>
  );
}

export default App;
