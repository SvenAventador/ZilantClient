import {create as zustandCreate} from 'zustand';
import {
    create,
    deleteAll,
    deleteOne,
    getAll,
    getOne,
    edit
} from "../http/player";

export const usePlayer = zustandCreate((set) => ({
    allPlayers: null,
    onePlayer: null,
    error: null,
    message: null,

    getAllPlayer: async () => {
        try {
            const data = await getAll()
            set({
                allPlayers: data
            })

            return data
        } catch (error) {
            set({
                allPlayers: null,
                error,
                message: error.response.data.message
            })
        }
    },

    getOnePlayer: async (id) => {
        try {
            const data = await getOne(id)

            set({
                onePlayer: data
            })

            return data
        } catch (error) {
            set({
                onePlayer: null,
                error,
                message: error.response.data.message
            })
        }
    },

    createPlayer: async (player) => {
        try {
            const data = await create(player)
            set({
                onePlayer: data
            })

            return data
        } catch (error) {
            set({
                allPlayers: null,
                onePlayer: null,
                error,
                message: error.response.data.message
            })

            throw error
        }
    },

    updatePlayer: async (id, player) => {
        try {
            const data = await edit(id, player)
            set({
                onePlayer: data
            })

            return data
        } catch (error) {
            set({
                allPlayers: null,
                onePlayer: null,
                error,
                message: error.response.data.message
            })

            throw error
        }
    },

    deleteOnePlayer: async (id) => {
        try {
            return await deleteOne(id)
        } catch (error) {
            set({
                allPlayers: null,
                onePlayer: null,
                error,
                message: error.response.data.message
            })

            throw error
        }
    },

    deleteAllPlayer: async () => {
        try {
            return await deleteAll()
        } catch (error) {
            set({
                allPlayers: null,
                onePlayer: null,
                error,
                message: error.response.data.message
            })
        }
    }
}));