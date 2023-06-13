import axios from 'axios';
import {LocalStorage} from "./localStorage";

class AxiosUtils {
    static async GET(url, data, reqOptions) {
        const headers = AxiosUtils.getHeaders();
        const options = {
            method: 'GET',
            headers,
            data,
            url,
            ...reqOptions
        };
        return axios(options);
    }

    static async POST(url, data) {
        const headers = AxiosUtils.getHeaders();
        const options = {
            method: 'POST',
            headers,
            data,
            url,
        };
        return axios(options);
    }

    static async PUT(url, data) {
        const headers = AxiosUtils.getHeaders();
        const options = {
            method: 'PUT',
            headers,
            data,
            url,
        };
        return axios(options);
    }

    static async DELETE(url, data) {
        const headers = AxiosUtils.getHeaders();
        const options = {
            method: 'DELETE',
            headers,
            data,
            url,
        };
        return axios(options);
    }

    static getHeaders() {
        const headers = {};
        const authToken = LocalStorage.getItem('authToken');
        if (authToken) {
            headers['Authorization'] = `Bearer ${authToken}`;
        }
        console.log(headers);
        return headers;
    }
}

export default AxiosUtils;
