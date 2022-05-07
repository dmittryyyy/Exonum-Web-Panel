import { React } from 'react';
import { axios } from 'axios';

export const expolorerBlocks = (root, count) => {

    return axios.get(root + 'explorer/v1/blocks' + { params: { count: Number(count) } })
        .then((resp) => resp.data).catch((err) => {
            if (err.response) {
                console.log(err.response.data);
                console.log(err.response.status);
            } else if (err.request) {
                console.log(err.request);
            } else {
                console.log('Error', err.message);
            }
        })
}
