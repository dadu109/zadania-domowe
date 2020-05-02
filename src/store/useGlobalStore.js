import {useState} from 'react';

const useGlobalStore = (initialStore) => {
    const [state,setState] = useState(initialStore);
    const actions = (action) => {
        const {type,payload} = action;
        switch (type) {
            case 'setState':
                return setState(payload);
            default:
                return state
        }
    };
    return {state,actions}
};

export default useGlobalStore