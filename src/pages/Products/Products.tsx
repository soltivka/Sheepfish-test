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
import {ArrowRight, Trash} from "react-bootstrap-icons";

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
    const deletedList = useAppSelector((state) => state.products.deletedList)
    console.log(deletedList)
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
            key: 'images',
            type: 'image',
            header: '',
            width: 100,
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
            <Container>
                <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon1">Search</InputGroup.Text>
                    <Form.Control onChange={(e) => {
                        onSearchInput(e.target.value)
                    }}/>
                </InputGroup>

                <Table striped bordered hover variant="dark">
                    <thead>
                    <tr>{columns.map((el, i, arr) => {
                        return (
                            <th key={el.key}
                                onClick={el.onClick}
                                style={{
                                    width: (el.width ?? 100) + 'px',
                                    cursor: el.onClick ? 'pointer' : ''
                                }}>
                                {el.header}
                            </th>)
                    })}</tr>
                    </thead>
                    <tbody>
                    {data.map((row, index) => {
                        return (
                            <tr key={`row-${row.id}`}>
                                {columns.map((column, index2) => {
                                        if (column.type === 'text') {
                                            return (
                                                <td key={`${column.key}-${row.id}`}>
                                                    {row[column.key as keyof Product] as ReactNode}
                                                </td>
                                            );
                                        }
                                        if (column.type === 'image') {
                                            return (
                                                <td key={`${column.key}-${row.id}`}
                                                    onClick={() => setShowCarousel(row.images)}>
                                                    <img src={`${row.images[0]}`} alt="product image"
                                                         style={{
                                                             width: '100%',
                                                             cursor: 'pointer',
                                                         }}
                                                    />
                                                </td>
                                            );
                                        }

                                        if (column.type === 'delete') {
                                            return (
                                                <td key={`${column.key}-${row.id}`}
                                                    onClick={() => dispatch(deleteProduct(row.id))}>
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
            </Container>
        </>

    );
};

export default Products;