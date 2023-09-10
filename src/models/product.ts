import {array, bool, date, InferType, number, object, string} from "yup";

export const ProductSchema = object({
    "id": number().required().min(0).integer(),
    "title": string().min(1).max(100).required(),
    "description": string().nullable(),
    "price": number().required().positive(),
    "discountPercentage": number(),
    "rating": number().min(0).max(5),
    "stock": number().required().positive(),
    "brand": string().min(3).required(),
    "category": string(),
    "thumbnail": string().url(),
    "images": array().of(string().url().defined()).defined(),
    'isDeleted': bool()
});


export type Product = InferType<typeof ProductSchema>;