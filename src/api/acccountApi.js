import axiosClient from "./axiosClient";


const accountApi = {
    login(data) {
        const url = '/user/suppliersign_in';
        return axiosClient.post(url, data);
    },
}

export default accountApi;