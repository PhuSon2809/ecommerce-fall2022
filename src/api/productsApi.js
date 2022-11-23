import axiosClient from "./axiosClient";

const productsApi = {
  async getList(storeId) {
    const url = `/Item/store?storeId=${storeId}`;
    return await axiosClient.getWithID(url);
  },

  async addNewProduct(params) {
    console.log(params);
    const token = axiosClient.getToken();
    if (token) {
      axiosClient.setHeaderAuth(token);
      const res = await axiosClient.post("/Item", params);
      return res;
    }
  },
};

export default productsApi;
