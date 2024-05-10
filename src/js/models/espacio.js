import FuenteTermica from "../utils/fuenteTermica.js"
import Material from "./material.js"
import materiales from '../../json/materiales.json'

export default class Espacio extends FuenteTermica {
    constructor(_id = null, _vecinos = [], _x, _y, _z, _materialPiso, _materialPared) {
        super()
        this._id = _id
        this._vecinos = _vecinos
        this._x = _x
        this._y = _y
        this._z = _z
        if (_materialPiso in materiales) {
            this._materialPiso = new Material(materiales[_materialPiso].coeficiente, _materialPiso, materiales[_materialPiso].nombre)
        }
        if (_materialPared in materiales) {
            this._materialPared = new Material(materiales[_materialPared].coeficiente, _materialPared, materiales[_materialPared].nombre)
        }
        this._habitantes = []
    }

    set id(_id) {
        this._id = _id
    }

    get id() {
        return this._id
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

    set materialPiso(_materialPiso) {
        if (_materialPiso in materiales) {
            this._materialPiso = new Material(materiales[_materialPiso].coeficiente, _materialPiso, materiales[_materialPiso].nombre)
        }
    }

    get materialPiso() {
        return this._materialPiso
    }

    set materialPared(_materialPared) {
        if (_materialPared in materiales) {
            this._materialPared = new Material(materiales[_materialPared].coeficiente, _materialPared, materiales[_materialPared].nombre)
        }
    }

    get materialPared() {
        return this._materialPared
    }

    set habitantes(_habitantes) {
        this._habitantes = _habitantes
    }

    get habitantes() {
        return this._habitantes
    }

    addVecino(idVecino) {
        this._vecinos.push(idVecino)
    }
}