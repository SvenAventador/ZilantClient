import {
    $authHost,
    $host
} from "./index";

export const getOne = async (id) => {
    const {data} = await $host.get(`api/player/one?id=${id}`)
    return data
}

export const getAll = async () => {
    const {data} = await $host.get('api/player')
    return data
}

export const getAllGoalkeeper = async () => {
    const {data} = await $host.get('api/player/goalkeepers')
    return data
}

export const getAllDefender = async () => {
    const {data} = await $host.get('api/player/defender')
    return data
}

export const getAllAttack = async () => {
    const {data} = await $host.get('api/player/attack')
    return data
}

export const create = async (player) => {
    const {data} = await $authHost.post('api/player', player)
    return data
}

export const edit = async (id, player) => {
    const {data} = await $authHost.put(`api/player?id=${id}`, player)
    return data
}

export const deleteOne = async (id) => {
    const {data} = await $authHost.delete(`api/player/one?id=${id}`)
    return data
}

export const deleteAll = async () => {
    const {data} = await $authHost.delete(`api/player`)
    return data
}