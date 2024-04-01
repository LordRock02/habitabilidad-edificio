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

    buscarEspacio(id){
        let espacioEncontrado
        for(let piso in this._espacios){
            this._espacios[piso].forEach((espacio) => {
                if(espacio instanceof Espacio){
                    if(espacio.id == id){
                        espacioEncontrado = espacio
                    }
                }
            })
        }
        return espacioEncontrado
    }

    agregarVecinosEspacio(id, ...idVecinos){
        const espacio = this.buscarEspacio(id)
        if(espacio != null){
            let vecinos = []
            for(var i = 0; i<idVecinos.length; i++){
                vecinos.push(this.buscarEspacio(idVecinos[i]))
            }
            vecinos.forEach((vecino) => {
                if(espacio instanceof Espacio){
                    espacio.agregarVecino(vecino)
                }
            })
        }

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
