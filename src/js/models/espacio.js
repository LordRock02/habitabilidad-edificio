import FuenteTermica from "../utils/fuenteTermica.js"

export default class Espacio extends FuenteTermica {
    constructor(_id = null, _vecinos = [], _x, _y, _z) {
        super()
        this._id = _id
        this._vecinos = _vecinos
        this._x = _x
        this._y = _y
        this._z = _z
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

    set y(_y){
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

    addVecino(idVecino) {
        this._vecinos.push(idVecino)
    }
}