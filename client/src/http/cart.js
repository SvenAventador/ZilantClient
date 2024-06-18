import {$host} from "./index";

export const getOne = async (id) => {
    const {data} = await $host.get(`api/cart/${id}`)
    return data
}
export const getAllGoods = async () => {

}
export const createGood = async () => {

}
export const updateAmountGood = async () => {

}
export const deleteGood = async () => {

}
export const deleteAllGood = async () => {

}