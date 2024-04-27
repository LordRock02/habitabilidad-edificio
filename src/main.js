import Edificio from './js/models/edificio.js'
import Espacio from './js/models/espacio.js'
import Material from './js/models/material.js'
import Persona from './js/models/persona.js'
import Entorno from './js/models/entorno.js'
import Clima from './js/models/clima.js'
import diccionario from './json/dictionary.json'


console.log(diccionario.Piso1[0])

let espaciosEdificio = {}

for (let piso in diccionario){
  let espacios = []
  diccionario[piso].forEach(espacio => {
    let fuentesCalor = null
    let materiales = { 'pared': 0, 'suelo': 0 }
    let entorno = null
    if (espacio._fuentesCalor){
      fuentesCalor = espacio._fuentesCalor
    }
    if (espacio._materiales){
      let componente = espacio._materiales.pared
      materiales['pared'] = new Material(componente._coeficiente, componente._nombre, componente._tipo, componente._id)
      componente = espacio._materiales.suelo
      materiales['suelo'] = new Material(componente._coeficiente, componente._nombre, componente._tipo, componente._id)
    }
    if(espacio._entorno){
      let componente = espacio._entorno
      entorno = new Entorno(componente._horaDia, componente._cargaTermicaHoras, componente._radiacionSolar, componente._numeroVentanas, componente._absorcionVidrio, componente._vecinos)
    }
    let nuevoEspacio = new Espacio(espacio._areaPared, espacio._areaPiso, espacio._personas, espacio._nombre, espacio._id, materiales, entorno, fuentesCalor, espacio._vecinos, espacio._temperatura)
    espacios.push(nuevoEspacio)
    console.log(`${piso} espacio agregado:\n ${nuevoEspacio.nombre}`)
    espaciosEdificio[piso] = espacios
    //console.log(`espacio ${espacio._id}`)
  })
}

let climaTemplado = {
  'amanecer': 280,
  'media manana': 750,
  'medio dia': 100,
  'media tarde': 700,
  'atardecer': 250
}
let climaCalido = {
  'amanecer': 350,
  'media manana': 900,
  'medio dia': 1200,
  'media tarde': 900,
  'atardecer': 400
}

let templado = new Clima(35000,12000)
let calido = new Clima(8000,25000)

let entornoTemplado = new Entorno('media tarde',climaTemplado)
let entornoCalido = new Entorno('medio dia', climaCalido)

let personas = [
  /*new Persona('ligera', 'calido', 'moderada'),
  new Persona('abrigada', 'calido', 'sedentaria'),
  new Persona('ligera', 'calido', 'moderada'),
  new Persona('abrigada', 'calido', 'sedentaria'),
  new Persona('ligera', 'calido', 'moderada'),
  new Persona('abrigada', 'calido', 'ligera'),
  new Persona('ligera', 'calido', 'moderada'),
  new Persona('abrigada', 'calido', 'sedentaria'),
  new Persona('ligera', 'calido', 'intensa'),
  new Persona('abrigada', 'calido', 'ligera'),
  new Persona('ligera', 'calido', 'moderada'),
  new Persona('abrigada', 'calido', 'sedentaria'),
  new Persona('ligera', 'calido', 'sedentaria'),
  new Persona('abrigada', 'calido', 'moderada'),
  new Persona('ligera', 'calido', 'intensa'),
  new Persona('abrigada', 'calido', 'sedentaria'),
  new Persona('ligera', 'calido', 'moderada'),
  new Persona('abrigada', 'calido', 'ligera'),
  new Persona('ligera', 'calido', 'moderada'),
  new Persona('abrigada', 'calido', 'intensa')*/
]


let edificio = new Edificio(5, espaciosEdificio,'choco', templado)
let idEspacio = prompt('ingrese id del espacio: ')
alert(idEspacio)
let espacio = edificio.buscarEspacio(idEspacio)
let hrs = prompt('ingrese horas: ')
alert(`horas ${hrs} espacio ${espacio.nombre}`)
let personasCant = prompt('ingrese la cantidad de personas que habitaran el espacio:')
let vestimenta = prompt('ingrese el tipo de vestimenta')
let actividad = prompt('ingrese el tipo de actividad:')
for (let i = 0; i < personasCant; i++){
  let person = new Persona(vestimenta, 'calido',actividad )
  console.log(i, person._actividad)
  personas.push(person)
}
if(espacio instanceof Espacio){
  console.log(`calculo habitabilidad ${espacio.nombre}`)
  espacio.personas = personas
  console.log(espacio.calcularHabitabilidad(templado, hrs))
  alert(espacio.calcularHabitabilidad(templado, hrs))
}


//console.log(edificio)
// var idEspacio = prompt('ingrese id del espacio:')
// console.log(idEspacio)
// let espacio = edificio.buscarEspacio(102)
// console.log(espacio.constructor.name)
// if(espacio instanceof Espacio){
//   var hrs = prompt(`ingrese cantidad de horas que va a ser habitado el espacio ${espacio.nombre}:`)
// }
// edificio.verificarHabitabilidad(1)
//edificio.agregarVecinosEspacio(1,6, 5)

// for( let espacio in edificio.buscarEspacio(1).vecinos){
//     console.log(espacio)
// }