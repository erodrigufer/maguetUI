import Title from "./components/Title";
import ChatInput from "./components/ChatInput";

function App() {
  const chatInputPlaceholderText = "Enter your prompt here...";

  const onSubmit = () => {
    console.log("Sending text to server...");
  };

  return (
    <>
      <Title />
      <ChatInput
        placeholderText={chatInputPlaceholderText}
        onSubmit={onSubmit}
      />
    </>
  );
}

export default App;
