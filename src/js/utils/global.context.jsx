/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext } from "react";
import Edificio from "../models/edificio";
import Espacio from "../models/espacio";
import _espacios from '../../json/espacios.json'
import actividades from '../../json/actividades.json'
import Persona from "../models/persona";
import generarActividadesAleatorias from "../../main";
import solHoras from "../../json/ambiente.json"



const EdificioContext = createContext()
const ActividadesContext = createContext()
const AmbienteContext = createContext()

export const useEdificio = () => useContext(EdificioContext)
export const useActividades = () => useContext(ActividadesContext)
export const useAmbiente = () => useContext(AmbienteContext)


const espacios = []
const vestimenta = {
    "ligera": {
        "carga": 1.25
    },
    "abrigada": {
        "carga": 1.8
    }
}

for (let _piso of _espacios) {
    const piso = []
    for (let _espacio of _piso) {
        piso.push(new Espacio(_espacio.id, _espacio.tipo, _espacio.vecinos, _espacio.x, _espacio.y, _espacio.z, _espacio.material, _espacio.ancho, _espacio.alto, _espacio.longitud))
    }
    espacios.push(piso)
}

const edificio = new Edificio(espacios)
//generarActividadesAleatorias(edificio)

console.log(solHoras)

// edificio.buscarEspacio(605).actividad = actividades[1]
// edificio.buscarEspacio(401).actividad = actividades[5]

// let personas = []

// for(let i = 0; i < 20; i++){
//     personas.push(new Persona(vestimenta.ligera.carga))
// }

// edificio.buscarEspacio(401).habitantes = personas
// edificio.buscarEspacio(401).electrodomesticos = 15
// edificio.buscarEspacio(605).habitantes
// edificio.buscarEspacio(605).electrodomesticos = 18

// edificio.calcularHabitabilidadEspacio(401)
// edificio.calcularHabitabilidadEspacio(605)

// alert(`habitabilidad 401 ${edificio.buscarEspacio(401).temperatura} - habitabilidad 605 ${edificio.buscarEspacio(605).temperatura}`)

//console.log(edificio)

export function ContextProvider({ children }) {

    return (
        <EdificioContext.Provider value={edificio}>
            <ActividadesContext.Provider value={{ actividades, vestimenta }}>
                <AmbienteContext.Provider value={solHoras}>
                    {children}
                </AmbienteContext.Provider>
            </ActividadesContext.Provider>
        </EdificioContext.Provider>
    )
}