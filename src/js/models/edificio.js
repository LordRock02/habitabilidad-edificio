class Edificio {
    constructor(numeroPisos, ubicacion) {
        this.listaEspacios = [];
        this.numeroPisos = numeroPisos;
        this.ubicacion = ubicacion;
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