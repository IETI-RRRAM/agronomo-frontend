import './AnimalCard.css';
import InfoCard from 'components/infoCard/InfoCard';
const AnimalInfo = () => {

    const dataAnimal: {[key: string]: string} =  {
      name: "Vaquerita",
      type: "Cow",
      gender: "M",
      race: "Normando",
      production: "Leche",
      birthdate: "1 Dec 2018",
      weight: "200 kg"
    }

    return (
        <div className="contenedor">

            <div>
                <h1 className='title'>Información del Animal</h1>
            </div>
            
            <div className="informacion-animal">

                <div className='info-principal'>
                  <h2 className='name-animal'>Nombre Vaca</h2>
                  <img className='image-animal' src="https://media.istockphoto.com/id/1205758678/es/foto/cabeza-de-vaca-blanca-y-negra-madura-aspecto-suave-nariz-rosa-delante-de-un-cielo-azul.jpg?b=1&s=612x612&w=0&k=20&c=Ra0ApF1-ZSF8XuR8g2eNy2UNAKAzj0bdsS60HxTviWI=" alt="Animal" />
                  <div className='info-icons'>

                  <span className="material-symbols-outlined icon-animal">
                    female
                  </span>

                  <span className="material-symbols-outlined icon-animal">
                    local_drink
                  </span>

                  </div>
                </div>
                
                <div className='info-general'>
                  <InfoCard cardTitle='Detalles Animal' info={dataAnimal}/>
                </div>

            </div>
        </div>
    )
}
export default AnimalInfo;