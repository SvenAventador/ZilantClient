import {create as zustandCreate} from 'zustand';
import {
    create,
    deleteAll,
    deleteOne,
    getAll,
    getOne,
    edit
} from "../http/news";

export const useNews = zustandCreate((set) => ({
    news: null,
    oneNews: null,
    error: null,
    message: null,

    getAllNews: async () => {
        try {
            const data = await getAll()

            set({
                news: data
            })

            return data
        } catch (error) {
            set({
                news: null,
                error,
                message: error.response.data.message
            })
        }
    },

    getOneNews: async (id) => {
        try {
            const data = await getOne(id)

            set({
                oneNews: data
            })

            return data
        } catch (error) {
            set({
                oneNews: null,
                error,
                message: error.response.data.message
            })
        }
    },

    createNews: async (news) => {
        try {
            const data = await create(news)

            set({
                oneNews: data
            })

            return data
        } catch (error) {
            set({
                news: null,
                oneNews: null,
                error,
                message: error.response.data.message
            })

            throw error
        }
    },

    updateNews: async (id, news) => {
        try {
            const data = await edit(id, news)

            set({
                oneNews: data
            })

            return data
        } catch (error) {
            set({
                news: null,
                oneNews: null,
                error,
                message: error.response.data.message
            })

            throw error
        }
    },

    deleteOneNews: async (id) => {
        try {
            return await deleteOne(id)
        } catch (error) {
            set({
                news: null,
                oneNews: null,
                error,
                message: error.response.data.message
            })
        }
    },

    deleteAllNews: async () => {
        try {
            return await deleteAll()
        } catch (error) {
            set({
                news: null,
                oneNews: null,
                error,
                message: error.response.data.message
            })
        }
    }
}));