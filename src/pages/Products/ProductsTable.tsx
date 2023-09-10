import SfTable from "../../components/SfTable/SfTable";
import React, {ReactElement, ReactNode, useEffect, useState} from "react";
import _ from "lodash";
import {Product} from "../../models/product";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {fetchData, productSelectors, searchData, setSortSettings} from "../../redux/productsSlice";
import {Carousel, Container, Form, InputGroup, Spinner} from "react-bootstrap";
import TableRows from "../../components/SfTable/SfTableRows";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

export type ColumnDefinitionType<T, K extends keyof T | string> = {
    key: K;
    header: string;
    onClick?: (e: React.SyntheticEvent) => void
    width?: number;
    type?: 'text' | 'image',
    content?: ReactElement
}

const ProductsTable = () => {
    const dispatch = useAppDispatch()
    const products = useAppSelector(state => state.products)
    const [showCarousel, setShowCarousel] = useState<string[]>([])
    const data = useAppSelector(rootState => {
        const state = rootState.products
        const entities = productSelectors.selectAll(rootState)
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

    const columns: ColumnDefinitionType<Product, keyof Product>[] = [
        {
            key: 'id',
            type: 'text',
            header: 'id',
            width: 20,
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
            width: 20,
            header: 'category',
            onClick: () => dispatch(setSortSettings('category')),
        },
        {
            key: 'brand',
            type: 'text',
            width: 20,
            header: 'brand',
            onClick: () => dispatch(setSortSettings('brand')),
        },
        {
            key: 'title',
            type: 'text',
            header: 'title',
            onClick: () => dispatch(setSortSettings('title')),
        },
        {
            key: 'description',
            type: 'text',
            header: 'description',
            width: 300,
        },
        {
            key: 'price',
            type: 'text',
            header: '$',
            width: 30,
            onClick: () => dispatch(setSortSettings('price')),
        },
        {
            key: 'discountPercentage',
            header: 'discount, %',
            type: 'text',
            width: 40,
            onClick: () => dispatch(setSortSettings('discountPercentage')),
        },
        {
            key: 'rating',
            header: 'rating',
            type: 'text',
            width: 40,
            onClick: () => dispatch(setSortSettings('rating')),
        },
        {
            key: 'stock',
            header: 'stock',
            type: 'text',
            width: 40,
            onClick: () => dispatch(setSortSettings('stock')),
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
                                                    {row[column.key] as ReactNode}
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

                                    }
                                )}
                            </tr>
                        )
                    })}
                    </tbody>
                </Table>
                {products.loading ? <Spinner animation="border"/> : null}
                <Modal style={{
                    display:'flex',
                    justifyContent:"center",
                }}
                       show={showCarousel.length > 0} onHide={() => setShowCarousel([])}>
                    <Carousel>
                        {
                            showCarousel.map((el, i) => {
                                return (
                                    <Carousel.Item interval={1000}>
                                        <img src={showCarousel[i]} alt={`product image ${i}`}></img>
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

export default ProductsTable;