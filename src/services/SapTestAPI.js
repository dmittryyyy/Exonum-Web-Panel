import axios from 'axios';

//get request
export const getVendingMachines = async (root) => {
    const url = root + '/vendingmachines';
    return axios.get(url)
        .then((resp) => { return resp.data })
        .catch((err) => {
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

export const getShopItems = async (root, query) => {
    const url = root + '/shopitems';
    return axios.get(url, { params: { limit: query } })
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

export const getEvents = async (root, query, query2 = 100) => {
    const url = root + '/events';
    return axios.get(url, { params: { createdOn_gt: `${query}`, limit: query2 }})
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

export const getVendingProfilesBenefits = async (root, id) => {
    const url = root + '/vendingprofiles/';
    return axios.get(url + `${id}/benefit-rules`)
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

export const getUsersBenefits = async (root, id) => {
    const url = root + '/users/'
    return axios.get(url + `${id}/benefits`)
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

export const getUserSapInfo = async (root, id) => {
    const url = root + '/users/'
    return axios.get(url + `${id}`)
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

export const getItemsLoaded = async (root, id) => {
    const url = root + '/vendingmachines/'
    return axios.get(url + `${id}/items/loaded`)
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

export const getUserCards = async (root, id) => {
    const url = root + '/users/';
    return axios.get(url + `${id}/cards`)
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

export const getCards = async (root, id) => {
    const url = root + '/api/cards/';
    return axios.get(url + `${id}`)
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

//Не Проходит запрос
// export const getShopItemsUpdate = async (root) => {
//     const url = root + '/shopitems/update';
//     return axios.get(url)
//         .then((resp) => { return resp.data })
//         .catch((err) => {
//             if (err) {
//                 console.log(err.response.data);
//                 console.log(err.response.status);
//             } else if (err.request) {
//                 console.log(err.request);
//             } else {
//                 console.log('Error', err.message);
//             }
//         })
// }

//For a chain of related queries
export const getDataOnId = async (array, root, path) => {
    const res = [];
    const resp = [];
    array.map(async item => { res.push(item.id) });
    for (let i = 0; i < res.length; i++) {
        await axios.get(root + path + `/${res[i]}`)
        .then(res => resp.push(res.data));
    }
    return resp;
}





