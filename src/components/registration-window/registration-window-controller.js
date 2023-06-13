import {LOGIN_PATH} from "../../shared/constants/urls";
import AxiosUtils from "../../utils/axios";

export const loginCall = async (email, password) => {
    try {
        const response = await AxiosUtils.POST(LOGIN_PATH, {
            email,
            password,
        })

        const {data, status} = response;

        return {data, status}
    } catch (error) {
        const message = error.response ? error.response.data.message : 'Request failed';
        return {
            data: message,
            status: (error.response && error.response.status) || 404,
        }
    }

}
