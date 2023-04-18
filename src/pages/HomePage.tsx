import Collection from 'src/components/collections/Collection';

function HomePage() {
  return (
    <Collection 
        title={'Tus Granjas'} 
        cardTitle={'Granjas'} 
        cardDescription={'En esta página puedes ver tus granjas, editarlas o seleccionar una para poder visualizar los potreros de esa granja'}
        endpointUrl={`${import.meta.env.VITE_BASE_URL_FARM}v1/farm/own/${localStorage.getItem("userId")}`}
        iconUrl='src/assets/tractor.svg'
        addUrl='/farms/new'
        editUrl='/farms/edit/'
        cardUrl='/lands/'
      />
    );
  }
  
  export default HomePage;