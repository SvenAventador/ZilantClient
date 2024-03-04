const {
    $host
} = require('./index')

export const getAllNews = async () => {
    const {data} = await $host.get('api/news/getAllNews')
    return data
}

export const getOneNews = async (id) => {
    const {data} = await $host.get(`api/news/getOneNewsWithoutComments?id=${id}`)
    return data
}

export const createNews = async (news) => {
    const {data} = await $host.post('api/news/createNews', news)
    return data
}

export const updateNews = async (id, news) => {
    const {data} = await $host.put(`api/news/editNews?id=${id}`, news)
    return data
}

export const deleteOneNews = async (id) => {
    const {data} = await $host.delete(`api/news/deleteOneNews?id=${id}`)
    return data
}

export const deleteAllNews = async () => {
    const {data} = await $host.delete(`api/news/deleteAllNews`)
    return data
}
