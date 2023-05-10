import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import AnimalData from 'src/components/animalData/AnimalData';

const NewAnimalPage = () => {
    
    let { idRanch } = useParams();

    const locationRoute = useLocation();

    useEffect(() => {
      console.log("New Animal Page, idRanch = " + idRanch)
    }, [])

    return (
      <AnimalData idRancho={idRanch} isEdit={false}/>
    );
}


export default NewAnimalPage;