import React, { ChangeEvent, FormEvent, useState } from "react";
import { Input, Button, HStack } from "@chakra-ui/react";

interface Props {
  placeholderText: string;
  onSubmit: (promptText: string) => void;
}

function ChatInput({ placeholderText, onSubmit }: Props) {
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

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
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

  // The 'htmlfor' attribute associates a label with a particular
  // input, when a user clicks on the label, the browser automatically
  // focuses on the associated input.
  return (
    <form onSubmit={handleSubmit}>
      <HStack>
        <Input
          // className="chatInput"
          type="text"
          value={inputValue}
          placeholder={placeholderTextToggle}
          size="lg"
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        <Button type="submit" size="lg">
          Submit
        </Button>
      </HStack>
    </form>
  );
}

export default ChatInput;
