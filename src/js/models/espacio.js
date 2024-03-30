class Espacio {
    constructor(nombre, areaPared, areaPiso, numeroPersonas) {
        this.id = null; 
        this.nombre = nombre;
        this.listaMateriales = [];
        this.fuenteCalor = null; 
        this.areaPared = areaPared;
        this.areaPiso = areaPiso;
        this.numeroPersonas = numeroPersonas;
        this.temperatura = null;
        this.entorno = null;
    }

    agregarMaterial(material) {
        this.listaMateriales.push(material);
    }

    agregarFuenteDeCalor(fuenteCalor) {
        this.fuenteCalor = fuenteCalor;
    }

    agregarTemperatura(temperatura) {
        this.temperatura = temperatura;
    }

    agregarEntorno(entorno) {
        this.entorno = entorno;
    }

    calcularCargaTermica() {
        
    }

    verificarActividad(persona) {
       
    }

    verificarTipoRopa(persona) {
        
    }

    calcularHabitabilidad() {
        const cargaTermica = this.calcularCargaTermica();
        if (cargaTermica > valorMaximoPermitido) {
            return "No habitable";
        } else if (cargaTermica < valorMinimoPermitido) {
            return "Podría modificarse para habitar";
        } else {
            return "Habitable";
        }
    }
}