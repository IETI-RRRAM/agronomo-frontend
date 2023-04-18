import Collection from 'components/collections/Collection';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const AnimalsPage = () => {

  //Id para consultar Animales del Rancho
  const { id } = useParams();
  return (
    <Collection 
      title={'Tus Animales'} 
      cardTitle={'Animales'} 
      cardDescription={'En esta página puedes ver tus animales asociados al rancho. Puedes añadir nuevos, editar y eliminar los agregados.'}
      endpointUrl='https://animal-rest-service-production.up.railway.app/api/animals'
      iconUrl='/src/assets/vaca.svg'
      addUrl='/animals/new'
      editUrl={`/animals/edit/${id}`}
      cardUrl='/animal/'
    />
  )
}
  
export default AnimalsPage;