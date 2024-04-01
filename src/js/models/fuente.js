import FuenteTermica from "../utils/fuenteTermica.js";
class Fuente extends FuenteTermica {
    constructor(_nombre, _tipo, _cargaTermica) {
        super()
        this._nombre = _nombre;
        this._tipo = _tipo;
        this._cargaTermica = _cargaTermica;
    }

    get nombre() {
        return this._nombre
    }

    set nombre(_nombre) {
        this._nombre = _nombre
    }

    get tipo() {
        return this._tipo
    }

    set tipo(_tipo) {
        this._tipo = _tipo
    }

    get cargaTermica() {
        return this._cargaTermica
    }

    set cargaTermica(_cargaTermica) {
        this._cargaTermica = _cargaTermica
    }

    calcularCargaTermicas() {
        return this._cargaTermica
    }
}