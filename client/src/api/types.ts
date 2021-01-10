import { RequestState } from "./reducer-utils";

export interface Response {
    status: 200;
    data: any;
}

export class FormError {
    public message: string = 'An error occured';
    public readonly errors: any;

    constructor(
        errors: InputError[] = []
    ) {
        this.errors = errors.reduce((prev, cur) => ({
            ...prev,
            [cur.name]: cur.message
        }), {});
    }
}

export interface InputError {
    name: string;
    message: string;
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
