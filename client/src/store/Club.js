import {create as zustandCreate} from 'zustand';
import {
    getOne,
    getAll,
    create,
    edit,
    deleteOne,
    deleteAll
} from "../http/club";

export const useClub = zustandCreate((set) => ({
    allClub: null,
    oneClub: null,
    error: null,
    message: null,

    getAllClub: async () => {
        try {
            const data = await getAll()

            set({
                allClub: data
            })

            return data
        } catch (error) {
            set({
                club: null,
                error,
                message: error.response.data.message
            })
        }
    },

    getOneClub: async (id) => {
        try {
            const data = await getOne(id)

            set({
                oneClub: data
            })

            return data
        } catch (error) {
            set({
                oneClub: null,
                error,
                message: error.response.data.message
            })
        }
    },

    createClub: async (club) => {
        try {
            const data = await create(club)

            set({
                oneClub: data
            })

            return data
        } catch (error) {
            set({
                allClub: null,
                oneClub: null,
                error,
                message: error.response.data.message
            })

            throw error
        }
    },

    updateClub: async (id, club) => {
        try {
            const data = await edit(id, club)

            set({
                oneClub: data
            })

            return data
        } catch (error) {
            set({
                allClub: null,
                oneClub: null,
                error,
                message: error.response.data.message
            });

            throw error
        }
    },

    deleteOneClub: async (id) => {
        try {
            return await deleteOne(id)
        } catch (error) {
            set({
                allClub: null,
                oneClub: null,
                error,
                message: error.response.data.message
            })

            throw error
        }
    },

    deleteAllClub: async () => {
        try {
            return await deleteAll()
        } catch (error) {
            set({
                allClub: null,
                oneClub: null,
                error,
                message: error.response.data.message
            })
        }
    }
}))