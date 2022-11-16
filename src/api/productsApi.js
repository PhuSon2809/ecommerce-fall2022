import axiosClient from "./axiosClient";

const productsApi = {
  getList(storeId) {
    const url = `/Item/store?storeId=${storeId}`;
    return axiosClient.getWithID(url);
  },
};

export default productsApi;
