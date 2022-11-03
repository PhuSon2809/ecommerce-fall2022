import axiosClient from "./axiosClient";


const productsApi = {
    getList(data) {
        const url = '/user/suppliersign_in';
        return axiosClient.post(url, data);
    },
}

export default productsApi;