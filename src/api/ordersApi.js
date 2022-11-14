import axiosClient from "./axiosClient";

const ordersApi = {
  getList(storeId) {
    const url = `/Order/get_order_status?storeID=${storeId}`;
    return axiosClient.get2(url);
  },
};

export default ordersApi;