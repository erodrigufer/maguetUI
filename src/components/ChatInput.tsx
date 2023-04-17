// <br> means line break.
import React, { ChangeEvent, FormEvent, useState } from "react";

interface Props {
  placeholderText: string;
}

function ChatInput({ placeholderText }: Props) {
  // The text value written by the user.
  const [inputValue, setInputValue] = useState("");
  // The ChatInput component starts as not focused.
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (event: FormEvent) => {
    // Prevent the default baheviour of a button, e.g. redirecting
    // to another page after pressing the button.
    event.preventDefault();
    console.log("Submitted value:", inputValue);
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
      <label htmlFor="prompt">
        Prompt
        <input
          type="text"
          id="prompt"
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
