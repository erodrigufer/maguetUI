# maguet web

`maguet web` is a web application that interacts with the OpenAI API, sends prompts to ChatGPT and displays their response in the web browser. 
It is capable of parsing the Markdown received from the OpenAI API in order to display code with highlighted syntax.

![Code syntax highlighting capabilities shown in a prompt's response](/img/codeSyntaxHighlighting.png)

The webapp uses Typescript, React and Chakra UI for the frontend, while the backend runs with Golang.
It uses the [maguet](https://github.com/erodrigufer/maguet) Go library to interact with the ChatGPT API.


## Installation

To run the web application in a dev environment, execute the following commands:

```
npm run dev
```

This will start both the backend server and the frontend application in your local network (localhost).

The backend server requires a valid OpenAI API key. 
You should provide your OpenAI API key to the backend by storing it at `${HOME}/.maguet.env` as `MAGUET_TOKEN=<your-api-key>`.

![Landing page](/img/noPrompt.png)

## Requirements

* go v1.20+
* npm
