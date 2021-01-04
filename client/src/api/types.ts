import { RequestState } from "./reducer-utils";

export interface Response {
    status: 200;
    data: any;
}

export class FormError {
    public message: string = 'An error occured';

    constructor(
        public errors: InputError[]
    ) { }
}

export interface InputError {
    field: string;
    error: string;
}

export type Method = 'post' | 'put' | 'delete';

export interface RequestOptions {
    params: any;
}

export interface GetReponse extends RequestState {
    /**
     * Sends a GET request to the server
     * @returns undefined if a request is already in progress
     * @returns a function to cancel the request
     */
    execute(): (() => void) | undefined;
}

export interface MutateReponse extends RequestState {
    /**
     * Sends a mutate request with the specified method to the server
     * @param body the request body
     * @param options the request options
     * @returns undefined if a request is already in progress or an error occurred
     * @returns the reponse otherwise
     */
    mutate(body: any, options?: RequestOptions): Promise<Response | undefined>;
}
