import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AnimalData from 'src/components/animalData/AnimalData';

const NewAnimalPage = () => {
    const [isEdit, setIsEdit] = useState(false);
    
    let { id } = useParams();

    useEffect(() => {
      console.log("Id " + id);
      if (id) {
        setIsEdit(true);
        // getService(id) SE DEBE HACER CONSULTA DE ESE ANIMAL
      }
    }, [])

    return (
      <AnimalData id={id} isEdit={isEdit}/>
    );
}


export default NewAnimalPage;