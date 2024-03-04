const {
    $host,
} = require('./index')

export const getAllClub = async () => {
    const {data} = await $host.get('api/clubs/getAllClub')
    return data
}

export const getOneClub = async (id) => {
    const {data} = await $host.get(`api/clubs/getOneClub?id=${id}`)
    return data
}

export const createClub = async (club) => {
    const {data} = await $host.post('api/clubs/createClub', club)
    return data
}

export const updateClub = async (id, club) => {
    const {data} = await $host.put(`api/clubs/editClub?id=${id}`, club)
    return data
}

export const deleteOneClub = async (id) => {
    const {data} = await $host.delete(`api/clubs/deleteOneClub?id=${id}`)
    return data
}

export const deleteAllClub = async () => {
    const {data} = await $host.delete(`api/clubs/deleteAllClub`)
    return data
}
