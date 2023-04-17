// <br> means line break.
import React, { useState } from "react";

interface Props {
  placeholderText: string;
}

function ChatInput({ placeholderText }: Props) {
  // The text value written by the user.
  const [inputValue, setInputValue] = useState("");
  // The ChatInput component starts as not focused.
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (event: { preventDefault: () => void }) => {
    // Prevent the default baheviour of a button, e.g. redirecting
    // to another page after pressing the button.
    event.preventDefault();
    console.log("Submitted value:", inputValue);
    // Reset input value after submission, i.e. the chat input is
    // again an empty string.
    setInputValue("");
  };

  const handleChange = (event: {
    // TODO: I do not entirely understand, why this prop is being
    // passed to this function. I guess we need this function to
    // update the state of the input value, every time the text
    // in the chat input changes.
    target: { value: React.SetStateAction<string> };
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
      <label>
        Prompt:
        <input
          type="text"
          value={inputValue}
          placeholder={placeholderTextToggle}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}

export default ChatInput;
