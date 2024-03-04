import {create} from 'zustand';
import {
    createNews,
    deleteAllNews,
    deleteOneNews,
    getAllNews,
    getOneNews,
    updateNews
} from "../http/newsApi";

export const useNews = create((set) => ({
    news: null,
    oneNews: null,
    error: null,
    message: null,

    getAllNews: async () => {
        try {
            const data = await getAllNews()
            set({
                news: data
            })

            return data
        } catch (error) {
            set({
                news: null,
                error,
                message: error.response.data.message
            });
        }
    },

    getOneNews: async (id) => {
        try {
            const data = await getOneNews(id)
            set({
                oneNews: data
            })

            return data
        } catch (error) {
            set({
                oneNews: null,
                error,
                message: error.response.data.message
            });
        }
    },

    createNews: async (news) => {
        try {
            const data = await createNews(news)
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
            });

            throw error
        }
    },

    updateNews: async (id, news) => {
        try {
            const data = await updateNews(id, news)
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
            });

            throw error
        }
    },

    deleteOneNews: async (id) => {
        try {
            return await deleteOneNews(id)
        } catch (error) {
            set({
                news: null,
                oneNews: null,
                error,
                message: error.response.data.message
            });
        }
    },

    deleteAllNews: async () => {
        try {
            return await deleteAllNews()
        } catch (error) {
            set({
                news: null,
                oneNews: null,
                error,
                message: error.response.data.message
            });
        }
    }
}));