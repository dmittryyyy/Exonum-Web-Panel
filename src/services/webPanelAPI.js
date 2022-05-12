import axios from 'axios';

export const expolorerBlocks = async (root, count) => {
    const url = root + '/explorer/v1/blocks';
    return axios.get(url, { params: { count: count } })
        .then((resp) => { return resp.data }).catch((err) => {
            if (err.status === 404) {
                console.log(err.response.data);
                console.log(err.response.status);
            } else if (err.request) {
                console.log(err.request);
            } else {
                console.log('Error', err.message);
            }
        })
}

export const searchTransaction = async (root, hash) => {
    const url = root + '/explorer/v1/transactions';
    return axios.get(url, { params: { hash: hash } })
        .then((resp) => { return resp.data })
        .catch((err) => {
            if (err) {
                console.log(err.response.data);
                console.log(err.response.status);
            } else if (err.request) {
                console.log(err.request);
            } else {
                console.log('Error', err.message);
            }
        })
}
