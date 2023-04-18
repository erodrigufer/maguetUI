import Title from "./components/Title";
import ChatInput from "./components/ChatInput";
import ResponseBox from "./components/ResponseBox";
import Error from "./components/Error";
import { CanceledError } from "./services/apiClient";
import promptService, { prompt, response } from "./services/promptService";
import { useEffect, useState } from "react";
import TestText from "./testText";

function App() {
  const chatInputPlaceholderText = "Enter your prompt here...";
  const [promptRes, setPromptRes] = useState<response>();
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  const onSubmit = (promptText: string) => {
    setLoading(true);
    const { request, cancel } = promptService.create<prompt>({
      promptText: promptText,
    });
    request
      .then((res) => {
        setPromptRes(res.data);
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
      <Title />
      <ChatInput
        placeholderText={chatInputPlaceholderText}
        onSubmit={onSubmit}
      />
      <ResponseBox responseText="hola!">{/* <TestText /> */}</ResponseBox>
      <Error errorMessage={error} />
    </>
  );
}

export default App;
