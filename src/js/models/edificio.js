import { string } from "three/examples/jsm/nodes/Nodes.js"
import Espacio from "./espacio.js"
import sol_hora_dia from '../../json/ambiente.json'
import Sol from "./ambiente.js"

const MANANA = "mañana"
const MEDIO_DIA = "mediodia"
const TARDE = "tarde"

export default class Edificio {

    constructor(_espacios = [], _temperaturaAmbiente = 17, _hora = MANANA) {
        this._espacios = _espacios
        this._temperaturaAmbiente = _temperaturaAmbiente
        this._hora = _hora
        this.setSol(this._hora)
    }

    get espacios() {
        return this._espacios
    }

    set espacios(_espacios) {
        this._espacios = _espacios
    }

    get temperaturaAmbiente() {
        return this._temperaturaAmbiente
    }

    set temperaturaAmbiente(_temperaturaAmbiente) {
        this._temperaturaAmbiente = _temperaturaAmbiente
    }

    setSol(_hora) {
        if (this._sol) {
            this.removeVecinosSol()
        }
        let sol_hora = sol_hora_dia[_hora]
        this._sol = new Sol(sol_hora.vecinos, sol_hora.radiacion, true, sol_hora.x, sol_hora.y, sol_hora.z)
        this.setVecinosSol()
    }

    get sol() {
        return this._sol
    }

    getListaLocales(){
        let locales = []
        this.espacios.forEach(piso => {
            piso.forEach(espacio => {
                if(espacio.tipo == 'LOCAL'){
                    locales.push(espacio.id)
                }
            })
        })
        return locales
    }

    setVecinosSol() {
        this._sol.vecinos.forEach(vecinoId => {
            let vecino = this.buscarEspacio(vecinoId)
            if (vecino) {
                vecino.vecinos.push('SOL')
                console.log(`vecino - sol ${vecino}`)
                vecino.radiacion = this._sol.radiacion
            }
        })
    }

    removeVecinosSol() {
        this._sol.vecinos.forEach(vecinoId => {
            let vecino = this.buscarEspacio(vecinoId)
            if (vecino) {
                vecino.vecinos = vecino.vecinos.filter(vecino => vecino !== "SOL")
                vecino.radiacion = 0
            }
        })
    }

    buscarEspacio(idEspacio) {
        for (let piso of this._espacios) {
            for (let espacio of piso) {
                if (espacio instanceof Espacio) {
                    if (espacio.id == idEspacio) {
                        return espacio
                    }
                }
            }
        }
        return null
    }
    calcularHabitabilidadEspacio(idEspacio) {
        let pasillo
        let visitados = []
        let pasillos = []
        let espacio = this.buscarEspacio(idEspacio)
        espacio.calcularHabitabilidad(this._temperaturaAmbiente)
        visitados.push(espacio.id)
        //propagacion
        const propagar = (espacio) => {
            let pasillo
            let n = 1
            espacio.vecinos.forEach(vecinoId => {
                if (!visitados.includes(vecinoId)) {
                    let vecino = this.buscarEspacio(vecinoId)
                    if (vecino) {
                        vecino.calcularHabitabilidad(this._temperaturaAmbiente, undefined, espacio.temperatura * (1 - 0.3) ^ n)
                        n++
                        visitados.push(vecinoId)
                        if (vecino.tipo == 'PASILLO') {
                            pasillo = vecino
                        }
                    }
                }
                if (pasillo) {
                    return propagar(pasillo)
                }

            })
        }
        espacio.vecinos.forEach(vecinoId => {
            //console.log(`calcularHabitabilidad(): vecinoId - ${vecinoId}`)
            let vecino = this.buscarEspacio(vecinoId)
            if (vecino) {
                vecino.calcularHabitabilidad(this._temperaturaAmbiente, undefined, espacio.temperatura)
                visitados.push(vecinoId)
                if (vecino.tipo == 'PASILLO') {
                    pasillo = vecino
                }
            }
        })
        if (pasillo) {
            pasillo.vecinos.forEach(vecinoId => {
                let n = 1
                let vecino = this.buscarEspacio(vecinoId)
                // console.log(vecinoId)
                if (vecino.tipo == 'PASILLO') {
                    pasillos.push(vecino)
                    console.log('pasillos', pasillos)
                }
                if (!visitados.includes(vecinoId)) {
                    vecino.calcularHabitabilidad(this._temperaturaAmbiente, undefined, pasillo.temperatura * (1 - 0.3) ^ n)
                    visitados.push(vecinoId)
                    n++
                }
                while (pasillos.length > 0) {
                    //console.log(pasillos)
                    pasillo = pasillos.pop()
                    //console.log(`pasillos : ${pasillos}`)
                    propagar(pasillo)
                }
            })

        }
        return espacio.temperatura
    }
}
