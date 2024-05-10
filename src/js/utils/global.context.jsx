/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext } from "react";
import Edificio from "../models/edificio";
import Espacio from "../models/espacio";
import _espacios from '../../json/espacios.json'



const EdificioContext = createContext()

export const useEdificio = () => useContext(EdificioContext)

const espacios = []

for(let _piso of _espacios){
    const piso = []
    for(let _espacio of _piso){
        piso.push(new Espacio(_espacio.id, _espacio.vecinos, _espacio.x, _espacio.y, _espacio.z, _espacio.materialPiso, _espacio.materialPared))
    }
    espacios.push(piso)
}

const edificio = new Edificio(espacios)

console.log(edificio)

export function ContextProvider({children}) {
    
    return(
        <EdificioContext.Provider value={edificio}>
            {children}
        </EdificioContext.Provider>
    )
}