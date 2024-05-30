import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './ModalInfo.css'
import { useRef, useState } from 'react';
import { useAmbiente, useEdificio, useActividades } from '../../utils/global.context';
import Edificio from '../../models/edificio';

const ModalInfo = ({ setShowModalInfo, setReload }) => {
    const {actividades} = useActividades()
    const handleSubmit = () => {
        setReload(true)
    }
    console.log(actividades)
    return (
        <Modal
            show={true}
            onHide={() => setShowModalInfo(false)}
            dialogClassName="custom-modal-size"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Informacion
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="containerAmbiente">
                    {actividades.map((actividad, index) => {
                        return (
                            <div key={index} className='actividadContainer'>
                                <h4>{actividad.ACTIVIDAD}</h4>
                                <p>actividad Metabolida: {actividad.MET}<br/>
                                    min : {actividad.TEMPERATURA_MINIMA}<br/>
                                    media: {actividad.TEMPERATURA_MEDIA}<br/>
                                    max : {actividad.TEMPERATURA_MAXIMA}<br/>
                                </p>
                            </div>
                        )
                    })}
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => { handleSubmit(); setShowModalInfo(false) }}>Listo</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalInfo