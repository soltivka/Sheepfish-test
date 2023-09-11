import axios from "axios";
import {Product} from "../models/product";

const HOST = process.env.REACT_APP_HOST;

export const fetchProducts = async (limit: number = 0) => {
    const response = await axios.get(`${HOST}/products`, {params: {limit}});
    return response.data
}

export const searchProducts = async (q: string, limit: number = 0) => {
    const response = await axios.get(`${HOST}/products/search`, {params: {q}});
    return response.data
}

export const postProduct = async (product: Product) => {
    const response = await axios.post(`${HOST}/products/add`, product)
    return response.data
}
