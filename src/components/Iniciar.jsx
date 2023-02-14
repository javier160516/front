import React from 'react'

const Iniciar = ({nombre, setNombre, handleIniciar}) => {
  return (
    <div>
        <form action="">
            <label htmlFor="nombre">Nombre:</label>
            <input 
                type="text" 
                name='nombre' 
                id='nombre' 
                value={nombre}
                onChange={(e) => setNombre(e.target.value) }
                placeholder="Escribe tu nombre..."
            />
            <button 
                type="submit" 
                onClick={(e) => handleIniciar(e)} 
            >Iniciar</button>
        </form>
    </div>
  )
}

export default Iniciar