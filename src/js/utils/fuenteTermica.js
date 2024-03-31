export default class FuenteTermica {
    constructor(){
        if(this.constructor == FuenteTermica){
            throw new Error('Cannot instantiate an abstract class')
        }
    }

    calcularCargaTermica() {
        throw new Error("metodo abstracto 'caldularCargaTermica()' no")
    }
}