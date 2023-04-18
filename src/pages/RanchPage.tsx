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
      endpointUrl={`${import.meta.env.VITE_BASE_URL_FARM}v1/ranch/own/${id}`}
      iconUrl='/src/assets/fence.svg'
      addUrl={`/ranches/new/${id}`}
      editUrl='/ranches/edit/'
      cardUrl='/animals/'
      infoCardTitle='Información del potrero a la que pretenece el rancho'
      infoCard={dataRanch}
      haveInfo
    />
  )
}
  
export default RanchPage;