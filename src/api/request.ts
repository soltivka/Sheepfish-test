import axios from "axios";
import {Product} from "../models/product";

export type RequestDataType = {
    url: string,
    data?: any,
    method: 'get' | 'post' | 'put' | 'delete'
}

const HOST = 'https://dummyjson.com';

export const request = async (requestData: RequestDataType) => {
    const response = await axios[requestData.method](HOST + requestData.url)
    return response.data
}

export const postProduct = async (product: Product) => {
    const response = await axios.post(`${HOST}/products/add`, product)
    return response.data
}
