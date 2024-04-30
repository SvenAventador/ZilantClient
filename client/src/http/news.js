import {
    $authHost,
    $host
} from "./index";

export const getOne = async (id) => {
    const {data} = await $host.get(`api/news/${id}`)
    return data
}

export const getAll = async () => {
    const {data} = await $host.get('api/news')
    return data
}

export const create = async (news) => {
    const {data} = await $authHost.post('api/news', news)
    return data
}

export const edit = async (id, news) => {
    const {data} = await $authHost.put(`api/news?id=${id}`, news)
    return data
}

export const deleteOne = async (id) => {
    const {data} = await $authHost.delete(`api/news/one?id=${id}`)
    return data
}

export const deleteAll = async () => {
    const {data} = await $authHost.delete(`api/news`)
    return data
}