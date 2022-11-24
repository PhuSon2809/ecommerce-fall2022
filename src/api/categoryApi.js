import axiosClient from "./axiosClient";

const categoryApi = {
  getListCategory() {
    const url = `/Category`;
    return axiosClient.get0(url);
  },

  getCategory(categoryID) {
    const url = `/Category/sub_category?categoryID=${categoryID}`;
    return axiosClient.getWithID(url);
  },
};

export default categoryApi;
