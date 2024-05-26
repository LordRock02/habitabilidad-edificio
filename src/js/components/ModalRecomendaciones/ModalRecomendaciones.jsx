import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './ModalRecomendaciones.css'
import { useRef, useState } from 'react';
import { useEdificio} from '../../utils/global.context';
import Espacio from '../../models/espacio';
import Persona from '../../models/persona';
import Edificio from '../../models/edificio';

const recomendaciones = {
    1: "encender aire acondicionado",
    2: "cerrar persianas",
    3: "cambie de espacio",
    4: "Apague los electrodomesticos que no esten en uso"
}

const ModalRecomendaciones = ({ setShowModalRecomendaciones }) => {
    const inputEspacio = useRef(null)
    const edificio = useEdificio()
    const listaEspacios = edificio.getListaLocales()


    const handleSubmit = () => {
        let idEspacio = inputEspacio.current.value
        let espacio = edificio.buscarEspacio(idEspacio)
        if (espacio instanceof Espacio) {
            if (espacio.habitabilidad == 2){
                alert(`recomendacion ${recomendaciones[espacio._recomendacion]}`)
            }
            if (espacio.habitabilidad == 3){
                alert("SE RECOMIENDA CAMBIAR DE ESPACIO")
            }
        }
    }

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
                <div className='containerEspacio'>
                    <div>
                        <label htmlFor="espacio">Espacio</label>
                        <input name="espacio" type="text" ref={inputEspacio} placeholder="ingrese el Espacio" />
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => { handleSubmit(); setShowModalRecomendaciones(false) }}>listo</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalRecomendaciones