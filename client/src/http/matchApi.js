const {
    $host,
} = require('./index')

export const getAllMatch = async () => {
    const {data} = await $host.get('api/match/getAllMatch')
    return data
}

export const getOneMatch = async (id) => {
    const {data} = await $host.get(`api/match/getOneMatch?id=${id}`)
    return data
}

export const createMatch = async (match) => {
    const {data} = await $host.post('api/match/createMatch', match)
    return data
}

export const updateMatch = async (id, match) => {
    const {data} = await $host.put(`api/match/editMatch?id=${id}`, match)
    return data
}

export const deleteOneMatch = async (id) => {
    const {data} = await $host.delete(`api/match/deleteOneMatch?id=${id}`)
    return data
}

export const deleteAllMatch = async () => {
    const {data} = await $host.delete(`api/match/deleteAllMatch`)
    return data
}
