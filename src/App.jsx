import { useState, useEffect } from 'react'
import { ws } from './config';
import Iniciar from './components/Iniciar';
import SeleccionarPersonajes from './components/SeleccionarPersonajes';


const App = () => {
  const [connection, setConnection] = useState(false);
  const [user, setUser] = useState({})
  const [nombre, setNombre] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [personajes, setPersonajes] = useState([]);
  const [personajeSeleccionado, setPersonajeSeleccionado] = useState({});
  let jugadores = [1, 2];

  console.log(import.meta.env.VITE_BACKEND);
  const wsOn = () => {
    return ws.on('connect', () => {
      console.log('Usuario conectado...');
      setConnection(true);
    });
  }

  useEffect( () => {
    ws.on('seleccionar-personaje', (data) => {
      console.log(data);
      data.connection ? setConnection(data.connection) : null;
      setUser(data.user);
      setPersonajes(data.personajes);

    });

    ws.on('error', (message) => {
      setMensaje(message.message);
      console.log(message, ' desde message');
    });

    ws.on('disconnect', () => {
      console.log('Se ha desconectado');
      setConnection(false);
    });
  }, [])

  useEffect(() => {
    console.log(personajeSeleccionado);
  }, [personajeSeleccionado])

  const handleIniciar = () => {
    event.preventDefault();
    const { connected } = wsOn();
    if (connected) {
      setConnection(connected);
      if (nombre) {
        setMensaje('');
        ws.emit('join', { nombre })
      } else {
        setMensaje('Debes ponerte algún nombre')
      }
    }
  }

  return (
    <div>
      {!connection ? (
        <>
          <Iniciar
            nombre={nombre}
            setNombre={setNombre}
            handleIniciar={handleIniciar}
          />
          {mensaje && (<p>{mensaje}</p>)}
        </>
      ) : (
        <div>
          <h1 style={{ textAlign: 'center' }}>Selección de personajes</h1>
          <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            {jugadores.map(jugador => (
              <SeleccionarPersonajes
                key={jugador}
                jugador={jugador}
                personajes={personajes}
                user={user}
                personajeSeleccionado={personajeSeleccionado}
                setPersonajeSeleccionado={setPersonajeSeleccionado}
              />
            ))}
          </div>
        </div>
      )}

    </div>
  )
}

export default App
