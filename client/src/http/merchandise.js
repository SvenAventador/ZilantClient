import {
    $authHost,
    $host
} from "./index";

export const getOne = async (id) => {
    const {data} = await $host.get(`api/merchandise/${id}`)
    return data
}

export const getAll = async () => {
    const {data} = await $host.get('api/merchandise')
    return data
}

export const create = async (merchandise) => {
    const {data} = await $authHost.post('api/merchandise', merchandise)
    return data
}

export const edit = async (id, merchandise) => {
    const {data} = await $authHost.put(`api/merchandise?id=${id}`, merchandise)
    return data
}

export const deleteOne = async (id) => {
    const {data} = await $authHost.delete(`api/merchandise/one?id=${id}`)
    return data
}

export const deleteAll = async () => {
    const {data} = await $authHost.delete(`api/merchandise`)
    return data
}