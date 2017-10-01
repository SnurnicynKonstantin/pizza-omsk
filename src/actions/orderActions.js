import orderApi from '../api/orderApi';
import * as types from './actionTypes';

export function sendMail(data, basket) {
        return orderApi.sendMail(data, basket).then(res=>res.json()).then(res => {
            console.log("RESULT", res);
            return(res);
        }).catch(error => {
            throw(error);
        });
}
