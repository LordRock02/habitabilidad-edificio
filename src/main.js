import Edificio from "./js/models/edificio";
import Espacio from "./js/models/espacio";
import Persona from "./js/models/persona";
import actividades from './json/actividades.json'

const vestimenta = {
  "ligera": {
    "carga": 1.25
  },
  "abrigada": {
    "carga": 1.8
  }
}

const generarActividadesAleatorias = (edificio) => {
  edificio.vaciarEspacios()
  const nodos_visitados = []

  const randomInt = (min, max) => {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  const randomIndex = (length) => {
    return Math.floor(Math.random() * length)
  }

  const randomKey = (keys) => {
    return keys[Math.floor(Math.random() * keys.length)]
  }

  if (edificio instanceof Edificio) {
    const numActividades = randomInt(20, 40)
    for (let i = 0; i < numActividades; i++) {
      const numPersonas = randomInt(10, 20)
      const numDispositivos = randomInt(10, 20)
      const piso = randomIndex(edificio.espacios.length)

      if (!edificio.espacios[piso] || edificio.espacios[piso].length === 0) {
        console.warn('No hay espacios válidos en el piso seleccionado')
        continue
      }

      let espacio = edificio.espacios[piso][randomIndex(edificio.espacios[piso].length)]
      let attempts = 0
      const maxAttempts = 100

      while ((espacio.tipo != 'LOCAL' || nodos_visitados.includes(espacio)) && attempts < maxAttempts) {
        espacio = edificio.espacios[piso][randomIndex(edificio.espacios[piso].length)]
        attempts++
      }

      if (attempts >= maxAttempts) {
        console.warn('Se alcanzó el límite de intentos para encontrar un espacio válido')
        continue
      }

      let personas = [];
      for (let j = 0; j < numPersonas; j++) {
        let persona = new Persona(vestimenta[randomKey(Object.keys(vestimenta))].carga)
        personas.push(persona)
      }

      if (espacio instanceof Espacio) {
        espacio.electrodomesticos = numDispositivos;
        espacio.habitantes = personas;
        espacio.actividad = actividades[randomIndex(actividades.length)]
        edificio.calcularHabitabilidadEspacio(espacio.id)
        nodos_visitados.push(espacio)
      }
    }
  }

  edificio.espacios.forEach(piso => {
    piso.forEach(espacio => {
      //console.log(`temperatura espacio ${espacio.id} - ${espacio.temperatura} - ${espacio.habitabilidad}`)
    })
  })

  console.log(edificio)
}

export default generarActividadesAleatorias
