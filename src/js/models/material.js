export default class Material {
    constructor(_coeficiente = 0, _id = '', _nombre = '', _coeficienteAbsorcionSolar = 0) {
        this._id = _id;
        this._coeficiente = _coeficiente;
        this._nombre = _nombre
        this._coeficienteAbsorcionSolar = _coeficienteAbsorcionSolar
    }

    get id() {
        return this._id;
    }

    set id(_id) {
        this._id = _id;
    }

    get nombre() {
        return this._nombre
    }

    set nombre(_nombre) {
        this._nombre = _nombre
    }

    get coeficiente() {
        return this._coeficiente;
    }

    set coeficiente(_coeficiente) {
        this._coeficiente = _coeficiente;
    }

    get coeficienteAbsorcionSolar() {
        return this._coeficienteAbsorcionSolar
    }

    set coeficienteAbsorcionSolar(_coeficienteAbsorcionSolar) {
        this._coeficienteAbsorcionSolar = _coeficienteAbsorcionSolar
    }

}
