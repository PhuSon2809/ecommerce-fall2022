import axiosClient from "./axiosClient";

const brandApi = {
  getListBrands() {
    const url = `/Brand`;
    return axiosClient.get0(url);
  },

  getBrand(brandID) {
    const url = `/Brand/brand_model?brandID=${brandID}`;
    return axiosClient.getWithID(url);
  },
};

export default brandApi;
