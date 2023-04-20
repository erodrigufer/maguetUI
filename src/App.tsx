import Title from "./components/Title";
import ChatInput from "./components/ChatInput";
import ResponseBox from "./components/ResponseBox";
import Error from "./components/Error";
import { CanceledError } from "./services/apiClient";
import promptService, { prompt, response } from "./services/promptService";
import { useState } from "react";
import TestText from "./TestText";

function App() {
  const chatInputPlaceholderText = "Enter your prompt here...";
  // TODO: Change type back to resp, instead of any.
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
      <Title />
      <ChatInput
        placeholderText={chatInputPlaceholderText}
        isLoading={isLoading}
        onSubmit={onSubmit}
      />
      {error && <Error errorMessage={error} />}
      <ResponseBox responseText={promptRes?.responseText}>
        {/* <TestText /> */}
      </ResponseBox>
    </>
  );
}

export default App;
