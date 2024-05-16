import {create as zustandCreate} from 'zustand';
import {
    create,
    edit,
    deleteAll,
    deleteOne,
    getAll,
    getOne
} from "../http/match";

export const useMatch = zustandCreate((set) => ({
    allMatch: null,
    oneMatch: null,
    error: null,
    message: null,

    getAllMatch: async () => {
        try {
            const data = await getAll()

            set({
                allMatch: data
            })

            return data
        } catch (error) {
            set({
                allMatch: null,
                error,
                message: error.response.data.message
            })
        }
    },

    getOneMatch: async (id) => {
        try {
            const data = await getOne(id)

            set({
                oneMatch: data
            })

            return data
        } catch (error) {
            set({
                oneMatch: null,
                error,
                message: error.response.data.message
            })
        }
    },

    createMatch: async (match) => {
        try {
            const data = await create(match)

            set({
                oneMatch: data
            })

            return data
        } catch (error) {
            set({
                allMatch: null,
                oneMatch: null,
                error,
                message: error.response.data.message
            })

            throw error
        }
    },

    updateMatch: async (id, match) => {
        try {
            const data = await edit(id, match)

            set({
                oneMatch: data
            })

            return data
        } catch (error) {
            set({
                allMatch: null,
                oneMatch: null,
                error,
                message: error.response.data.message
            });

            throw error
        }
    },

    deleteOneMatch: async (id) => {
        try {
            return await deleteOne(id)
        } catch (error) {
            set({
                allMatch: null,
                oneMatch: null,
                error,
                message: error.response.data.message
            })

            throw error
        }
    },

    deleteAllMatch: async () => {
        try {
            return await deleteAll()
        } catch (error) {
            set({
                allMatch: null,
                oneMatch: null,
                error,
                message: error.response.data.message
            })
        }
    }
}));