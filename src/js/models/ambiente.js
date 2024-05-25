export default class Sol {
    constructor(_vecinos = [], _radiacion, _activo = false, _x = 0, _y = 0, _z = 0) {
        this._vecinos = _vecinos
        this._radiacion = _radiacion
        this._activo = _activo
        this._x = _x
        this._y = _y
        this._z = _z
    }
    get vecinos() {
        return this._vecinos
    }
    set vecinos(_vecinos) {
        this._vecinos = _vecinos
    }
    get radiacion() {
        return this._radiacion
    }
    set radiacion(_radiacion) {
        this._radiacion
    }
    get activo() {
        return this._activo
    }
    set activo(_activo) {
        this._activo = _activo
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
}