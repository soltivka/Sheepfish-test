import React, {useState} from "react";
import ProductsTable from "./ProductsTable";
import Button from "react-bootstrap/Button";
import {PlusLg} from "react-bootstrap-icons";
import CreateProduct from "../CreateProduct/CreateProduct";

function Products() {
    return (
        <div>
            <ProductsTable/>
        </div>
    );
}

export default Products;
