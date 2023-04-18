import create from "./httpService"

export interface prompt {
    promptText: string,
}

export interface response {
    responseText: string,
}

export default create('/v1/prompt');