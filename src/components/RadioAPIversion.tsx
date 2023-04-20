import { Radio, RadioGroup, Stack } from "@chakra-ui/react";
import React from "react";

const RadioAPIversion = () => {
  const [value, setValue] = React.useState("1");
  return (
    <>
      <RadioGroup onChange={setValue} value={value}>
        <Stack direction="row">
          <Radio value="1">ChatGPT 3.5</Radio>
          <Radio value="2">ChatGPT 4.0</Radio>
        </Stack>
      </RadioGroup>
    </>
  );
};

export default RadioAPIversion;
