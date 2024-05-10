import Espacio from "./espacio.js"

export default class Edificio {

    constructor(_espacios = []) {
        this._espacios = _espacios
    }

    get espacios() {
        return this._espacios
    }

    set espacios(_espacios) {
        this._espacios = _espacios
    }

    buscarEspacio(idEspacio){
        for(let piso of this._espacios){
            for(let espacio of this._espacios[piso]){
                if(espacio instanceof Espacio){
                    if(espacio.id == idEspacio){
                        return espacio
                    }
                }
            }
        }
        return null
    }
}
