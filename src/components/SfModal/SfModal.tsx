import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {ModalProps} from "react-bootstrap";

export interface SfModalProps extends ModalProps {
    show: boolean
    handleClose: () => void
    handleSave?: () => void
    closeButtonText?:string
    saveButtonText?:string
    header?: string
}

function SfModal(props: SfModalProps) {
    const {show, handleClose, handleSave, header, closeButtonText, saveButtonText} = props

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{header}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{props.children}</Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-danger" onClick={handleClose}>{closeButtonText||'Close'}</Button>{' '}
                    {handleSave ?
                        <Button variant="primary" onClick={handleSave}>
                            {saveButtonText || 'Save'}
                        </Button> :
                        null}
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default SfModal;