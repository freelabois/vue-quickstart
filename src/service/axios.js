import configAxios from 'axios';
import router from "../router";
import store from "../store";
import {config} from '../config/config'
import {uuid} from "vue-uuid";

const apiInstance = configAxios.create({
    baseURL: config.appConfig.remoteServiceBaseUrl, //process.env.VUE_APP_API_URL,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'    
    }
});

apiInstance.interceptors.request.use((config) => {
    config.data = {...config.data, chaveDeIdempotencia: uuid.v4()};
    config.params = {...config.params, chaveDeIdempotencia: uuid.v4()};
    const bearerToken = localStorage.getItem('access_token');
    if (
        bearerToken
        || bearerToken !== 'undefined'
        || bearerToken !== ''
        || bearerToken != null
    ) {
        config.headers.Authorization = `Bearer ${bearerToken}`;
    }
    return config;
});

apiInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        const {response} = error;
        if (error?.message === 'Network Error') {
            localStorage.removeItem('token');
            localStorage.removeItem('access_token');
            localStorage.removeItem('encrypted_token');
            localStorage.removeItem('user_id');
            router.push('/login');
        }
        let msg = {
            styleMessage: 'danger',
            message: (response.error?.details || response.data.error.details) || '',
            title: response.error?.message || response.data.error.message || '',
        };
        store.dispatch('action_openMessageModal', msg);
    },
);

export default apiInstance;