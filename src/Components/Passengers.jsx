import { useEffect, useState } from 'react';
import './Passengers.css';
import PassengersList from './PassengersList';

export const Passengers = ({ state, send }) => {
  const [value, setValue] = useState('');

  const onChangeInput = (e) => {
    setValue(e.target.value);
  }

  const goToTicket = () => {
    send('DONE')
  }

  const submit = (e) => {
    e.preventDefault();
    send('ADD', { newPassenger: value })
    setValue('');
  }

  useEffect(() => {
    console.log("asdfasdf:", state)
  }, [])

  return (
    <form onSubmit={submit} className='Passengers'>
      <p className='Passengers-title title'>Agrega a las personas que van a volar ✈️</p>
      <PassengersList state={state}  />
      <input 
        id="name" 
        name="name" 
        type="text" 
        placeholder='Escribe el nombre completo' 
        required 
        value={value} 
        onChange={onChangeInput}
      />
      <div className='Passengers-buttons'>
        <button 
          className='Passengers-add button-secondary'
          type="submit"
        >
          Agregar Pasajero
        </button>
        <button
          className='Passenger-pay button'
          type="button"
          onClick={goToTicket}
        >
          Ver mi ticket
        </button>
      </div>
    </form>
  );
};