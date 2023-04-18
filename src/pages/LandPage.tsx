import Collection from 'components/collections/Collection';
import { useParams } from 'react-router-dom';

const LandPage = () => {
  
  const { id } = useParams();

  const dataRanch: {[key: string]: string} =  {
    Nombre: "Granja Gallina Feliz",
    Propósito: "Granja de huevos",
    Lugar:  "Cogua",
    Area: "20 fanegadas",
  }

  return (
    <Collection 
      title={'Tus Potreros'} 
      cardTitle={'Potreros'} 
      cardDescription={'En esta página puedes ver tus potreros, editarlos o seleccionar uno para poder visualizar los ranchos del potrero deseado'}
      endpointUrl='https://jsonplaceholder.typicode.com/posts'
      iconUrl='/src/assets/grid.svg'
      addUrl='/lands/new'
      editUrl='/lands/edit/'
      cardUrl='/ranches/'
      infoCardTitle='Información de la granja a la que pretenece el potrero'
      infoCard={dataRanch}
      haveInfo
    />
  )
}
  
export default LandPage;