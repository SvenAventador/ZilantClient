import {create} from "zustand";
import {getOne} from "../http/cart";

export const useCart = create((set) => ({
    cart: [],

    getOne: async (id) => {
        try {
            const data = await getOne(id)
            console.log(data)
            set({
                cart: data
            })
        } catch (error) {
            set({
                cart: null,
                error,
                message: error.response.data.message
            })
        }
    }
}))
