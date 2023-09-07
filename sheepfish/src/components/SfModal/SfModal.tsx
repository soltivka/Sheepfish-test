import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {ModalProps} from "react-bootstrap";

interface FsModalProps extends ModalProps {
    show: boolean
    handleClose: () => void
    handleSave?: () => void
    header?: string
}

function SfModal(props: FsModalProps) {
    const {show, handleClose, handleSave, header} = props

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{header}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{props.children}</Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-danger" onClick={handleClose}>Close</Button>{' '}
                    {handleSave ?
                        <Button variant="primary" onClick={handleSave}>
                            Save
                        </Button> :
                        null}
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default SfModal;