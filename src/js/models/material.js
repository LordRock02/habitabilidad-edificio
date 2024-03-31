export default class Material {
    constructor(_coeficiente, _nombre, _tipo = null, _id = null) {
        this._id = _id;
        this._nombre = _nombre;
        this._tipo = _tipo;
        this._coeficiente = _coeficiente;
    }

    get id() {
        return this._id;
    }

    set id(_id) {
        this._id = _id;
    }

    get nombre() {
        return this._nombre;
    }

    set nombre(_nombre) {
        this._nombre = _nombre;
    }

    get tipo() {
        return this._tipo;
    }

    set tipo(_tipo) {
        this._tipo = _tipo;
    }

    get coeficiente() {
        return this._coeficiente;
    }

    set coeficiente(_coeficiente) {
        this._coeficiente = _coeficiente;
    }

}
