import axios from 'axios';
import { Reducer, useEffect, useReducer, useState } from 'react';
import { useCurrentUser } from '../state/AppState';
import { Action, ActionTypes, reducer, RequestState } from './reducer-utils';
import {
    Method,
    RequestOptions,
    GetReponse,
    MutateReponse,
    FormError
} from './types';


const baseUrl = process.env.REACT_APP_API_URL;
axios.interceptors.response.use(
    (response) => response, (error) => {
        if (!error.response) return Promise.reject(error);
        
        const message = error.response.data.message || 'An error occurred';

        if (error.response.status === 400)
            return Promise.reject(
                new FormError(message, error.response.data.errors));

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
    const [force, setForce] = useState(true);
    const [state, dispatch] = useReducer<Reducer<RequestState, Action>>(
        reducer, { loading: true, data: null, error: null });
    const { user } = useCurrentUser();

    const doGet = () => {
        if (state.loading && !force) return;
        if (force) setForce(false);

        (async () => {
            try {
                const response = await axios.get(`${baseUrl}${route}`, {
                    ...options,
                    headers: {
                        Authorization: `Bearer ${user?.token || ''}`
                    }
                });

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
    }

    useEffect(doGet, [force, route, ...Object.values((options?.params || {}))]);

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
    const { user } = useCurrentUser();

    const get = async (options?: RequestOptions) => {
        if (state.loading) return;
        dispatch({ type: ActionTypes.REQUEST_START });
        try {
            const response = await axios.get(`${baseUrl}${route}`, {
                ...options,
                headers: {
                    Authorization: `Bearer ${user?.token || ''}`
                }
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
    const { user } = useCurrentUser();

    const mutate = async (body: any, options?: RequestOptions) => {
        try {
            if (state.loading) return;

            dispatch({ type: ActionTypes.REQUEST_START });
            const response = await axios.request({
                method, url: `${baseUrl}${route}`,
                data: body,
                ...options,
                headers: {
                    Authorization: `Bearer ${user?.token || ''}`
                }
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
