import { React } from 'react';

const axios = require('axios');

export const expolorerBlocks = async (root, count) => {
    const url = root + '/explorer/v1/blocks';
    return axios.get(url, {params: { count: count } })
        .then((resp) => {return resp.data}).catch((err) => {
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
