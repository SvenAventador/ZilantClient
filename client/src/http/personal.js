import {
    $authHost,
    $host
} from "./index";

export const getOne = async (id) => {
    const {data} = await $host.get(`api/personal/one?id=${id}`)
    return data
}

export const getAll = async () => {
    const {data} = await $host.get('api/personal')
    return data
}

export const create = async (player) => {
    const {data} = await $authHost.post('api/personal', player)
    return data
}

export const edit = async (id, player) => {
    const {data} = await $authHost.put(`api/personal?id=${id}`, player)
    return data
}

export const deleteOne = async (id) => {
    const {data} = await $authHost.delete(`api/personal/one?id=${id}`)
    return data
}

export const deleteAll = async () => {
    const {data} = await $authHost.delete(`api/personal`)
    return data
}