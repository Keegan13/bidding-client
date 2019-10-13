import _ from 'lodash';

export default function createReducer(initialState, handlers) {
    return (state = initialState, action) => {
        if (_.isNil(action)) {
            return state;
        }

        const handler = handlers[action.type];
        if (_.isNil(handler)) {
            return state;
        }

        return handler(state, action);
    };
}
