import Espacio from "./espacio.js"
import Clima from "./clima.js"

export default class Edificio {

    constructor(_numeroPisos, _espacios = {}, _ubicacion = '', _clima = null) {
        this._espacios = _espacios
        this._numeroPisos = _numeroPisos
        this._ubicacion = _ubicacion
        this._clima = _clima
    }

    get espacios() {
        return this._espacios
    }

    set espacios(_espacios) {
        this._espacios = _espacios
    }

    get clima() {
        return this._clima
    }

    set clima(_clima) {
        this._clima = _clima
    }

    verificarHabitabilidad(hrs) {
        console.log(this._espacios)
        for (let piso in this._espacios) {
            this._espacios[piso].forEach((espacio) => {
                let estadoHabitabilidad
                if (espacio instanceof Espacio) {    
                    estadoHabitabilidad = espacio.calcularHabitabilidad(this._clima, hrs)
                    console.log(`Espacio ${espacio}: ${estadoHabitabilidad} carga termica: ${espacio.calcularCargaTermica()}`)
                }
            })
        }
    }
}
