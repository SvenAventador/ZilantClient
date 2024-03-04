const {
    $host
} = require('./index')

export const getAllPlayer = async () => {
    const {data} = await $host.get('api/player/getAllPlayer')
    return data
}

export const getOnePlayer = async (id) => {
    const {data} = await $host.get(`api/player/getOnePlayer?id=${id}`)
    return data
}

export const createPlayer = async (player) => {
    const {data} = await $host.post('api/player/create', player)
    return data
}

export const updatePlayer = async (id, player) => {
    const {data} = await $host.put(`api/player/edit?id=${id}`, player)
    return data
}

export const deleteOnePlayer = async (id) => {
    const {data} = await $host.delete(`api/player/deleteOnePlayer?id=${id}`)
    return data
}

export const deleteAllPlayer = async () => {
    const {data} = await $host.delete(`api/player/deleteAllPlayer`)
    return data
}
