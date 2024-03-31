export default class Clima {
    constructor(_valorMaximo, _valorMinimo) {
        this._valorMaximo = _valorMaximo;
        this._valorMinimo = _valorMinimo;
    }

    get valorMaximo() {
        return this._valorMaximo
    }

    set valorMaximo(_valorMaximo) {
        this._valorMaximo = _valorMaximo
    }

    get valorMinimo() {
        return this._valorMinimo
    }

    set valorMinimo(_valorMinimo) {
        this._valorMinimo = _valorMinimo
    }

    verificarT() {

    }
}