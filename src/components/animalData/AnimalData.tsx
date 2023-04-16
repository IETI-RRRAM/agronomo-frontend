import AnimalDataFinance from 'src/components/animalData/AnimalDataFinance';
import AnimalDataGeneral from 'src/components/animalData/AnimalDataGeneral';
import AnimalDataHealth from 'src/components/animalData/AnimalDataHealth';
import AnimalDataProduction from 'src/components/animalData/AnimalDataProduction';
import AnimalDataReproduction from 'src/components/animalData/AnimalDataReproduction';
import React from 'react';
import './AnimalData.css';

interface FormProps {
    id: undefined | string;
    isEdit: undefined | boolean;
}  

const AnimalData = ({id, isEdit}: FormProps) => {

    const componentes = [AnimalDataGeneral, AnimalDataFinance, AnimalDataHealth, AnimalDataProduction, AnimalDataReproduction];
    
    const [isValid, setIsValid] = React.useState(false);

    const handleClickButton = () => {
      console.log("Puede Enviar");
    }

    return (

    <div className="component-container">

        <div className='data-title'><h1>{(!isEdit)?"Agrega un nuevo Animal":"Edita la información del Animal"}</h1></div>

        {componentes.map((Componente, index) => (
          <div className='component' key={index}>
            <Componente key={index} id={id} isEdit={isEdit}/>
          </div>
        ))}

        <button onClick={handleClickButton} className='data-button' disabled={!isValid}>Enviar</button>
    </div>

    );
}


export default AnimalData;