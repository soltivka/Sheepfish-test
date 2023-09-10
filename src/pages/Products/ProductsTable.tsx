import SfTable, {ColumnDefinitionType} from "../../components/SfTable/SfTable";
import {useEffect, useState} from "react";
import _ from "lodash";
import {Product} from "../../models/product";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {fetchData} from "../../redux/productsSlice";
import {Spinner} from "react-bootstrap";
import {useNavigate, useNavigation, useParams} from "react-router";
import {useLocation, useSearchParams} from "react-router-dom";


const ProductsTable = () => {
    const rows = 5
    const dispatch = useAppDispatch()
    const products = useAppSelector(state => state.products)
    const navigate = useNavigate()
    const search = useLocation().search;
    const currentPage = Number(new URLSearchParams(search).get("page")) || 0;
    const sort = function (property: string) {
        // const sortedData = _.sortBy(data, [property, 'id'])
        //  setData(sortedData)
    }
    useEffect(() => {
        dispatch(fetchData({
            url: `/products?limit=${currentPage*rows}&skip=${data.length}`,
            method: 'get',
        }))
    }, [currentPage])

    const columns: ColumnDefinitionType<Product, keyof Product>[] = [
        {
            key: 'id',
            header: 'id',
            width: 20,
            onClick: () => sort('id'),
        },
        {
            key: 'category',
            header: 'category',
            onClick: () => sort('category'),
        },
        {
            key: 'brand',
            header: 'brand',
            onClick: () => sort('brand'),
        },
        {
            key: 'title',
            header: 'title',
            onClick: () => sort('title'),
        },
        {
            key: 'description',
            header: 'description',
            width: 300,
            onClick: () => sort('description'),
        },
        {
            key: 'price',
            header: '$',
            width: 30,
            onClick: () => sort('price'),
        },
        {
            key: 'discountPercentage',
            header: 'discount, %',
            width: 40,
            onClick: () => sort('discountPercentage'),
        },
        {
            key: 'rating',
            header: 'rating',
            width: 40,
            onClick: () => sort('rating'),
        },
        {
            key: 'stock',
            header: 'stock',
            width: 40,
            onClick: () => sort('stock'),
        },
    ]
    const data = Object.values((products.list.entities as unknown) as { [key: string]: Product }).filter(el => !el.isDeleted)

    return (
        <>
            <SfTable data={data} columns={columns} rows={rows} maxPage={products.total / rows}
                     onPageChanged={(n) => navigate('?page=' + n)}
            />
            {products.loading ? <Spinner animation="border"/> : null}
        </>

    );
};

export default ProductsTable;