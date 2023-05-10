import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AnimalData from 'src/components/animalData/AnimalData';

const NewAnimalPage = () => {
    
    let { idRanch } = useParams();

    useEffect(() => {
      console.log("New Animal Page, idRanch = " + idRanch)
    }, [])

    return (
      <AnimalData idRancho={idRanch} isEdit={false}/>
    );
}


export default NewAnimalPage;