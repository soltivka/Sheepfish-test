import SfTable, {ColumnDefinitionType} from "../../components/SfTable/SfTable";
import dummyData from "./dummyData";
import {useState} from "react";
import _ from "lodash";
import {Product} from "../../models/product";





const ProductsTable = () => {
    const [data, setData] = useState(dummyData)
    const sort = function(property:string){
        const sortedData = _.sortBy(data, [property, 'id'])
        setData(sortedData)
    }

    const columns: ColumnDefinitionType<Product, keyof Product>[] = [
        {
            key: 'id',
            header: 'id',
            width: 150,
            onClick: ()=>sort('id'),
        },
        {
            key: 'title',
            header: 'title',
            onClick: ()=>sort('title'),
        },
        {
            key: 'description',
            header: 'description',
            onClick: ()=>sort('description'),
        },
        {
            key: 'price',
            header: '$',
            width: 150,
            onClick: ()=>sort('price'),
        },
        {
            key: 'discountPercentage',
            header: 'discount, %',
            onClick: ()=>sort('discountPercentage'),
        },
        {
            key: 'rating',
            header: 'rating',
            onClick: ()=>sort('rating'),
        },
        {
            key: 'stock',
            header: 'stock',
            width: 150,
            onClick: ()=>sort('stock'),
        },
        {
            key: 'brand',
            header: 'brand',
            onClick: ()=>sort('brand'),
        },
        {
            key: 'category',
            header: 'category',
            onClick: ()=>sort('category'),
        }
    ]
    return (
        <>
            <SfTable data={data} columns={columns}/>
        </>

    );
};

export default ProductsTable;