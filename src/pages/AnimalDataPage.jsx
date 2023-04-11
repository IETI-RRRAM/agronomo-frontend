import { useParams } from 'react-router-dom';
import FormData from '../components/formData/FormData';

const AnimalDataPage = () => {
  const { id } = useParams();

  return (
    <FormData />
  )
}
  
export default AnimalDataPage;