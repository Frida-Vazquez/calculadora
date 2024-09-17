import './App.css';
import Logo from './componentes/Logo';
import Boton from './componentes/Boton'
import Pantalla from './componentes/Pantalla';
import BotonClear from './componentes/BotonClear';
import { useState } from 'react';
import { evaluate } from 'mathjs';

function App() {

  const [input, setInput] = useState('');
const [resultadoCalculado, setResultadoCalculado] = useState(false); // Nueva variable de estado

const operadores = ['+', '-', '*', '/'];

const agregarInput = val => {
  // Evitar que se agreguen operadores consecutivos
  if (operadores.includes(input.slice(-1)) && operadores.includes(val)) {
    alert("No se pueden ingresar dos operadores seguidos");
  } else {
    // Si se ha calculado un resultado, reiniciar el input al ingresar un nuevo valor
    if (resultadoCalculado) {
      setInput(val);
      setResultadoCalculado(false); // Resetear el estado para permitir una nueva operación
    } else {
      setInput(input + val); // Actualizar el input
    }
  }
};

const calcularResultado = () => {
  if (input) {
    // Verificar si el último carácter es un operador
    if (operadores.includes(input.slice(-1))) {
      alert("Falta un número para completar la operación");
    } else if (input.includes('/0')) {
      alert("No se puede dividir entre cero");
      setInput('');
    } else if (resultadoCalculado) {
      // Si ya se ha calculado el resultado y el usuario intenta calcular de nuevo
      alert("No puedes repetir la operación sin ingresar más valores");
    } else {
      const resultado = evaluate(input);
      setInput(resultado.toString()); // Convertir el resultado a cadena
      setResultadoCalculado(true); // Indicar que se ha realizado un cálculo
    }
  } else {
    alert("Por favor ingrese valores para realizar los cálculos");
  }
};

  
  return (
    <div className='App'>
      <div className='freecodecamp-logo-contenedor'>
        <Logo/>
      </div>

      <div className='contenedor-calculadora'>
        <Pantalla input={input} />

        <div className='fila'>
          <Boton manejarClic={agregarInput}>1</Boton>
          <Boton manejarClic={agregarInput}>2</Boton>
          <Boton manejarClic={agregarInput}>3</Boton>
          <Boton manejarClic={agregarInput}>+</Boton>
        </div>

        <div className='fila'>
          <Boton manejarClic={agregarInput}>4</Boton>
          <Boton manejarClic={agregarInput}>5</Boton>
          <Boton manejarClic={agregarInput}>6</Boton>
          <Boton manejarClic={agregarInput}>-</Boton>
        </div>

        <div className='fila'>
          <Boton manejarClic={agregarInput}>7</Boton>
          <Boton manejarClic={agregarInput}>8</Boton>
          <Boton manejarClic={agregarInput}>9</Boton>
          <Boton manejarClic={agregarInput}>*</Boton>
        </div>

        <div className='fila'>
          <Boton manejarClic={calcularResultado}>=</Boton>
          <Boton manejarClic={agregarInput}>0</Boton>
          <Boton manejarClic={agregarInput}>.</Boton>
          <Boton manejarClic={agregarInput}>/</Boton>
        </div>

        <div className='fila'>
          <BotonClear manejarClear ={() => setInput('')}>
            Clear
          </BotonClear>
        </div>
      </div>
      
    </div>
  );
}

export default App;
