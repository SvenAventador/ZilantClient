import {$host} from "./index";

export const createOrder = async (id, fullPrice) => {
    const {data} = await $host.post(`api/order/${id}`, {fullPrice})
    return data
}

export const getAllOrders = async () => {
    const {data} = await $host.get(`api/order`)
    return data
}

export const getAllUserOrders = async (id) => {
    const {data} = await $host.get(`api/order/${id}`)
    return data
}

export const changeStatus = async (orderId, deliveryStatusId) => {
    const {data} = await $host.put(`api/order?orderId=${orderId}&deliveryStatusId=${deliveryStatusId}`)
    return data
}