import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './ModalActividadRandom.css'
import { useRef, useState } from 'react';
import { useAmbiente, useEdificio } from '../../utils/global.context';
import Edificio from '../../models/edificio';
import generarActividadesAleatorias from '../../../main';

const ModalActividadRandom = ({ setShowModalActividadRandom, setReload }) => {
    const [cantidad, setCantidad] = useState(15)
    const edificio = useEdificio()
    const handleSubmit = () =>{
        if(edificio instanceof Edificio){
            generarActividadesAleatorias(edificio, cantidad)
        }
        setReload(true)
    }
    return (
        <Modal
            show={true}
            onHide={() => setShowModalActividadRandom(false)}
            dialogClassName="custom-modal-size"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    # Actividades: 
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="containerAmbiente">
                    <div>
                        <label htmlFor="Actividades">cantidad</label>
                        <input
                            type="number"
                            id="ctdadActividades"
                            name="Actividades"
                            min="1"
                            max="64"
                            step="1"
                            value={cantidad}
                            onChange={(event) => {
                                setCantidad(event.target.value);
                            }}
                        />
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => { handleSubmit(); setShowModalActividadRandom(false) }}>Listo</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalActividadRandom