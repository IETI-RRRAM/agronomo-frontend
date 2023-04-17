import AnimalDataFinance from 'src/components/animalData/AnimalDataFinance';
import AnimalDataGeneral from 'src/components/animalData/AnimalDataGeneral';
import AnimalDataHealth from 'src/components/animalData/AnimalDataHealth';
import AnimalDataProduction from 'src/components/animalData/AnimalDataProduction';
import AnimalDataReproduction from 'src/components/animalData/AnimalDataReproduction';
import { useNavigate } from 'react-router-dom';
import './AnimalData.css';

interface FormProps {
    id: undefined | string;
    isEdit: undefined | boolean;
}  

const AnimalData = ({id, isEdit}: FormProps) => {

    const componentes = [AnimalDataGeneral, AnimalDataFinance, AnimalDataHealth, AnimalDataProduction, AnimalDataReproduction];
    const navigate = useNavigate();

    return (

    <div className="component-container">

        <div className='data-title'><h1>{(!isEdit)?"Agrega un nuevo Animal":"Edita la información del Animal"}</h1></div>

        {componentes.map((Componente, index) => (
          <div className='component' key={index}>
            <Componente key={index} id={id} isEdit={isEdit}/>
          </div>
        ))}

        <button onClick={() => navigate(-1)} className='data-button'>Aceptar</button>
    </div>

    );
}


export default AnimalData;