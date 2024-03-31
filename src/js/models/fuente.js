import FuenteTermica from "../utils/fuenteTermica.js";
class Fuente extends FuenteTermica{
    constructor(_nombre, _tipo, _potenciaTermica) {
        super()
        this._nombre = _nombre;
        this._tipo = _tipo;
        this._potenciaTermica = _potenciaTermica;
    }

    get nombre(){
        return this._nombre
    }

    set nombre(_nombre){
        this._nombre = _nombre
    }

    get tipo(){
        return this._tipo
    }

    set tipo(_tipo){
        this._tipo = _tipo
    }

    get potenciaTermica(){
        return this._potenciaTermica
    }

    set potenciaTermica(_potenciaTermica){
        this._potenciaTermica = _potenciaTermica
    }

    calcularCargaTermicas(){ }
}