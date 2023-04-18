import Collection from 'components/collections/Collection';
import { useParams } from 'react-router-dom';

const LandPage = () => {
  const { id } = useParams();

  return (
    <Collection 
      title={'Tus Potreros'} 
      cardTitle={'Potreros'} 
      cardDescription={'En esta página puedes ver tus potreros, editarlos o seleccionar uno para poder visualizar los ranchos del potrero deseado'}
      endpointUrl={`${import.meta.env.VITE_BASE_URL_FARM}v1/land/own/${id}`}
      iconUrl='/src/assets/grid.svg'
      addUrl='/lands/new'
      editUrl='/lands/edit/'
      cardUrl='/ranches/'
      infoCardTitle='Información de la granja a la que pretenece el potrero'
      haveInfo
    />
  )
}
  
export default LandPage;