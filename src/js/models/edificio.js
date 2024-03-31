export default class Edificio {

    constructor(_numeroPisos, _espacios = {}, _ubicacion = '') {
        this._espacios = _espacios
        this._numeroPisos = _numeroPisos
        this._ubicacion = _ubicacion
    }

    get espacios() {
        return this._espacios
    }

    set espacios(_espacios) {
        this._espacios = _espacios
    }

    verificarHabitabilidad() {
        for (let espacio of this._espacios) {
            const estadoHabitabilidad = espacio.calcularHabitabilidad()
            console.log(`Espacio ${espacio.nombre}: ${estadoHabitabilidad}`)
        }
    }

    agregarEspacio(espacio) {
        this._espacios.push(espacio)
    }
}
