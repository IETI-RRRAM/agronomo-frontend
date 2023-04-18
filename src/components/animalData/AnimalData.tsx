import AnimalDataFinance from 'src/components/animalData/AnimalDataFinance';
import AnimalDataGeneral from 'src/components/animalData/AnimalDataGeneral';
import AnimalDataHealth from 'src/components/animalData/AnimalDataHealth';
import AnimalDataProduction from 'src/components/animalData/AnimalDataProduction';
import AnimalDataReproduction from 'src/components/animalData/AnimalDataReproduction';
import { useNavigate } from 'react-router-dom';
import getService from 'src/services/getService';
import { useEffect, useState } from 'react';
import './AnimalData.css';

interface FormProps {
    id: undefined | string;
    isEdit: boolean;
}  

const AnimalData = ({id, isEdit}: FormProps) => {

    const navigate = useNavigate();

    const [idAnimal, setIdAnimal] = useState(id);

    return (

    <div className="component-container">

        <div className='data-title'><h1>{(!isEdit)?"Agrega un nuevo Animal":"Edita la información del Animal"}</h1></div>

        <AnimalDataGeneral id={idAnimal} isEdit={isEdit} setId={setIdAnimal} /> 

        <AnimalDataFinance id={idAnimal} isEdit={isEdit}/>

        <AnimalDataHealth id={idAnimal} isEdit={isEdit}/>

        <AnimalDataProduction id={idAnimal} isEdit={isEdit}/>

        <AnimalDataReproduction id={idAnimal} isEdit={isEdit}/>

        <button onClick={() => navigate(-1)} className='data-button'>Aceptar</button>
    </div>

    );
}


export default AnimalData;