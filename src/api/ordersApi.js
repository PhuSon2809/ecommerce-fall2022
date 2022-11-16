import axiosClient from "./axiosClient";

const ordersApi = {
  getListOrder(storeId) {
    const url = `/Order/get_order_status?storeID=${storeId}`;
    return axiosClient.getWithID(url);
  },

  getOrderDetail(orderId) {
    const url = `/Order/order_info?orderID=${orderId}`;
    return axiosClient.getWithID(url);
  },
};

export default ordersApi;