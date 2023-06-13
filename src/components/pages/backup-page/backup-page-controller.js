import AxiosUtils from "../../../utils/axios";
import {CREATE_DUMP_PATH, GET_ALL_DUMPS_PATH} from "../../../shared/constants/urls";

export const getBackups = async () => {
    const response = await AxiosUtils.GET(GET_ALL_DUMPS_PATH);
    return response.data;
}

export const createBackup = async () => {
    const response = await AxiosUtils.GET(CREATE_DUMP_PATH, null, {
        responseType: 'blob',
    });
    console.log(response);
    return response.data;
}
