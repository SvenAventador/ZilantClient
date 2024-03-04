const {
    $host
} = require('./index')

export const getAllGallery = async () => {
    const {data} = await $host.get('api/gallery/getAllGallery')
    return data
}

export const getOneGallery = async (id) => {
    const {data} = await $host.get(`api/gallery/getOneGallery?id=${id}`)
    return data
}

export const createGallery = async (gallery) => {
    const {data} = await $host.post('api/gallery/createGallery', gallery)
    return data
}

export const deleteOneGallery = async (id) => {
    const {data} = await $host.delete(`api/gallery/deleteOneGallery?id=${id}`)
    return data
}

export const deleteAllGallery = async () => {
    const {data} = await $host.delete(`api/gallery/deleteAllGallery`)
    return data
}
