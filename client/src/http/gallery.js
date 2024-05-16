import {
    $authHost,
    $host
} from "./index";

export const getOne = async (id) => {
    const {data} = await $host.get(`api/gallery/${id}`)
    return data
}

export const getAll = async () => {
    const {data} = await $host.get('api/gallery/all')
    return data
}

export const getAllWithImages = async () => {
    const {data} = await $host.get('api/gallery/images')
    return data
}

export const create = async (gallery) => {
    const {data} = await $authHost.post('api/gallery', gallery)
    return data
}

export const deleteOne = async (id) => {
    const {data} = await $authHost.delete(`api/gallery/one?id=${id}`)
    return data
}

export const deleteAll = async () => {
    const {data} = await $authHost.delete(`api/gallery`)
    return data
}