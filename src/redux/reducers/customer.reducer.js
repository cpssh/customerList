import { CUSTOMER_LIST_RESPONSE, CUSTOMER_LIST } from '../types/customer.types.js';

const INITIAL_STATE = {
    AllCustomersList: [],
    customersList: [],
    count: 0
};

const reducer = (state = INITIAL_STATE, action) => {

    switch (action.type) {

        case CUSTOMER_LIST_RESPONSE:

            return {

                ...state, customersList: action.payload,

            };

        case CUSTOMER_LIST:
            return {
                ...state, AllCustomersList: [],
            };

            default: return state;

    }

};

export default reducer;