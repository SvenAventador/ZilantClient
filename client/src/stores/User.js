import {create} from 'zustand'
import {
    auth,
    login,
    logout,
    registration
} from '../http/auth'
import {edit} from "../http/personal"

export const useUser = create((set) => ({
        user: null,
        isAuth: false,
        error: null,
        message: null,

        registrationUser: async (
            user
        ) => {
            try {
                const data = await registration(user);
                set({
                    user: data,
                    isAuth: true,
                    error: null,
                    message: null
                })

                return data
            } catch (error) {
                set({
                    user: null,
                    isAuth: false,
                    error: error.response.data.message,
                    message: null
                })

                throw error
            }
        },

        loginUser: async (user) => {
            try {
                const data = await login(user);
                set({
                    user: data,
                    isAuth: true,
                    error: null,
                    message: null
                })

                return data
            } catch (error) {
                set({
                    user: null,
                    isAuth: false,
                    error: error.response.data.message,
                    message: null
                })

                throw error
            }
        },

        checkUser: async () => {
            try {
                const data = await auth();
                set({
                    user: data,
                    isAuth: true,
                    error: null,
                    message: null
                })

                return data;
            } catch (error) {

                set({
                    user: null,
                    isAuth: false,
                    error,
                    message: error.response.data.message
                })
            }
        },

        logoutUser: async () => {
            try {
                await logout();
                set({
                    user: null,
                    isAuth: false,
                    error: null,
                    message: null
                })
            } catch (error) {
                set({
                    user: null,
                    isAuth: false,
                    error,
                    message: error.message
                })
            }
        },

        updateUser: async (id, user) => {
            try {
                const data = await edit(id, user)
                set({
                    user: data,
                    isAuth: true,
                    error: null,
                    message: null
                })

                return data
            } catch (error) {
                set({
                    isAuth: true,
                    error: error.response.data.message,
                    message: null
                })

                throw error
            }
        },
    })
)