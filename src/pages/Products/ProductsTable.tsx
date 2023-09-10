import SfTable, {ColumnDefinitionType} from "../../components/SfTable/SfTable";
import {useEffect, useRef, useState} from "react";
import _ from "lodash";
import {Product} from "../../models/product";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {fetchData, searchData} from "../../redux/productsSlice";
import {Container, InputGroup, Spinner} from "react-bootstrap";
import {useNavigate, useNavigation, useParams} from "react-router";
import {useLocation, useSearchParams} from "react-router-dom";
import { Form } from "react-bootstrap";


const ProductsTable = () => {
    const rows = 50
    const dispatch = useAppDispatch()
    const products = useAppSelector(state => state.products)
    const navigate = useNavigate()
    const search = useLocation().search;
    const currentPage = Number(new URLSearchParams(search).get("page")) || 0;
    const uploadedPages = useRef(0)
    const sort = function (property: string) {
        // const sortedData = _.sortBy(data, [property, 'id'])
        //  setData(sortedData)
    }
    useEffect(() => {
        if (currentPage > uploadedPages.current || currentPage === 0) {
            uploadedPages.current = currentPage
            dispatch(fetchData({
                url: `/products?limit=${currentPage * rows}&skip=${data.length}`,
                method: 'get',
            }))
        }
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
  const data = Object.values((products.list.entities as unknown) as {
    [key: string]: Product
  }).filter(el => !el.isDeleted)

    const onSearchInput = (value:string)=>{
        const url = 'search?q='+value
        dispatch(searchData({
            url: `/products/${url}`,
            method: 'get',
        }))

    }

    return (
        <><Container>
            <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1">Search</InputGroup.Text>
                <Form.Control onChange={(e)=>{
                    console.log(e.target.value)
                    onSearchInput(e.target.value)
                }}/>
            </InputGroup>
            <SfTable data={data} columns={columns} rows={rows} maxPage={products.total / rows}
                     onPageChanged={(n) => navigate('?page=' + n)}
            />
            {products.loading ? <Spinner animation="border"/> : null}
        </Container></>

  );
};

export default ProductsTable;
