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
        this._actividades = []
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

    getListaLocales() {
        let locales = []
        this.espacios.forEach(piso => {
            piso.forEach(espacio => {
                if (espacio.tipo == 'LOCAL') {
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
        //console.log(`espacio calcular Habitabilidad ${JSON.stringify(idEspacio)}`)
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
            let n = 1
            pasillo.vecinos.forEach(vecinoId => {
                let vecino = this.buscarEspacio(vecinoId)
                // console.log(vecinoId)
                if (vecino.tipo == 'PASILLO') {
                    pasillos.push(vecino)
                    //console.log('pasillos', pasillos)
                }
                if (!visitados.includes(vecinoId)) {
                    vecino.calcularHabitabilidad(this._temperaturaAmbiente, undefined, pasillo.temperatura * (1 - 0.3) ^ n)
                    visitados.push(vecinoId)
                    n++
                }
                // while (pasillos.length > 0) {
                //     //console.log(pasillos)
                //     pasillo = pasillos.pop()
                //     //console.log(`pasillos : ${pasillos}`)
                //     propagar(pasillo)
                // }
            })

        }
        return espacio.temperatura
    }
    vaciarEspacios() {
        this._espacios.forEach(piso => {
            piso.forEach(espacio => {
                if (espacio instanceof Espacio) {
                    espacio.actividad = {}
                    espacio.coeficiente = 0
                    espacio.habitantes = []
                    espacio.electrodomesticos = 0
                    espacio.temperatura = 15
                }
            })
        })
    }
    organizarEspacios() {
        // console.log('organizar espacios')
        const actividadesEspacios = []
        const asignar = (espacio) => {
            if (espacio) {
                const actividadEspacio = actividadesEspacios.pop()
                espacio.actividad = actividadEspacio.actividad
                espacio.habitantes = actividadEspacio.habitantes
                espacio.electrodomesticos = actividadEspacio.electrodomesticos
                espacio.coeficiente = actividadEspacio.coeficiente
                this.calcularHabitabilidadEspacio(espacio.id)
            }
        }
        this._espacios.forEach(piso => {
            piso.forEach(espacio => {
                if (espacio instanceof Espacio && espacio.ocupado) {
                    actividadesEspacios.push({
                        actividad: espacio.actividad,
                        habitantes: espacio.habitantes,
                        electrodomesticos: espacio.electrodomesticos,
                        coeficiente: espacio.coeficiente
                    })
                }
            })
        })
        this.vaciarEspacios()
        actividadesEspacios.sort((a, b) => a.coeficiente - b.coeficiente)
        while (actividadesEspacios.length > 0) {
            const espacio = this._espacios.find(piso =>
                piso.find(espacio => !espacio.ocupado && espacio.radiacion === 0 && !espacio.vecinos.some(id => this.buscarEspacio(id).ocupado) && espacio.tipo != 'PASILLO' && espacio.tipo != 'ASCENSOR')
            )?.find(espacio => !espacio.ocupado && espacio.radiacion === 0 && !espacio.vecinos.some(id => this.buscarEspacio(id).ocupado) && espacio.tipo != 'PASILLO' && espacio.tipo != 'ASCENSOR')
            console.log('organizar espacio', espacio)
            if (!espacio) {
                break
            }
            asignar(espacio)
        }
        while (actividadesEspacios.length > 0) {
            const espacio = this._espacios.reverse().find(piso =>
                piso.find(espacio => !espacio.ocupado && espacio.radiacion === 0 && espacio.tipo != 'PASILLO' && espacio.tipo != 'ASCENSOR')
            )?.find(espacio => !espacio.ocupado && espacio.radiacion === 0 && espacio.tipo != 'PASILLO' && espacio.tipo != 'ASCENSOR')
            console.log('organizar espacio', espacio)
            if (!espacio) {
                break
            }
            asignar(espacio)
        }
        while (actividadesEspacios.length > 0) {
            const espacio = this._espacios.reverse().find(piso =>
                piso.find(espacio => !espacio.ocupado && espacio.tipo != 'PASILLO' && espacio.tipo != 'ASCENSOR')
            )?.find(espacio => !espacio.ocupado && espacio.tipo != 'PASILLO' && espacio.tipo != 'ASCENSOR')
            console.log('organizar espacio', espacio)
            asignar(espacio)
        }
        console.log(actividadesEspacios)
    }
}
