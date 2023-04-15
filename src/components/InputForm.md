Here is an example of a React component for an input form with a button, written in TypeScript:

```typescript
import React, { useState } from "react";

// Define the props for the component
interface FormProps {
  onSubmit: (value: string) => void; // A function to handle form submission
}

// Define the state for the component
interface FormState {
  value: string; // The current value of the input field
}

// Define the component
const Form: React.FC<FormProps> = ({ onSubmit }) => {
  // Initialize the state
  const [state, setState] = useState<FormState>({ value: "" });

  // Handle changes to the input field
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({ value: event.target.value });
  };

  // Handle form submission
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent the default form submission behavior
    onSubmit(state.value); // Call the onSubmit function with the current value of the input field
    setState({ value: "" }); // Reset the input field to an empty string
  };

  // Render the component
  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={state.value} onChange={handleChange} />
      <button type="submit">Submit</button>
    </form>
  );
};

export default Form;
```

Here's a breakdown of what's happening in the code:

- We define the props for the component using an interface. In this case, we only have one prop: `onSubmit`, which is a function that takes a string as an argument and returns nothing.
- We define the state for the component using another interface. In this case, we only have one state property: `value`, which is the current value of the input field.
- We use the `useState` hook to initialize the state with an empty string as the initial value.
- We define two event handlers: `handleChange` and `handleSubmit`. `handleChange` is called whenever the user types something into the input field, and updates the state with the new value. `handleSubmit` is called when the user submits the form, and calls the `onSubmit` function with the current value of the input field, then resets the input field to an empty string.
- We render the component by returning a form element with an input field and a submit button. We pass the `handleSubmit` function to the `onSubmit` attribute of the form element, and the `handleChange` function to the `onChange` attribute of the input element. We also pass the current value of the input field to the `value` attribute of the input element, and display a "Submit" button.
