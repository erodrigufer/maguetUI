import { FormEvent, SetStateAction, useState } from "react";
import { Button, Flex, Textarea } from "@chakra-ui/react";
import RadioAPIversion from "./RadioAPIversion";

interface Props {
  placeholderText: string;
  isLoading: boolean;
  onSubmit: (promptText: string) => void;
}

function ChatInput({ placeholderText, isLoading, onSubmit }: Props) {
  // The text value written by the user.
  const [inputValue, setInputValue] = useState("");
  // The ChatInput component starts as not focused.
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (event: FormEvent) => {
    // Prevent the default behaviour of a button, e.g. redirecting
    // to another page after pressing the button.
    event.preventDefault();

    onSubmit(inputValue);

    // Reset input value after submission, i.e. the chat input is
    // again an empty string.
    setInputValue("");
  };

  const handleChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setInputValue(event.target.value);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  // Make React update a variable by chaining a state variable into it.
  // If the isFocused state is updated, then the placeholder text in the
  // form reacts to the state.
  const placeholderTextToggle = isFocused ? "" : placeholderText;

  return (
    <form onSubmit={handleSubmit}>
      <Flex gap={2}>
        <Textarea
          value={inputValue}
          placeholder={placeholderTextToggle}
          size="lg"
          borderRadius={15}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        <Button
          isLoading={isLoading}
          loadingText="Processing"
          colorScheme="purple"
          type="submit"
          size="lg"
        >
          Submit
        </Button>
      </Flex>
      <RadioAPIversion />
    </form>
  );
}

export default ChatInput;
