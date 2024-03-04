const {
    $host
} = require('./index')

export const getAllMerchandise = async () => {
    const {data} = await $host.get('api/merchandise/getAllMerchandise')
    return data
}

export const getOneMerchandise = async (id) => {
    const {data} = await $host.get(`api/merchandise/getOneMerchandise/${id}`)
    return data
}

export const createMerchandise = async (merch) => {
    const {data} = await $host.post('api/merchandise/create', merch)
    return data
}

export const updateMerchandise = async (id, merch) => {
    const {data} = await $host.put(`api/merchandise/edit?id=${id}`, merch)
    return data
}

export const deleteOneMerchandise = async (id) => {
    const {data} = await $host.delete(`api/merchandise/deleteOneMerchandise?id=${id}`)
    return data
}

export const deleteAllMerchandise = async () => {
    const {data} = await $host.delete(`api/merchandise/deleteAllMerchandise`)
    return data
}
