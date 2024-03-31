import FuenteTermica from "../utils/fuenteTermica.js"
import Material from "./material.js"

const valorMaximoPermitido = 0
const valorMinimoPermitido = 0
export default class Espacio extends FuenteTermica {

    constructor(_areaPared, _areaPiso, _personas = [], _nombre = null, _id = null, _materiales = { 'pared': null, 'suelo': null }, _entorno = null, _fuentesCalor = {}, _temperatura = null) {
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
        this._fuentesTermicas = []
        this.agregarFuenteTermica(this)
        this._personas.forEach((persona) => {
            //console.log(persona, persona.constructor.name)
            if (persona != null) {
                this.agregarFuenteTermica(persona)
            }
        })
        for (let clave in this._materiales) {
            if (this._materiales[clave] != null) {
                this.agregarFuenteTermica(this._materiales[clave])
            }
        }
        for (let clave in this._fuentesCalor) {
            if (this._fuentesCalor[clave] != null) {
                this.agregarFuenteTermica(this._fuentesCalor[clave])
            }
        }
        if (this._entorno != null) {
            console.log('hola')
            this.agregarEntorno(this._entorno)
            console.log('xd')
        }
        console.log(this._fuentesTermicas)
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

    agregarFuenteTermica(fuenteTermica) {
        if (fuenteTermica instanceof FuenteTermica) {
            if (fuenteTermica != null) {
                console.log('tipo', fuenteTermica.constructor.name)
                this._fuentesTermicas.push(fuenteTermica)
                //console.log(this._fuentesTermicas)
            }
        } else {
            console.log('el objeto no es una fuente termica', fuenteTermica.constructor.name)
        }
    }

    /*agregarMaterial(material) {
        this._materiales.push(material)
    }*/

    agregarFuenteDeCalor(_fuentesCalor) {
        this._fuentesCalor = _fuentesCalor
    }

    agregarTemperatura(_temperatura) {
        this._temperatura = _temperatura
    }

    agregarEntorno(_entorno) {
        this._entorno = _entorno
    }

    calcularCargaTermica() {
        return ((this._areaPared * new Material(this._materiales['pared']).coeficiente) + (this.areapiso * 2 * new Material(this._materiales['suelo']).coeficiente)) / (this._areaPared + 2 * this._areaPiso)
    }

    verificarActividad(persona) {

    }

    verificarTipoRopa(persona) {

    }

    calcularHabitabilidad() {
        const cargaTermica = this.calcularCargaTermica()
        if (cargaTermica > valorMaximoPermitido) {
            return "No habitable"
        } else if (cargaTermica < valorMinimoPermitido) {
            return "Podría modificarse para habitar"
        } else {
            return "Habitable"
        }
    }
}