import React, {useState} from "react";
import ProductsTable from "./ProductsTable";
import Button from "react-bootstrap/Button";
import {PlusLg} from "react-bootstrap-icons";
import AddProductModal from "./AddProductModal";

function Products() {
    const [modalShow, setModalShow] = useState(false)
    return (
        <div>
            <ProductsTable/>
            <Button type="button" className="btn btn-default btn-lg"
                    onClick={() => {
                        setModalShow(true)
                    }}
            >
                <PlusLg/>
            </Button>
            <AddProductModal show={modalShow}
                     handleClose={() => setModalShow(false)}>
            </AddProductModal>
        </div>
    );
}

export default Products;
