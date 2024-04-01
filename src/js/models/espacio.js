import FuenteTermica from "../utils/fuenteTermica.js"
import Material from "./material.js"
import Clima from "./clima.js"

export default class Espacio extends FuenteTermica {

    constructor(_areaPared, _areaPiso, _personas = [], _nombre = null, _id = null, _materiales = { 'pared': 0, 'suelo': 0 }, _entorno = null, _fuentesCalor = [], _vecinos = {}, _temperatura = null) {
        super()
        this._id = _id
        this._nombre = _nombre
        this._materiales = _materiales
        this._fuentesCalor = _fuentesCalor
        this._areaPared = _areaPared
        this._areaPiso = _areaPiso
        this._personas = _personas
        this._temperatura = _temperatura
        this._entorno = _entorno
        this._vecinos = _vecinos
        this._fuentesTermicas = []
        this._personas.forEach((persona) => {
            if (persona != null) {
                this.agregarFuenteTermica(persona)
            }
        })
        for (let clave in this._materiales) {
            if (this._materiales[clave] != null) {
                this.agregarFuenteTermica(this._materiales[clave])
            }
        }
        if (this.__fuentesCalor) {
            this.__fuentesCalor.forEach((fuente) => {
                this.agregarFuenteDeCalor(fuente)
            })
        }
        if (this._entorno != null) {
            this.agregarFuenteTermica(this._entorno)
        }
    }

    get id(){
        return this._id
    }

    set id(_id){
        this._id = _id
    }

    get nombre() {
        return this._nombre
    }
    set nombre(Nombre) {
        this._nombre = Nombre
    }

    get materiales() {
        return this._materiales
    }
    set materiales(_materiales) {
        this._materiales = _materiales
    }

    get fuentesCalor() {
        return this._fuentesCalor
    }
    set fuentesCalor(_fuentesCalor) {
        this._fuentesCalor = _fuentesCalor
    }

    get areaPared() {
        return this._areaPared
    }
    set areaPared(_areaPared) {
        this._areaPared = _areaPared
    }

    get areaPiso() {
        return this._areaPiso
    }
    set areaPiso(_areaPiso) {
        this._areaPiso = _areaPiso
    }

    get personas() {
        return this._personas
    }
    set personas(_personas) {
        this._personas = _personas
    }

    get temperatura() {
        return this._temperatura
    }
    set temperatura(_temperatura) {
        this._temperatura = _temperatura
    }
    get entorno() {
        return this._entorno
    }
    set entorno(_entorno) {
        this._entorno = _entorno
    }

    get fuentesTermicas() {
        return this._fuentesTermicas
    }

    get vecinos() {
        return this._vecinos
    }

    set vecinos(_vecinos) {
        this._vecinos = _vecinos
    }

    agregarVecino(vecino) {
        if (vecino instanceof Espacio) {
            this._vecinos[vecino.id] = vecino.calcularCargaTermica()
        }
    }

    agregarFuenteTermica(fuenteTermica) {
        if (fuenteTermica instanceof FuenteTermica) {
            if (fuenteTermica != null) {
                this._fuentesTermicas.push(fuenteTermica)
            }
        } else {
            //console.log('el objeto no es una fuente termica', fuenteTermica.constructor.name)
        }
    }

    calcularCargaTermica() {
        let cargaTermica = 0
        cargaTermica = ((this._areaPared * this._materiales['pared'].coeficiente) + (this._areaPiso * 2 * this._materiales['suelo'].coeficiente)) / (this._areaPared + 2 * this._areaPiso)
        this._fuentesTermicas.forEach((element) => {
            if (element instanceof FuenteTermica) {
                cargaTermica += element.calcularCargaTermica()
            }
        })
        console.log(`carga termica total : ${cargaTermica}`)
        return cargaTermica
    }

    calcularHabitabilidad(clima, hrs) {
        const cargaTermica = hrs * this.calcularCargaTermica()
        const valorMaximoPermitido = clima.valorMaximo
        const valorMinimoPermitido = clima.valorMinimo
        console.log(`valorMaximoPermitido: ${valorMaximoPermitido}`)
        console.log(`valorMinimoPermitido: ${valorMinimoPermitido}`)
        if (cargaTermica > valorMaximoPermitido) {
            return "No habitable"
        } else if (cargaTermica < valorMinimoPermitido) {
            return "Podría modificarse para habitar"
        } else {
            return "Habitable"
        }
    }

    agregarFuenteDeCalor(_fuentesCalor) {
        this._fuentesCalor = _fuentesCalor
    }

    agregarTemperatura(_temperatura) {
        this._temperatura = _temperatura
    }

    agregarEntorno(_entorno) {
        this._entorno = _entorno
    }

    verificarActividad(persona) {

    }

    verificarTipoRopa(persona) {

    }
}