import { useMachine } from '@xstate/react';
import { Nav } from '../Components/Nav';
import { StepsLayout } from './StepsLayout';
import bookingMachine from '../Machines/bookingMachine';
import './BaseLayout.css';
import { useEffect } from 'react';

export default () => {
  const [state, send] = useMachine(bookingMachine);

  useEffect(() => {
    console.log('Nuestra maquina', state);
    console.log('Estado actual:', state.value);
    console.log('Estoy en el estado initial:', state.matches('initial'))
    console.log('Estoy en el estado tickets:', state.matches('tickets'))
    console.log('Puede ejecutar el evento FINISH:', state.can('FINISH'))
  }, [state])

  return (
    <div className='BaseLayout'>
      <Nav state={state} send={send}/>
      <StepsLayout state={state} send={send} />
    </div>
  );
}