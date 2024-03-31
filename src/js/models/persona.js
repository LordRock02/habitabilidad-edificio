import FuenteTermica from "../utils/fuenteTermica.js"

export default class Persona extends FuenteTermica {

    constructor(_vestimenta, _clima, _actividad) {
        super()
        this._vestimenta = _vestimenta
        this._climaActual = _clima
        this._actividad = _actividad
    }

    get vestimenta() {
        return this._vestimenta
    }

    set vestimenta(_vestimenta) {
        this._vestimenta = _vestimenta
    }

    get actividad() {
        return this._actividad
    }

    set actividad(_actividad) {
        this._actividad = _actividad
    }

    get climaActual() {
        return this._climaActual
    }

    set climaActual(_clima) {
        this._climaActual = _clima
    }

    calcularCargaTermica() {
        let cargaTermica
        switch(this._vestimenta){
            case 'ligera':
                switch(this.climaActual){
                    case 'templado':
                        cargaTermica = 15
                    break
                    case 'calido':
                        cargaTermica = 25
                    break
                }
            break
            case 'abrigada':   
                switch(this._climaActual){
                    case 'templado':
                        cargaTermica = 50
                    break
                    case 'calido':
                        cargaTermica = 100
                    break
                }
            break
        }
        switch(this._actividad){
            case 'sedentaria':
                cargaTermica += 70
            break
            case 'ligera':
                cargaTermica += 90
            break
            case 'moderada':
                cargaTermica += 125
            break
            case 'intensa':
                cargaTermica += 175
            break
        }
        return cargaTermica
    }
}