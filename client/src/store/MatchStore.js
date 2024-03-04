import {create} from 'zustand';
import {createMatch, deleteAllMatch, deleteOneMatch, getAllMatch, getOneMatch, updateMatch} from "../http/matchApi";

export const useMatch = create((set) => ({
    match: null,
    oneMatch: null,
    error: null,
    message: null,

    getAllMatch: async () => {
        try {
            const data = await getAllMatch()
            set({
                match: data
            })

            return data
        } catch (error) {
            set({
                match: null,
                error,
                message: error.response.data.message
            });
        }
    },

    getOneMatch: async (id) => {
        try {
            const data = await getOneMatch(id)
            set({
                oneMatch: data
            })

            return data
        } catch (error) {
            set({
                oneMatch: null,
                error,
                message: error.response.data.message
            });
        }
    },

    createMatch: async (match) => {
        try {
            const data = await createMatch(match)
            set({
                oneMatch: data
            })

            return data
        } catch (error) {
            set({
                match: null,
                oneMatch: null,
                error,
                message: error.response.data.message
            });

            throw error
        }
    },

    updateMatch: async (id, match) => {
        try {
            const data = await updateMatch(id, match)
            set({
                oneMatch: data
            })

            return data
        } catch (error) {
            set({
                match: null,
                oneMatch: null,
                error,
                message: error.response.data.message
            });

            throw error
        }
    },

    deleteOneMatch: async (id) => {
        try {
            return await deleteOneMatch(id)
        } catch (error) {
            set({
                match: null,
                oneMatch: null,
                error,
                message: error.response.data.message
            });

            throw error
        }
    },

    deleteAllMatch: async () => {
        try {
            return await deleteAllMatch()
        } catch (error) {
            set({
                match: null,
                oneMatch: null,
                error,
                message: error.response.data.message
            });
        }
    }
}));