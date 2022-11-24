import React from 'react'
import axiosClient from "./axiosClient";

const storeApi = {
    
      getListRevenue(storeID) {
        const url = `/Asset/get_store_reveneu?storeID=${storeID}`;
        return axiosClient.getWithID(url);
      },
      getInfoStore(storeID) {
        const url = `/Store/store_detail?storeID=${storeID}`;
        return axiosClient.getWithID(url);
      },
}

export default storeApi