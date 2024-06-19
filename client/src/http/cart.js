import {$host} from "./index";

export const getOne = async (id) => {
    const {data} = await $host.get(`api/cart?id=${id}`)
    return data
}

export const getAllGoods = async (id) => {
    const {data} = await $host.get(`api/cart/${id}`)
    return data
}

export const createGood = async (id, merchandiseId) => {
    const {data} = await $host.post(`api/cart/${id}?merchandiseId=${merchandiseId}`)
    return data
}


export const updateAmountGood = async (id, merchandiseId, count) => {
    const {data} = await $host.put(`api/cart/${id}?merchandiseId=${merchandiseId}`, {count})
    return data
}

export const deleteGood = async (id, merchandiseId) => {
    return await $host.delete(`api/cart/one/${id}?merchandiseId=${merchandiseId}`)
}