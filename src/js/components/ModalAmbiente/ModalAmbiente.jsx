import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './ModalAmbiente.css'
import { useRef, useState } from 'react';
import { useAmbiente, useEdificio } from '../../utils/global.context';
import Edificio from '../../models/edificio';

const ModalAmbiente = ({ setShowModalAmbiente, setReload }) => {
    const selectHora = useRef(null)
    const [temperatura, setTemperatura] = useState(15)
    const solHoras = useAmbiente()
    const edificio = useEdificio()
    const handleSubmit = () =>{
        if(edificio instanceof Edificio){
            edificio.setSol(selectHora.current.value)
            edificio.temperaturaAmbiente = temperatura
        }
        setReload(true)
    }
    return (
        <Modal
            show={true}
            onHide={() => setShowModalAmbiente(false)}
            dialogClassName="custom-modal-size"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Condiciones Ambientales
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="containerAmbiente">
                    <div>
                        <label htmlFor="hora">Hora del dia</label>
                        <select name="hora" id="" ref={selectHora} >
                            {Object.keys(solHoras).map((hora, key) => {
                                return (
                                    <option key={key} value={hora}>
                                        {hora}
                                    </option>
                                )
                            })}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="temperatura"># electrodomesticos</label>
                        <input
                            type="number"
                            id="numElectrodomesticos"
                            name="temperatura"
                            min="1"
                            max="35"
                            step="1"
                            value={temperatura}
                            onChange={(event) => {
                                setTemperatura(event.target.value);
                            }}
                        />
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => { handleSubmit(); setShowModalAmbiente(false) }}>Listo</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalAmbiente