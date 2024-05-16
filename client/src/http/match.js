import {
    $authHost,
    $host
} from "./index";

export const getOne = async (id) => {
    const {data} = await $host.get(`api/match/one?id=${id}`)
    return data
}

export const getAll = async () => {
    const {data} = await $host.get('api/match')
    return data
}

export const create = async (match) => {
    const {data} = await $authHost.post('api/match', match)
    return data
}

export const edit = async (id, match) => {
    const {data} = await $authHost.put(`api/match?id=${id}`, match)
    return data
}

export const deleteOne = async (id) => {
    const {data} = await $authHost.delete(`api/match/one?id=${id}`)
    return data
}

export const deleteAll = async () => {
    const {data} = await $authHost.delete(`api/match`)
    return data
}