import Collection from 'src/components/collections/Collection';


function HomePage() {
    return (
      <Collection 
        title={'Tus Granjas'} 
        cardTitle={'Granjas'} 
        cardDescription={'En esta página puedes ver tus granjas, editarlas o seleccionar un para poder visualizar los potreros de esa granja'}
        urlEndpoint='https://jsonplaceholder.typicode.com/posts'
      />
    );
  }
  
  export default HomePage;