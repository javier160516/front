import React, { useEffect } from 'react'

const SeleccionarPersonajes = ({ jugador, personajes, user, personajeSeleccionado, setPersonajeSeleccionado }) => {
  useEffect(() => {
    console.log(personajes, ' desde seleccionar personaje');
  }, [personajes])
  return (
    <div>
      <h2>Jugador {jugador}</h2>
      {personajes.map(personaje => (
        <div key={personaje.id}>
          <p>{personaje.id}</p>
          <p>{personaje.nombre}</p>
          <button type='button' onClick={() => setPersonajeSeleccionado({...personajeSeleccionado, user, personaje: {id: personaje.id, nombre: personaje.nombre}})}>Seleccionar Personaje {personaje.id}</button>
        </div>
      ))}
    </div>
  )
}

export default SeleccionarPersonajes