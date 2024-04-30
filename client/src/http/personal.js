import {
    $authHost
} from "./index";
import {jwtDecode} from "jwt-decode";

export const edit = async (id, personal) => {
    const {data} = await $authHost.put(`api/personal/${id}`, personal)
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)
}