import axiosClient from "./axiosClient";


const productsApi = {
    getList(storeId) {
        const url = `/Item/store?storeId=${storeId}`;
        return axiosClient.get2(url);
    },
}

export default productsApi;