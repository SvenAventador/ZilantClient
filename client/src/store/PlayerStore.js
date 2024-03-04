import {create} from 'zustand';
import {
    createPlayer,
    deleteAllPlayer,
    deleteOnePlayer,
    getAllPlayer,
    getOnePlayer,
    updatePlayer
} from "../http/playerApi";

export const usePlayer = create((set) => ({
    player: null,
    onePlayer: null,
    error: null,
    message: null,

    getAllPlayer: async () => {
        try {
            const data = await getAllPlayer()
            set({
                player: data
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

    getOnePlayer: async (id) => {
        try {
            const data = await getOnePlayer(id)
            set({
                onePlayer: data
            })

            return data
        } catch (error) {
            set({
                onePlayer: null,
                error,
                message: error.response.data.message
            });
        }
    },

    createPlayer: async (player) => {
        try {
            const data = await createPlayer(player)
            set({
                onePlayer: data
            })

            return data
        } catch (error) {
            set({
                player: null,
                onePlayer: null,
                error,
                message: error.response.data.message
            });

            throw error
        }
    },

    updatePlayer: async (id, player) => {
        try {
            const data = await updatePlayer(id, player)
            set({
                onePlayer: data
            })

            return data
        } catch (error) {
            set({
                player: null,
                onePlayer: null,
                error,
                message: error.response.data.message
            });

            throw error
        }
    },

    deleteOnePlayer: async (id) => {
        try {
            return await deleteOnePlayer(id)
        } catch (error) {
            set({
                player: null,
                onePlayer: null,
                error,
                message: error.response.data.message
            });

            throw error
        }
    },

    deleteAllPlayer: async () => {
        try {
            return await deleteAllPlayer()
        } catch (error) {
            set({
                player: null,
                onePlayer: null,
                error,
                message: error.response.data.message
            });
        }
    }
}));