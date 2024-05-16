import {create as zustandCreate} from 'zustand';
import {
    create,
    deleteAll,
    deleteOne,
    getAll,
    getOne,
    edit
} from "../http/merchandise";

export const useMerchandise = zustandCreate((set) => ({
    allMerch: null,
    oneMerch: null,
    error: null,
    message: null,

    getAllMerch: async () => {
        try {
            const data = await getAll()
            set({
                allMerch: data
            })

            return data
        } catch (error) {
            set({
                allMerch: null,
                error,
                message: error.response.data.message
            })
        }
    },

    getOneMerch: async (id) => {
        try {
            const data = await getOne(id)

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
            const data = await create(merch)

            set({
                oneMerch: data
            })

            return data
        } catch (error) {
            set({
                allMerch: null,
                oneMerch: null,
                error,
                message: error.response.data.message
            })

            throw error
        }
    },

    updateMerch: async (id, merch) => {
        try {
            const data = await edit(id, merch)

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
            return await deleteOne(id)
        } catch (error) {
            set({
                allMerch: null,
                oneMerch: null,
                error,
                message: error.response.data.message
            })

            throw error
        }
    },

    deleteAllMerch: async () => {
        try {
            return await deleteAll()
        } catch (error) {
            set({
                allMerch: null,
                oneMerch: null,
                error,
                message: error.response.data.message
            })
        }
    }
}));