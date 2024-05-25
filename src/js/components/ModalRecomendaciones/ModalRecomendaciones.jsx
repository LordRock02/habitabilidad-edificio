import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './ModalRecomendaciones.css'

const ModalRecomendaciones = ({ setShowModalRecomendaciones }) => {
    return (
        <Modal
            show={true}
            onHide={() => setShowModalRecomendaciones(false)}
            dialogClassName="custom-modal-size"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Recomendaciones
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4>Agregar Recomendaciones</h4>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => { setShowModalRecomendaciones(false) }}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalRecomendaciones