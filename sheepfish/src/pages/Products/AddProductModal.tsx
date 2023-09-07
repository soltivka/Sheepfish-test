import React, {useState} from "react";

import SfModal, {SfModalProps} from "../../components/SfModal/SfModal";
import {
    Formik,
    FormikHelpers,
    FormikProps,
    Form,
    Field,
    FieldProps,
} from 'formik';

interface AddProductValues {
    "title": string,
    "description": string,
    "price": number|null,
    "discountPercentage": number|null,
    "rating": number|null,
    "stock": number|null,
    "brand": string,
    "category": string,
    "thumbnail": string,
    "images": Array<string>
}

interface AddProductModalProps extends Omit<SfModalProps, 'header' | 'handleSave'> {
}

function AddProductModal(props: AddProductModalProps) {
    const {show, handleClose} = props
    const handleSave = () => {
        //todo save newProduct to redux
    }
    const initialValues: AddProductValues = {
        "title": '',
        "description":'' ,
        "price":null ,
        "discountPercentage":null,
        "rating": null,
        "stock": null,
        "brand":'' ,
        "category":'' ,
        "thumbnail": '',
        "images": []
    }


    return (
        <SfModal show={show}
                 header={'Adding new product'}
                 handleClose={handleClose}
                 handleSave={handleSave}
        >

            <Formik
                initialValues={initialValues}
                onSubmit={(values, actions) => {
                    console.log({values, actions});
                    alert(JSON.stringify(values, null, 2));
                    actions.setSubmitting(false);
                }}
            >
                <Form>
                    <label htmlFor="title">Title</label>
                    <Field id="title" name="title"/>

                    <label htmlFor="description">Description</label>
                    <Field id="description" name="description"/>

                    <label htmlFor="price">Price</label>
                    <Field id="price" name="price" />

                    <label htmlFor="brand">Brand</label>
                    <Field id="brand" name="brand" />

                    <label htmlFor="category">Category</label>
                    <Field id="category" name="category" />

                    <label htmlFor="title">Title</label>
                    <Field id="title" name="title" />

                    <label htmlFor="title">Title</label>
                    <Field id="title" name="title" />
                </Form>
            </Formik>

        </SfModal>
    );
}

export default AddProductModal;
