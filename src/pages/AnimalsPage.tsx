import Collection from 'components/collections/Collection';
import { useParams } from 'react-router-dom';

const AnimalsPage = () => {
  const { id } = useParams();

  return (
    <Collection 
      title={'Tus Animales'} 
      cardTitle={'Animales'} 
      cardDescription={'En esta página puedes ver tus animales asociados al rancho, editarlos y poder añadir'}
      endpointUrl='https://jsonplaceholder.typicode.com/posts'
      iconUrl='/src/assets/fence.svg'
      addUrl='/animals/new'
      editUrl='/animals/edit/'
      cardUrl='/animal/'
    />
  )
}
  
export default AnimalsPage;