import {create} from 'zustand';
import {createGallery, deleteAllGallery, deleteOneGallery, getAllGallery, getOneGallery} from "../http/galleryApi";

export const useGallery = create((set) => ({
    gallery: null,
    oneGallery: null,
    error: null,
    message: null,

    getAllGallery: async () => {
        try {
            const data = await getAllGallery()
            set({
                gallery: data
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

    getOneGallery: async (id) => {
        try {
            const data = await getOneGallery(id)
            set({
                oneGallery: data
            })

            return data
        } catch (error) {
            set({
                oneGallery: null,
                error,
                message: error.response.data.message
            });
        }
    },

    createGallery: async (gallery) => {
        try {
            const data = await createGallery(gallery)
            set({
                oneGallery: data
            })

            return data
        } catch (error) {
            set({
                gallery: null,
                oneGallery: null,
                error,
                message: error.response.data.message
            });

            throw error
        }
    },

    deleteOneGallery: async (id) => {
        try {
            return await deleteOneGallery(id)
        } catch (error) {
            set({
                gallery: null,
                oneGallery: null,
                error,
                message: error.response.data.message
            });

            throw error
        }
    },

    deleteAllGallery: async () => {
        try {
            return await deleteAllGallery()
        } catch (error) {
            set({
                gallery: null,
                oneGallery: null,
                error,
                message: error.response.data.message
            });
        }
    }
}));