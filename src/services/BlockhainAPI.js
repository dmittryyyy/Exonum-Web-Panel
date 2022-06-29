import axios from 'axios';

export const expolorerBlocks = async (root, count) => {
    const url = root + '/explorer/v1/blocks';
    return axios.get(url, { params: { count: count } })
        .then((resp) => { return resp.data })
        .catch((err) => {
            if (err.status === 404) {
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
        .then((resp) => { return resp.data });
}

export const searchOrder = async (root, key) => {
    const url = root + '/services/order/v1/order';
    return axios.get(url, { params: { public_key: key } })
        .then((resp) => { return resp.data });
}

export const searchServApplic = async (root, key) => {
    const url = root + '/services/user/v1/application_service/info';
    return axios.get(url, { params: { public_key: key } })
        .then((resp) => { return resp.data });
}

export const searchUserWallet = async (root, key) => {
    const url = root + '/services/payment_account/v1/payment_account';
    return axios.get(url, { params: { public_key: key } })
        .then((resp) => { return resp.data });
}

export const getCatalog = async (root) => {
    const url = root + '/services/user/v1/catalog';
    return axios.get(url)
        .then((resp) => { return resp.data });
}

export const searchDeviceKey = async (root, key, bool) => {
    const url = root + '/services/order/v1/device_key';
    return axios.get(url, { params: { public_key: key, history: bool } })
        .then((resp) => { return resp.data });
}

export const searchOrders = async (root, key) => {
    const url = root + '/services/order/v1/user_orders';
    return axios.get(url, { params: { public_key: key } })
        .then((resp) => { return resp.data });
}


