# maguet Web

`maguet web` is a web application that interacts with the OpenAI API, sends prompts to ChatGPT and displays their response in the web browser. 
It is capable of parsing the Markdown received from the OpenAI API in order to display code with highlighted syntax.

The webapp uses Typescript, React and Chakra UI for the frontend, while the backend runs with Golang.

## Installation

To run the web application in a dev environment, execute the following commands:

```
npm install
npm run dev
```

Then, navigate to the `./backend` directory and execute:

```
make run
```

This will start the backend server.
