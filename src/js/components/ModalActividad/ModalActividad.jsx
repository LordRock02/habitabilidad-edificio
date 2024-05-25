import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './ModalActividad.css'
import { useRef, useState } from 'react';
import { useEdificio, useActividades } from '../../utils/global.context';
import Espacio from '../../models/espacio';
import Persona from '../../models/persona';
import Edificio from '../../models/edificio';

const ModalActividad = ({ setShowModalActividad, setReload }) => {
    const inputEspacio = useRef(null)
    const selectActividad = useRef(null)
    const selectVestimenta = useRef(null)
    const edificio = useEdificio()
    const listaEspacios = edificio.getListaLocales()
    const { actividades, vestimenta } = useActividades()

    const [numPersonas, setNumPersonas] = useState(1)
    const [numElectrodomesticos, setNumElectrodomesticos] = useState(1)

    const handleSubmit = () => {
        let idEspacio = inputEspacio.current.value
        let espacio = edificio.buscarEspacio(idEspacio)
        let _numPersonas = numPersonas
        let personas = []
        if (espacio instanceof Espacio) {
            for (let actividad of actividades) {
                if (actividad.ACTIVIDAD == selectActividad.current.value) {
                    espacio.actividad = actividad
                    break
                }
            }
            console.log(`valor = ${selectVestimenta.current.value}`)
            for (let i = 0; i < _numPersonas; i++) {
                personas.push(new Persona(vestimenta[selectVestimenta.current.value].carga))
            }
            espacio.habitantes = personas
            espacio.electrodomesticos = numElectrodomesticos
            edificio.calcularHabitabilidadEspacio(idEspacio)
        }
        edificio.espacios.forEach(piso => {
            piso.forEach(espacio => {
              console.log(`temperatura espacio ${espacio.id} - ${espacio.temperatura} - ${espacio.habitabilidad} `)
            })
          })
          console.log(edificio)
        setReload(true)
    }

    return (
        <Modal
            show={true}
            onHide={() => setShowModalActividad(false)}
            dialogClassName="custom-modal-size"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Nueva Actividad
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className='containerEspacio'>
                    <div>
                        <label htmlFor="espacio">Espacio</label>
                        <input name="espacio" type="text" ref={inputEspacio} placeholder="ingrese el Espacio" />
                    </div>
                    <div>
                        <label htmlFor="actividades">Actividad</label>
                        <select name="actividades" id="" ref={selectActividad} >
                            {actividades.map((actividad, key) => { return (<option key={key} value={actividad.ACTIVIDAD}>{actividad.ACTIVIDAD}</option>) })}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="numPersonas"># Personas</label>
                        <input
                            type="number"
                            id="numPersonas"
                            name="numPersonas"
                            min="1"
                            max="20"
                            step="1"
                            value={numPersonas}
                            onChange={(event) => {
                                setNumPersonas(event.target.value);
                            }}
                        />
                        <label htmlFor="vestimenta" >Vestimenta</label>
                        <select name="vestimenta" ref={selectVestimenta} id="">
                            {Object.keys(vestimenta).map((key, value) => {
                                return (<option key={value} value={key}>{key}</option>)
                            })}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="numElectrodomesticos"># electrodomesticos</label>
                        <input
                            type="number"
                            id="numElectrodomesticos"
                            name="numElectrodomesticos"
                            min="1"
                            max="20"
                            step="1"
                            value={numElectrodomesticos}
                            onChange={(event) => {
                                setNumElectrodomesticos(event.target.value);
                            }}
                        />
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => { handleSubmit(); setShowModalActividad(false) }}>listo</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalActividad