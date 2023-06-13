import axios from "axios";
import {GET_ALL_CONTAINERS_PATH} from "../../../shared/constants/urls";

export const fetchContainers = async () => {
    const response = await axios.get(GET_ALL_CONTAINERS_PATH);
    console.log(response)
    return response.data;
}
