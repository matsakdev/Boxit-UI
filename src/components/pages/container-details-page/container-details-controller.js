import {GET_ALL_CONTAINERS_PATH} from "../../../shared/constants/urls";
import axios from "axios";

export const getContainerInfo = async (containerId) => {
    const containerInfo = await axios.get(GET_ALL_CONTAINERS_PATH + `/${containerId}`);
    console.log(containerInfo);
    return containerInfo.data;
}
