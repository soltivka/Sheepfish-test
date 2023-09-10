import React from "react";
import {SfModalProps} from "../../components/SfModal/SfModal";
import {
    Formik,
} from 'formik';
import {Product, ProductSchema} from "../../models/product";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {Col, Container, Form, Row} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import FormField from "../../components/FormField/FormField";

interface AddProductModalProps extends Omit<SfModalProps, 'header' | 'handleSave'> {}

function CreateProduct(props: AddProductModalProps) {
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
        <Container className="mt-3">
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
                  }) => {
                    debugger;
                    return (
                      <Form noValidate onSubmit={handleSubmit}>
                          <Row className="mb-3">
                              <Col md={5}>
                                  <FormField
                                    controlId="title"
                                    label="Title"
                                    type="text"
                                    name="title"
                                  />
                              </Col>
                              <Col md={2}>
                                  <FormField
                                    controlId="price"
                                    label="Price"
                                    type="number"
                                    name="price"
                                  />
                              </Col>
                              <Col md={2}>
                                  <FormField
                                    controlId="stock"
                                    label="Stock"
                                    type="number"
                                    name="stock"
                                  />
                              </Col>
                              <Col md={3}>
                                  <FormField
                                    controlId="brand"
                                    label="Brand"
                                    type="text"
                                    name="brand"
                                  />
                              </Col>
                          </Row>
                          <Row className="mb-3">
                              <Col>
                                  <FormField
                                    controlId="description"
                                    label="Description"
                                    type="text"
                                    name="description"
                                  />
                              </Col>
                          </Row>
                          <Button className="mb-3" variant="primary" type="submit">
                              Submit
                          </Button>
                      </Form>
                    )
                }}
            </Formik>

        </Container>
    );
}

export default CreateProduct;
