import axios from "./axios";

export const example = (params) => {
    return axios.post('exampleUrl', params);
};