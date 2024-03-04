import {create} from 'zustand';
import {
    createClub,
    deleteAllClub,
    deleteOneClub,
    getAllClub,
    getOneClub,
    updateClub
} from "../http/clubApi";

export const useClub = create((set) => ({
    club: null,
    oneClub: null,
    error: null,
    message: null,

    getAllClub: async () => {
        try {
            const data = await getAllClub()
            set({
                Club: data
            })

            return data
        } catch (error) {
            set({
                club: null,
                error,
                message: error.response.data.message
            });
        }
    },

    getOneClub: async (id) => {
        try {
            const data = await getOneClub(id)
            set({
                oneClub: data
            })

            return data
        } catch (error) {
            set({
                oneClub: null,
                error,
                message: error.response.data.message
            });
        }
    },

    createClub: async (Club) => {
        try {
            const data = await createClub(Club)
            set({
                oneClub: data
            })

            return data
        } catch (error) {
            set({
                Club: null,
                oneClub: null,
                error,
                message: error.response.data.message
            });

            throw error
        }
    },

    updateClub: async (id, Club) => {
        try {
            const data = await updateClub(id, Club)
            set({
                oneClub: data
            })

            return data
        } catch (error) {
            set({
                Club: null,
                oneClub: null,
                error,
                message: error.response.data.message
            });

            throw error
        }
    },

    deleteOneClub: async (id) => {
        try {
            return await deleteOneClub(id)
        } catch (error) {
            set({
                Club: null,
                oneClub: null,
                error,
                message: error.response.data.message
            });

            throw error
        }
    },

    deleteAllClub: async () => {
        try {
            return await deleteAllClub()
        } catch (error) {
            set({
                Club: null,
                oneClub: null,
                error,
                message: error.response.data.message
            });
        }
    }
}));