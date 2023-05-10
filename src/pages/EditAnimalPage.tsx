import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AnimalData from 'src/components/animalData/AnimalData';

const EditAnimalPage = () => {
    
    let { id } = useParams();

    return (
      <AnimalData idRancho={id} isEdit={true}/>
    );
}

export default EditAnimalPage;