// import slideApi from '../api/slideApi';
import * as types from './actionTypes';

export function getItems() {
    return {
        type: types.GET_ITEMS
    };
}

export function addItem(item) {
    return {
        type: types.ADD_ITEM,
        item
    };
}
