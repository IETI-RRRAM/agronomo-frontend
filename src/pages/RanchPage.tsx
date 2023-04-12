import Collection from 'components/collections/Collection';
import { useParams } from 'react-router-dom';

const RanchPage = () => {
  const { id } = useParams();

  const dataRanch: {[key: string]: string} =  {
    Nombre: "Potrero " + id,
    Propósito: "Cuidado primario pollos",
    Lugar:  "Cogua",
    Area: "5 fanegadas",
  }

  return (
    <Collection 
      title={'Tus Ranchos'} 
      cardTitle={'Ranchos'} 
      cardDescription={'En esta página puedes ver tus ranchos, editarlos o seleccionar uno para poder visualizar los animales de este rancho'}
      endpointUrl='https://jsonplaceholder.typicode.com/posts'
      iconUrl='/src/assets/fence.svg'
      addUrl='/ranches/new'
      editUrl='/ranches/edit/'
      cardUrl='/animals/'
      infoCardTitle='Información del potrero a la que pretenece el rancho'
      infoCard={dataRanch}
      haveInfo
    />
  )
}
  
export default RanchPage;