/* eslint-disable import/no-anonymous-default-export */
import Axios from 'axios'
const API_BASE_URL = process.env.REACT_APP_BASE_URL_PRODUCT
const API_BASE_URL_AUTH = process.env.REACT_APP_BASE_URL_AUTH

export default {
    get: async (url) => {
        const promiseResult = await Axios.get(API_BASE_URL + url)
        return promiseResult ? promiseResult.data : []
    },

    delete: async (url) => {
        const promiseResult = await Axios.delete(API_BASE_URL + url)
        return promiseResult ? promiseResult.data : []
    },

    insert: async (url) => {
        const promiseResult = await Axios.post(API_BASE_URL + url)
        return promiseResult ? promiseResult.data : []
    },

    update: async (url) => {
        const promiseResult = await Axios.put(API_BASE_URL + url)
        return promiseResult ? promiseResult.data : []
    },

    register: async (url, value) => {
        const promiseResult = await Axios.post(API_BASE_URL_AUTH + url, value)
        return promiseResult ? promiseResult.data : []
    },
}
