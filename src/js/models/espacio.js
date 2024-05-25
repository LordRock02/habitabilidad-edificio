//import FuenteTermica from "../utils/fuenteTermica.js"
import Material from "./material.js"
import materiales from '../../json/materiales.json'
import Persona from "./persona.js"

const HABITABLE = 1
const SEMIHABITABLE = 2
const NO_HABITABLE = 3
const CARGA_ELECTRODOMESTICO = 200
const GROSOR_PARED = 0.3

export default class Espacio {
    constructor(_id = null, _tipo = null, _vecinos = [], _x, _y, _z, _material, _ancho, _alto, _longitud, _electrodomesticos = 0, _temperatura = 15, _temperaturaInicial = 15) {
        this._id = _id
        this._tipo = _tipo
        this._vecinos = _vecinos
        this._x = _x
        this._y = _y
        this._z = _z
        if (_material in materiales) {
            this._material = new Material(materiales[_material].coeficiente, _material, materiales[_material].nombre, materiales[_material].coeficienteAbsorcionSolar)
        }
        this._habitantes = []
        this._fuentesTermicas = []
        this._ancho = _ancho
        this._alto = _alto
        this._longitud = _longitud
        this._actividad = {}
        this._electrodomesticos = _electrodomesticos
        this._temperatura = _temperatura
        this._temperaturaInicial = _temperaturaInicial
        this._radiacion = 0
    }

    set id(_id) {
        this._id = _id
    }

    get id() {
        return this._id
    }

    set tipo(_tipo) {
        this._tipo = _tipo
    }

    get tipo() {
        return this._tipo
    }

    set vecinos(_vecinos) {
        this._vecinos = _vecinos
    }

    get vecinos() {
        return this._vecinos
    }

    set x(_x) {
        this._x = _x
    }

    get x() {
        return this._x
    }

    set y(_y) {
        this._y = _y
    }

    get y() {
        return this._y
    }

    set z(_z) {
        this._z = _z
    }

    get z() {
        return this._z
    }

    set material(_material) {
        if (_material in materiales) {
            this._material = new Material(materiales[_material].coeficiente, _material, materiales[_material].nombre, materiales[_material].coeficienteAbsorcionSolar)
        }
    }

    get material() {
        return this._material
    }

    set habitantes(_habitantes) {
        this._habitantes = _habitantes
    }

    get habitantes() {
        return this._habitantes
    }

    set ancho(_ancho) {
        this._ancho = _ancho
    }

    get ancho() {
        return this._ancho
    }

    set alto(_alto) {
        this._alto = _alto
    }

    get alto() {
        return this._alto
    }

    set longitud(_longitud) {
        this._longitud
    }

    get longitud() {
        return this._longitud
    }

    set actividad(_actividad) {
        this._actividad = _actividad
    }

    get actividad() {
        return this._actividad
    }

    get areaPared() {
        return 2 * ((this._ancho * this._alto) + (this._longitud * this._alto))
    }

    get areaPiso() {
        return 2 * ((this._ancho * this._longitud))
    }

    get areaVentana() {
        return this._ancho * this._alto
    }

    set electrodomesticos(_electrodomesticos) {
        this._electrodomesticos = _electrodomesticos
    }

    get electrodomesticos() {
        return this._electrodomesticos
    }

    get habitabilidad() {
        if (this._temperatura <= this._actividad.TEMPERATURA_MEDIA) {
            return HABITABLE
        } else if (this._temperatura > this._actividad.TEMPERATURA_MEDIA && this._temperatura <= this._actividad.TEMPERATURA_MAXIMA) {
            return SEMIHABITABLE
        } else if (this._temperatura > this._actividad.TEMPERATURA_MAXIMA) {
            return NO_HABITABLE
        }
        return 0
    }

    get temperatura() {
        return this._temperatura
    }

    set radiacion(_radiacion) {
        this._radiacion = _radiacion
    }

    get radiacion() {
        return this._radiacion
    }

    addVecino(idVecino) {
        this._vecinos.push(idVecino)
    }

    calcularHabitabilidad(temperaturaAmbiente = 0, temperaturaInicial = this._temperatura, temperaturaAdyacente = 0) {
        let cargaPersonas = 0
        this.habitantes.forEach((persona) => {
            if (persona instanceof Persona) {
                cargaPersonas += persona.calcularCargaTermica(this._actividad.MET)
            }
        })
        let radiacionSolar = this.areaVentana * this._material.coeficienteAbsorcionSolar * this.radiacion // radiacion solar incidente
        let cargaAdyacente = (((temperaturaAdyacente > this._temperatura ? temperaturaAdyacente - temperaturaInicial : 0) * (this._ancho * this._alto) * this._material.coeficiente) / GROSOR_PARED) 
        // console.log(`carga adyacente: ${cargaAdyacente}`)

        let cargaTotal = radiacionSolar + cargaPersonas + cargaAdyacente + CARGA_ELECTRODOMESTICO * this._electrodomesticos + (this.material.coeficiente * (this.areaPared + this.areaPiso)) * (this._temperatura - temperaturaAmbiente)
        this._temperatura = (cargaTotal) / (this.material.coeficiente * (this.areaPared + this.areaPiso)) + temperaturaAmbiente
        // console.log(`id ${this._id} temperatura ${this._temperatura} radiacion : ${radiacionSolar} areaVentana : ${this.areaVentana} coeficiente : ${this.material.coeficienteAbsorcionSolar}`)
        return this._temperatura
    }
}
