import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import AnimalData from 'src/components/animalData/AnimalData';

const NewAnimalPage = () => {
    const [isEdit, setIsEdit] = useState(false);
    
    let { id } = useParams();

    const locationRoute = useLocation();

    useEffect(() => {
      if (locationRoute.pathname.includes('/edit')) {
        setIsEdit(true);
        // getService(id) SE DEBE HACER CONSULTA DE ESA GRANJA
      }
    }, [])

    return (
      <AnimalData id={id} isEdit={isEdit}/>
    );
}


export default NewAnimalPage;