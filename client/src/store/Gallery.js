import {create as zustandCreate} from 'zustand';
import {
    create,
    deleteAll,
    deleteOne,
    getAll, getAllWithImages,
    getOne
} from "../http/gallery";

export const useGallery = zustandCreate((set) => ({
    allGallery: null,
    oneGallery: null,
    error: null,
    message: null,

    getAllGallery: async () => {
        try {
            const data = await getAll()

            set({
                allGallery: data
            })

            return data
        } catch (error) {
            set({
                allGallery: null,
                error,
                message: error.response.data.message
            })
        }
    },

    getAllGalleryWithImage: async () => {
        try {
            const data = await getAllWithImages()

            set({
                allGallery: data
            })

            return data
        } catch (error) {
            set({
                allGallery: null,
                error,
                message: error.response.data.message
            })
        }
    },

    getOneGallery: async (id) => {
        try {
            const data = await getOne(id)

            set({
                oneGallery: data
            })

            return data
        } catch (error) {
            set({
                oneGallery: null,
                error,
                message: error.response.data.message
            })
        }
    },

    createGallery: async (gallery) => {
        try {
            const data = await create(gallery)
            set({
                oneGallery: data
            })

            return data
        } catch (error) {
            set({
                allGallery: null,
                oneGallery: null,
                error,
                message: error.response.data.message
            })

            throw error
        }
    },

    deleteOneGallery: async (id) => {
        try {
            return await deleteOne(id)
        } catch (error) {
            set({
                allGallery: null,
                oneGallery: null,
                error,
                message: error.response.data.message
            })

            throw error
        }
    },

    deleteAllGallery: async () => {
        try {
            return await deleteAll()
        } catch (error) {
            set({
                allGallery: null,
                oneGallery: null,
                error,
                message: error.response.data.message
            })
        }
    }
}));