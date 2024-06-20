import {$authHost} from "./index";
import {jwtDecode} from "jwt-decode";

export const edit = async (id, user) => {
    const {data} = await $authHost.put(`api/personals/${id}`, user)
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)
}