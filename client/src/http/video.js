import {
    $authHost,
    $host
} from "./index";

export const getOne = async (id) => {
    const {data} = await $host.get(`api/video/${id}`)
    return data
}

export const getAll = async () => {
    const {data} = await $host.get('api/video/all')
    return data
}

export const getAllWithVideo = async () => {
    const {data} = await $host.get('api/video/video')
    return data
}

export const create = async (gallery) => {
    const {data} = await $authHost.post('api/video', gallery)
    return data
}

export const deleteOne = async (id) => {
    const {data} = await $authHost.delete(`api/video/one?id=${id}`)
    return data
}

export const deleteAll = async () => {
    const {data} = await $authHost.delete(`api/video`)
    return data
}