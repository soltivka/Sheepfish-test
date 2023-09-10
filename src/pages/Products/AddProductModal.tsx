import React, {useState} from "react";
import {object, string, number, date, InferType} from 'yup';
import SfModal, {SfModalProps} from "../../components/SfModal/SfModal";
import {
    Formik,
    Form,
    Field,
} from 'formik';
import {Product, ProductSchema} from "../../models/product";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {fetchData} from "../../redux/productsSlice";

interface AddProductModalProps extends Omit<SfModalProps, 'header' | 'handleSave'> {
}

function AddProductModal(props: AddProductModalProps) {
    const {show, handleClose} = props
    const store = useAppSelector(state=>state.products)
    const data = store.list
    const handleSave = () => {
        //todo save newProduct to redux
    }
    const dispatch = useAppDispatch()
    const productsState = useAppSelector((state) => state.products)
    const initialValues: Product = {
        "id": 0,
        "title": '',
        "description": '',
        "price": 0,
        "discountPercentage": 0,
        "rating": 0,
        "stock": 0,
        "brand": '',
        "category": '',
        "thumbnail": '',
        "images": [],
    }

    return (
        <SfModal show={show}
                 header={'Adding new product'}
                 handleClose={handleClose}
                 handleSave={handleSave}
        >

            <Formik
                validationSchema={ProductSchema}
                initialValues={initialValues}
                onSubmit={(values, actions) => {

                }}
            >
                {({
                      values,
                      errors,
                      touched,
                      handleChange,
                      handleBlur,
                      handleSubmit,
                      isSubmitting
                  }) => (
                    <Form>
                        <label htmlFor="title">Title</label>
                        <Field id="title" name="title"/>
                        {errors.title && touched.title && errors.title}

                        <label htmlFor="description">Description</label>
                        <Field id="description" name="description"/>
                        {errors.description && touched.description && errors.description}

                        <label htmlFor="price">Price</label>
                        <Field id="price" name="price"/>
                        {errors.price && touched.price && errors.price}

                        <label htmlFor="brand">Brand</label>
                        <Field id="brand" name="brand"/>
                        {errors.brand && touched.brand && errors.brand}

                        <label htmlFor="stock">Stock</label>
                        <Field id="stock" name="stock"/>
                        {errors.stock && touched.stock && errors.stock}

                        <button type={'submit'} onClick={()=>{
                        }}>ok</button>
                    </Form>
                )}
            </Formik>

        </SfModal>
    );
}

export default AddProductModal;
