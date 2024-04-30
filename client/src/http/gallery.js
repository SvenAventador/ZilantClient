import {
    $authHost,
    $host
} from "./index";

export const getOne = async (id) => {
    const {data} = await $host.get(`api/gallery/${id}`)
    return data
}

export const getAll = async () => {
    const {data} = await $host.get('api/gallery')
    return data
}

export const create = async (gallery) => {
    const {data} = await $authHost.post('api/news', gallery)
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