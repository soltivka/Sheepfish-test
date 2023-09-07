import React, {useState} from "react";
import ProductsTable from "./ProductsTable";
import Button from "react-bootstrap/Button";
import {Plus, PlusLg} from "react-bootstrap-icons";
import SfModal from "../../components/SfModal/SfModal";

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
            <SfModal show={modalShow}
                     header={'Adding new product'}
                     handleClose={() => setModalShow(false)}>

            </SfModal>
        </div>
    );
}

export default Products;
