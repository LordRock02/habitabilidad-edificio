import FuenteTermica from "../utils/fuenteTermica.js"

const MET = 58.2/7
const SUPERFICIE_CORPORAL = 1.5

export default class Persona extends FuenteTermica {

    constructor(_coeficienteVestimenta) {
        super()
        this._coeficienteVestimenta = _coeficienteVestimenta
    }

    get coeficienteVestimenta() {
        return this._coeficienteVestimenta
    }

    set coeficienteVestimenta(_coeficienteVestimenta) {
        this._coeficienteVestimenta = _coeficienteVestimenta
    }

    calcularCargaTermica(actividadTazaMet) {
        return this._coeficienteVestimenta * actividadTazaMet * (MET * SUPERFICIE_CORPORAL)
    }
}