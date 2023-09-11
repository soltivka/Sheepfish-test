import React, {ReactElement, ReactNode, useEffect, useState} from "react";
import _ from "lodash";
import {Product} from "../../models/product";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {deleteProduct, fetchData, productSelectors, searchData, setSortSettings} from "../../redux/productsSlice";
import {Carousel, Container, Form, InputGroup, Spinner} from "react-bootstrap";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";
import s from './Products.module.css';
import Button from "react-bootstrap/Button";
import {Trash} from "react-bootstrap-icons";
import SfModal from "../../components/SfModal/SfModal";

export type ColumnDefinitionType<T, K extends keyof T | string> = {
    key: K;
    header: string;
    onClick?: (e: React.SyntheticEvent) => void
    width?: number;
    type?: 'text' | 'image' | 'delete',
    content?: ReactElement
}

const Products = () => {
    const dispatch = useAppDispatch()
    const products = useAppSelector(state => state.products)
    const [showCarousel, setShowCarousel] = useState<string[]>([])
    const [showDeleteModal, setShowDeleteModal] = useState<number>(0)
    const deletedList = useAppSelector((state) => state.products.deletedList)
    const data = useAppSelector(rootState => {
        const state = rootState.products
        const entities = productSelectors.selectAll(rootState).filter(product => !deletedList.includes(product.id))
        const sorted = _.sortBy(entities, [state.sortBy, 'id'])
        if (!products.sortAsc) {
            return sorted.reverse()
        }
        return sorted
    })
    useEffect(() => {
        dispatch(fetchData({
            url: `/products?limit=0`,
            method: 'get',
        }))

    }, [])

    const columns: ColumnDefinitionType<Product, keyof Product | string>[] = [
        {
            key: 'id',
            type: 'text',
            header: 'id',
            width: 10,
            onClick: () => dispatch(setSortSettings('id')),
        },
        {
            key: 'category',
            type: 'text',
            width: 5,
            header: 'category',
            onClick: () => dispatch(setSortSettings('category')),
        },
        {
            key: 'brand',
            type: 'text',
            width: 5,
            header: 'brand',
            onClick: () => dispatch(setSortSettings('brand')),
        },
        {
            key: 'title',
            type: 'text',
            width: 5,
            header: 'title',
            onClick: () => dispatch(setSortSettings('title')),
        },
        {
            key: 'description',
            type: 'text',
            header: 'description',
            width: 100,
        },
        {
            key: 'price',
            type: 'text',
            header: '$',
            width: 5,
            onClick: () => dispatch(setSortSettings('price')),
        },
        {
            key: 'discountPercentage',
            header: 'discount, %',
            type: 'text',
            width: 5,
            onClick: () => dispatch(setSortSettings('discountPercentage')),
        },
        {
            key: 'rating',
            header: 'rating',
            type: 'text',
            width: 5,
            onClick: () => dispatch(setSortSettings('rating')),
        },
        {
            key: 'stock',
            header: 'stock',
            type: 'text',
            width: 5,
            onClick: () => dispatch(setSortSettings('stock')),
        },
        {
            key: 'deleteProduct',
            header: '',
            type: 'delete',
            width: 5,
        },
    ]


    const onSearchInput = (value: string) => {
        const url = 'search?q=' + value
        dispatch(searchData({
            url: `/products/${url}`,
            method: 'get',
        }))

    }

    return (
        <>
            <Container >
                <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon1">Search</InputGroup.Text>
                    <Form.Control onChange={(e) => {
                        onSearchInput(e.target.value)
                    }}/>
                </InputGroup>
                <Container className={s.scrollContainer}>
                    <Table striped bordered hover variant="dark" >
                        <thead>
                        <tr>{columns.map((el, i, arr) => {
                            return (
                                <th key={el.key}
                                    onClick={el.onClick}
                                    style={{
                                        width: (el.width ?? 100) + 'px',
                                        cursor: el.onClick ? 'pointer' : 'auto',
                                        position: 'sticky',
                                        top: 0,
                                    }}>
                                    {el.header}
                                </th>)
                        })}</tr>
                        </thead>
                        <tbody>
                        {data.map((row, index) => {
                            return (
                                <tr key={`row-${row.id}`}
                                style={{cursor:row.images.length>0?'pointer':'auto'}}
                                onClick={() => setShowCarousel(row.images)}
                                >
                                    {columns.map((column, index2) => {
                                            if (column.type === 'text') {
                                                return (
                                                    <td key={`${column.key}-${row.id}`}>
                                                        {row[column.key as keyof Product] as ReactNode}
                                                    </td>
                                                );
                                            }

                                            if (column.type === 'delete') {
                                                return (
                                                    <td key={`${column.key}-${row.id}`}
                                                        onClick={(e) => {
                                                            e.stopPropagation()
                                                            setShowDeleteModal(row.id)
                                                        }}>
                                                        <Button variant="outline-secondary"> <Trash/> </Button>
                                                    </td>
                                                );
                                            }

                                        }
                                    )}
                                </tr>
                            )
                        })}
                        </tbody>
                    </Table>
                </Container>

                {products.loading ? <Spinner animation="border"/> : null}
                <Modal show={showCarousel.length > 0}
                       onHide={() => setShowCarousel([])}>
                    <Carousel className={s.carousel}>
                        {
                            showCarousel.map((el, i) => {
                                return (
                                    <Carousel.Item interval={30000} className={s.carouselItem}>
                                        <img className={s.image}
                                             src={showCarousel[i]} alt={`product image ${i}`}></img>
                                    </Carousel.Item>
                                )
                            })
                        }
                    </Carousel>
                </Modal>
                <SfModal show={Boolean(showDeleteModal)}
                         header={'Deleting product'}
                         saveButtonText={'Delete'}
                         handleSave={() => {
                             dispatch(deleteProduct(showDeleteModal))
                             setShowDeleteModal(0)
                         }}
                         handleClose={() => {
                             setShowDeleteModal(0)
                         }}>
                    <p>Are you sure you want to delete this product?</p>
                </SfModal>
            </Container>
        </>

    );
};

export default Products;