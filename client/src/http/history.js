import {
    $authHost,
    $host
} from "./index";

export const getAll = async () => {
    const {data} = await $host.get('api/history')
    return data
}

export const create = async (history) => {
    const {data} = await $authHost.post('api/history', history)
    return data
}

export const createChapters = async (id, history) => {
    const {data} = await $authHost.post(`api/history/chapters?id=${id}`, history)
    return data
}

export const editTitle = async (id, title) => {
    const {data} = await $authHost.put(`api/history/title?id=${id}`, title)
    return data
}

export const editChapter = async (id, historyChapter) => {
    const {data} = await $authHost.put(`api/history/chapter?id=${id}`, {historyChapter})
    return data
}

export const deleteOneTitle = async (id) => {
    console.log(id)
    const {data} = await $host.delete(`api/history/title/one?id=${id}`)
    return data
}

export const deleteAllTitle = async () => {
    const {data} = await $authHost.delete(`api/history/title`)
    return data
}

export const deleteOneChapter = async (id) => {
    const {data} = await $authHost.delete(`api/history/chapter?id=${id}`)
    return data
}