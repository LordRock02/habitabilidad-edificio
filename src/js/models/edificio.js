class Edificio {
    constructor(numeroPisos, ubicacion) {
        this.listaEspacios = {};
        this.numeroPisos = numeroPisos;
        this.ubicacion = ubicacion;
    }

    get listaEspacios(){
        return this.listaEspacios
    }

    set listaEspacios(listaEspacios){
        this.listaEspacios = listaEspacios
    }

    verificarHabitabilidad() {
        for (let espacio of this.listaEspacios) {
            const estadoHabitabilidad = espacio.calcularHabitabilidad();
            console.log(`Espacio ${espacio.nombre}: ${estadoHabitabilidad}`);
        }
    }

    agregarEspacio(espacio) {
        this.listaEspacios.push(espacio);
    }
}