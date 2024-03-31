import FuenteTermica from "../utils/fuenteTermica.js"
import Clima from "./clima.js";

export default class Entorno extends FuenteTermica {
    constructor(_horaDia, _horario = null, _radiacionSolar = null, _numeroVentanas = null, _absorcionVidrio = null) {
        super()
        this._radiacionSolar = _radiacionSolar;
        this._numeroVentanas = _numeroVentanas;
        this._absorcionVidrio = _absorcionVidrio;
        this._horaDia = _horaDia
        if (_horario != null) {
            this._cargaTermicaHoras = _horario
        } else {
            this._cargaTermicaHoras = {
                'amanecer': null,
                'media manana': null,
                'medio dia': null,
                'media tarde': null,
                'atardecer': null
            }
        }
    }

    get radiacionSolar() {
        return this._radiacionSolar
    }

    set radiacionSolar(_radiacionSolar) {
        this._radiacionSolar = _radiacionSolar
    }

    get numeroVentanas() {
        return this._numeroVentanas
    }

    set numeroVentanas(_numeroVentanas) {
        this._numeroVentanas = _numeroVentanas
    }

    get absorcionVidrio() {
        return this._absorcionVidrio
    }

    set absorcionVidrio(_absorcionVidrio) {
        this._absorcionVidrio = _absorcionVidrio
    }

    get horaDia() {
        return this._horaDia
    }

    set horaDia(_horaDia) {
        this._horaDia = _horaDia
    }

    get cargaTermicaHoras() {
        return this._cargaTermicaHoras
    }

    set cargaTermicaHoras(_horario) {
        this._cargaTermicaHoras = _horario
    }

    calcularCargaTermica() {
        return this._cargaTermicaHoras[this._horaDia]
    }
}