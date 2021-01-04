export enum ActionTypes {
    REQUEST_START,
    REQUEST_FINISH,
}

export interface Action {
    type: ActionTypes
    payload?: any;
}

export interface RequestState {
    loading: boolean;
    data: any | null;
    error: any | null;
}

export function reducer(state: RequestState, action: Action) {
    const { type, payload } = action;

    switch (type) {
        case ActionTypes.REQUEST_START:
            return { ...state, loading: true };

        case ActionTypes.REQUEST_FINISH:
            return {
                ...state,
                loading: false,
                data: payload.data,
                error: payload.error
            };
    
        default:
            return state;
    }
}
