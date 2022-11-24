import axiosClient from "./axiosClient";

const specificationApi = {
  getListSpecification() {
    const url = `/Specification`;
    return axiosClient.get0(url);
  },

  // getCategory(categoryID) {
  //   const url = `/Category/sub_category?categoryID=${categoryID}`;
  //   return axiosClient.getWithID(url);
  // },
};

export default specificationApi;
