import SfTable, {ColumnDefinitionType} from "../../components/SfTable/SfTable";
import {useEffect} from "react";
import _ from "lodash";
import {Product} from "../../models/product";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {fetchData, productSelectors, searchData, setSortSettings} from "../../redux/productsSlice";
import {Container, Form, InputGroup, Spinner} from "react-bootstrap";


const ProductsTable = () => {
    const dispatch = useAppDispatch()
    const products = useAppSelector(state => state.products)
    console.log(products.sortBy, products.sortAsc)
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
            header: 'id',
            width: 20,
            onClick: () => dispatch(setSortSettings('id')),
        },
        {
            key: 'category',
            header: 'category',
            onClick: () => dispatch(setSortSettings('category')),
        },
        {
            key: 'brand',
            header: 'brand',
            onClick: () => dispatch(setSortSettings('brand')),
        },
        {
            key: 'title',
            header: 'title',
            onClick: () => dispatch(setSortSettings('title')),
        },
        {
            key: 'description',
            header: 'description',
            width: 300,
        },
        {
            key: 'price',
            header: '$',
            width: 30,
            onClick: () => dispatch(setSortSettings('price')),
        },
        {
            key: 'discountPercentage',
            header: 'discount, %',
            width: 40,
            onClick: () => dispatch(setSortSettings('discountPercentage')),
        },
        {
            key: 'rating',
            header: 'rating',
            width: 40,
            onClick: () => dispatch(setSortSettings('rating')),
        },
        {
            key: 'stock',
            header: 'stock',
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
                <SfTable data={data} columns={columns}/>
                {products.loading ? <Spinner animation="border"/> : null}
            </Container>
        </>

    );
};

export default ProductsTable;