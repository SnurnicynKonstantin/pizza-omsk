import * as types from '../actions/actionTypes';
import initialState from './initialState';
import omit from 'lodash/omit';
import assign from 'lodash/assign';
import mapValues from 'lodash/mapValues';

export default function basketReducer(state = [], action) {
    console.log("Reducer: ",action);

    switch (action.type) {
        case types.ADD_ITEM: {

            let countedItem = state.filter(item => item.key === action.item.key)[0];
            if (countedItem)
                countedItem.counter++;
            else {
                countedItem = action.item;
                countedItem.counter = 1;
            }

            return [
                ...state.filter(item => item.key !== action.item.key),
                countedItem
            ];
        }

        case types.DELETE_ITEM:
            return {};

        case types.GET_ITEMS:
            return [
                ...state
            ];

        default:
            return state;
    }
}