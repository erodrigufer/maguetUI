import apiClient from "./apiClient";

class HttpService{
    endpoint: string;

    constructor(endpoint: string) {
        this.endpoint = endpoint;
    }

    create<T>(entity: T) {
        const controller = new AbortController();
        const request = apiClient.post(
            this.endpoint, 
            entity, 
            { signal: 
                controller.signal,
        });
        return { request, cancel : () => controller.abort() };
      }
}

const create = (endpoint: string) => new HttpService(endpoint);

export default create;