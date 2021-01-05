import axios from 'axios';
import { Reducer, useEffect, useReducer } from 'react';
import { Action, ActionTypes, reducer, RequestState } from './reducer-utils';
import {
    Method,
    RequestOptions,
    GetReponse,
    MutateReponse,
    FormError
} from './types';


const baseUrl = 'http://localhost:5000'; // switch to env variable
axios.interceptors.response.use(
    (response) => response, (error) => {
        if (!error.response) return Promise.reject(error);
        if (error.response.status === 400)
            return Promise.reject(new FormError(error.response.data.errors));

        return Promise.reject(error);
    });

/**
 * Sends a GET request with the specified route and options
 * as soon as the Component is mounted
 * @param route the relative GET request route.
 * The route must have a leading '/'
 * @param options the request options
 */
export const useGet = (route: string, options?: RequestOptions): GetReponse => {
    const [state, dispatch] = useReducer<Reducer<RequestState, Action>>(
        reducer, { loading: true, data: null, error: null });

    const doGet = () => {
        let isMounted = true;

        (async () => {
            try {
                const response = await axios.get(`${baseUrl}${route}`, options);
                if (!isMounted) return;

                dispatch({
                    type: ActionTypes.REQUEST_FINISH,
                    payload: {
                        data: response.data.data
                    }
                });
            } catch (error) {
                dispatch({
                    type: ActionTypes.REQUEST_FINISH,
                    payload: {
                        data: null, error
                    }
                });
            }
        })();

        return () => { isMounted = false; }
    }

    useEffect(doGet, [route, options]);

    return {
        ...state,
        execute: () => {
            if (state.loading) return;
            dispatch({ type: ActionTypes.REQUEST_START });
            return doGet();
        }
    }
}


/**
 * Sends a GET request with the specified route and options
 * as soon as the `get` function is called
 * @param route the relative GET request route.
 * The route must have a leading '/'
 * @param options the request options
 */
export const useLazyGet = (route: string) => {
    const [state, dispatch] = useReducer<Reducer<RequestState, Action>>(
        reducer, { loading: false, data: null, error: null });

    const get = async (options?: RequestOptions) => {
        if (state.loading) return;
        dispatch({ type: ActionTypes.REQUEST_START });
        try {
            const response = await axios.get(`${baseUrl}${route}`, options);

            dispatch({
                type: ActionTypes.REQUEST_FINISH,
                payload: {
                    data: response.data.data
                }
            });

            return response.data;
        } catch (error) {
            dispatch({
                type: ActionTypes.REQUEST_FINISH,
                payload: {
                    data: null, error
                }
            });
            throw error;
        }
    }

    return { ...state, get }
}


/**
 * Sends a request with the specified route and method
 * as soon as the mutate function is called
 * @param route the relative request route.
 * The route must have a leading '/'
 * @param options the request options
 */
export const useMutate = (route: string, method: Method): MutateReponse => {
    const [state, dispatch] = useReducer<Reducer<RequestState, Action>>(
        reducer, { loading: false, data: null, error: null });

    const mutate = async (body: any, options?: RequestOptions) => {
        try {
            if (state.loading) return;

            dispatch({ type: ActionTypes.REQUEST_START });
            const response = await axios.request({
                method, url: `${baseUrl}${route}`, data: body, ...options
            });

            dispatch({
                type: ActionTypes.REQUEST_FINISH,
                payload: {
                    data: response.data.data
                }
            });

            return response.data;
        } catch (error) {
            dispatch({
                type: ActionTypes.REQUEST_FINISH,
                payload: {
                    data: null, error
                }
            });
            throw error;
        }
    }

    return { ...state, mutate }
}