// <br> means line break, it does not require a closing tag.
import React, { useState } from "react";

function InputForm() {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    console.log("Submitted value:", inputValue);
    // Do something with the submitted value
    setInputValue("");
  };

  const handleChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setInputValue(event.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Input value:
        <input type="text" value={inputValue} onChange={handleChange} />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}

//   return (
//     <>
//     <form>
// 		<label for="text-input">Enter Text:</label>
// 		<input type="text" id="text-input" name="text-input"><br><br>
// 		<button type="submit">Submit</button>
// 	</form>
//     </>
//   );
// }

export default InputForm;
