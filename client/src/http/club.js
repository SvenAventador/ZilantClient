import {
    $authHost,
    $host
} from "./index";

export const getOne = async (id) => {
    const {data} = await $host.get(`api/clubs/one?id=${id}`)
    return data
}

export const getAll = async () => {
    const {data} = await $host.get('api/clubs/')
    return data
}

export const create = async (club) => {
    const {data} = await $authHost.post('api/clubs', club)
    return data
}

export const edit = async (id, club) => {
    const {data} = await $authHost.put(`api/clubs?id=${id}`, club)
    return data
}

export const deleteOne = async (id) => {
    const {data} = await $authHost.delete(`api/clubs/one?id=${id}`)
    return data
}

export const deleteAll = async () => {
    const {data} = await $authHost.delete(`api/clubs/`)
    return data
}