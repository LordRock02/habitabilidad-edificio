import Edificio from './js/models/edificio.js'
import Espacio from './js/models/espacio.js'
import Material from './js/models/material.js'
import Persona from './js/models/persona.js'
import Entorno from './js/models/entorno.js'
import Clima from './js/models/clima.js'

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
  new Persona('ligera', 'calido', 'moderada'),
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
  new Persona('abrigada', 'calido', 'intensa')
]

let espacios = {
  1 : [new Espacio(10, 10, personas, null, null, {'pared': new Material(1.35, 'hormigon' ), 'suelo': new Material(1.35, 'hormigon' ) }, entornoCalido)],
  2 : [new Espacio(10, 10, personas, null, null, {'pared': new Material(1.35, 'hormigon' ), 'suelo': new Material(1.35, 'hormigon' ) }, entornoCalido)],
  3 : [new Espacio(10, 10, personas, null, null, {'pared': new Material(1.35, 'hormigon' ), 'suelo': new Material(1.35, 'hormigon' ) }, entornoCalido)],
  4 : [new Espacio(10, 10, personas, null, null, {'pared': new Material(1.35, 'hormigon' ), 'suelo': new Material(1.35, 'hormigon' ) }, entornoCalido)],
  5 : [new Espacio(10, 10, personas, null, null, {'pared': new Material(1.35, 'hormigon' ), 'suelo': new Material(1.35, 'hormigon' ) }, entornoCalido)]
}

let edificio = new Edificio(5, espacios,'choco', calido)

edificio.verificarHabitabilidad(1)

//espacios[1][0].calcularCargaTermica()

//console.log(edificio.espacios)