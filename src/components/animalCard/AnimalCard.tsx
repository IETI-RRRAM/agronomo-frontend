import { useParams } from 'react-router-dom';
import { useEffect, useState} from 'react';
import AnimalActions from 'components/animalActions/AnimalActions';
import InfoCard from 'components/infoCard/InfoCard';
import HelpButton from 'src/components/buttons/help/HelpButton';
import Modal from '../modal/modal';
import getService from 'src/services/getService';
import './AnimalCard.css';

const AnimalInfo = () => {

    const { id } = useParams();
    const [nameCow, setNameCow] = useState('Vaquerita');
    const [animalInfo, setAnimalInfo] = useState({});
    const [selectedButton, setSelectedButton] = useState('General');
    const [cardTitle, setCardTitle] = useState('Detalles Animal');
    const [openModal, setOpenModal] = useState(true);

    useEffect(() => {
      //getService(getUrl()).then((response) => {
      //  setAnimalInfo(response.json());
      //  if (selectedButton == 'General') setNameCow(response.json().name);
      //});
      setCardTitle(selectedButton);
      //Utilizamos data general para probar
      setAnimalInfo(dataGeneral);
    }, [selectedButton])

    const getUrl = () => {
        if (selectedButton == 'Salud') {
          return "url-Salud";
        } else if (selectedButton == 'Producción') {
          return "url-Producción";
        } else if (selectedButton == 'Reproducción') {
          return "url-Reproducción";
        } else if (selectedButton == 'Finanzas') {
          return "url-Finanzas";
        } else {
          return "url-General";
        }
    }

    const dataGeneral = {
      id: "1",
      idRanch: "12",
      name: "Vaquerita",
      type: "Cow",
      gender: "H",
      stage: "Engorde",
      weight: "100 kilos",
      breed: "Normando",
      age: "18 meses"
    }

    return (
        <div className="contenedor">

            <div>
                <h1 className='title'>Información del Animal</h1>
            </div>

            {/*Prueba de Modal*/}
            {/*En el siguiente commit se ajustara la información que llevara*/}
            {openModal && (
              <Modal>
                  <InfoCard cardTitle={cardTitle} info={animalInfo}/>
                  <button onClick={() => setOpenModal(false)}>Salir</button>
              </Modal> 
            )}
            
            <div className="informacion-animal">

                <div className='info-principal'>
                  <h2 className='name-animal'>{nameCow}</h2>
                  <img className='image-animal' src="https://media.istockphoto.com/id/1205758678/es/foto/cabeza-de-vaca-blanca-y-negra-madura-aspecto-suave-nariz-rosa-delante-de-un-cielo-azul.jpg?b=1&s=612x612&w=0&k=20&c=Ra0ApF1-ZSF8XuR8g2eNy2UNAKAzj0bdsS60HxTviWI=" alt="Animal" />
                </div>
                
                <div className='info-general'>
                  <InfoCard cardTitle={cardTitle} info={animalInfo}/>
                </div>
                
                <AnimalActions changeSection={setSelectedButton}/>
            </div>

            <HelpButton title="Detalles Animal" description="En esta sección encontraras toda la información del Animal, Datos generales, producción, reproducción, finanzas y salud." />
        </div>
    )
}
export default AnimalInfo;