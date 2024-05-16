import {$host} from "./index";

export const getAll = async () => {
    const {data} = await $host.get(`api/comment/`)
    return data
}

export const create = async (newsId, newsComment, userId) => {
    const {data} = await $host.post(`api/comment/${newsId}`, {newsComment, userId})
    return data
}

export const edit = async (id, comment) => {
    const {data} = await $host.post(`api/comment?id=${id}`, comment)
    return data
}

export const deleteOne = async (id) => {
    const {data} = await $host.delete(`api/comment?id=${id}`)
    return data
}