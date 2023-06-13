import AxiosUtils from "../../../utils/axios";
import {GET_STATISTICS_PATH} from "../../../shared/constants/urls";

export const downloadStatistics = async () => {
    const response = await AxiosUtils.GET(GET_STATISTICS_PATH, null, {
        responseType: 'blob',
    });
    return response.data;
}
