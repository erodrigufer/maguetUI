import Title from "./components/Title";
import ChatInput from "./components/ChatInput";

function App() {
  const chatInputPlaceholderText = "Enter your prompt here...";
  return (
    <>
      <Title />
      <ChatInput placeholderText={chatInputPlaceholderText} />
    </>
  );
}

export default App;
