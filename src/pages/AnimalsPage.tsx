import Collection from 'components/collections/Collection';
import { useParams } from 'react-router-dom';

const AnimalsPage = () => {
  const { id } = useParams();

  return (
    <Collection 
      title={'Tus Animales'} 
      cardTitle={'Animales'} 
      cardDescription={'En esta página puedes ver tus animales asociados al rancho. Puedes añadir nuevos, editar y eliminar los agregados.'}
      endpointUrl='https://jsonplaceholder.typicode.com/posts'
      iconUrl='/src/assets/vaca.svg'
      addUrl='/animals/new'
      editUrl='/animals/edit/'
      cardUrl='/animal/'
    />
  )
}
  
export default AnimalsPage;