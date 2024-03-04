import {create} from 'zustand';
import {
    createMerchandise, deleteAllMerchandise,
    deleteOneMerchandise,
    getAllMerchandise,
    getOneMerchandise,
    updateMerchandise
} from "../http/merchandiseApi";

export const useMerchandise = create((set) => ({
    merch: null,
    oneMerch: null,
    error: null,
    message: null,

    getAllMerch: async () => {
        try {
            const data = await getAllMerchandise()
            set({
                Club: data
            })

            return data
        } catch (error) {
            set({
                merch: null,
                error,
                message: error.response.data.message
            });
        }
    },

    getOneMerch: async (id) => {
        try {
            const data = await getOneMerchandise(id)
            set({
                oneMerch: data
            })

            return data
        } catch (error) {
            set({
                oneMerch: null,
                error,
                message: error.response.data.message
            });
        }
    },

    createMerch: async (merch) => {
        try {
            const data = await createMerchandise(merch)
            set({
                oneMerch: data
            })

            return data
        } catch (error) {
            set({
                merch: null,
                oneMerch: null,
                error,
                message: error.response.data.message
            });

            throw error
        }
    },

    updateMerch: async (id, merch) => {
        try {
            const data = await updateMerchandise(id, merch)
            set({
                oneMerch: data
            })

            return data
        } catch (error) {
            set({
                merch: null,
                oneMerch: null,
                error,
                message: error.response.data.message
            });

            throw error
        }
    },

    deleteOneMerch: async (id) => {
        try {
            return await deleteOneMerchandise(id)
        } catch (error) {
            set({
                merch: null,
                oneMerch: null,
                error,
                message: error.response.data.message
            });

            throw error
        }
    },

    deleteAllMerch: async () => {
        try {
            return await deleteAllMerchandise()
        } catch (error) {
            set({
                merch: null,
                oneMerch: null,
                error,
                message: error.response.data.message
            });
        }
    }
}));