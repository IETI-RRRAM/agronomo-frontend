import { useParams } from 'react-router-dom';
import AnimalInfo from 'components/animalCard/AnimalCard';

const AnimalDataPage = () => {
  const { id } = useParams();

  return (
    <AnimalInfo />
  )
}
  
export default AnimalDataPage;