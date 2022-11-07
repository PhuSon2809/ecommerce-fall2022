import axiosClient from "./axiosClient";

const categoryApi = {
 getList() {
    const url = `/Category`;
    return axiosClient.get0(url);
  },

//   getCategory(categoryID) {
//     const url = `/Category/sub_category?categoryID=${categoryID}`;
//     return axiosClient.get2(url);
//   },
};

export default categoryApi;
