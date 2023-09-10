import axios from "axios";

export type RequestDataType = {
    url: string,
    data?: any,
    method: 'get' | 'post' | 'put' | 'delete'
}

export const request = async (requestData: RequestDataType) => {
    const response = await axios[requestData.method]('https://dummyjson.com' + requestData.url)
    return response.data
}

