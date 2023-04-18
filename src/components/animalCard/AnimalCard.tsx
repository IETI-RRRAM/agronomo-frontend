import { useParams } from 'react-router-dom';
import { useEffect, useState} from 'react';
import AnimalActions from 'components/animalActions/AnimalActions';
import InfoCard from 'components/infoCard/InfoCard';
import HelpButton from 'src/components/buttons/help/HelpButton';
import Modal from '../modal/Modal';
import getService from 'src/services/getService';
import Dropdown from '../dropdown/Dropdown';
import './AnimalCard.css';

const AnimalInfo = () => {

    const { id } = useParams();
    const [nameAnimal, setNameCow] = useState('Vaca');
    const [imageAnimal, setImageAnimal] = useState('https://media.istockphoto.com/id/1205758678/es/foto/cabeza-de-vaca-blanca-y-negra-madura-aspecto-suave-nariz-rosa-delante-de-un-cielo-azul.jpg?b=1&s=612x612&w=0&k=20&c=Ra0ApF1-ZSF8XuR8g2eNy2UNAKAzj0bdsS60HxTviWI=');
    
    const [openModal, setOpenModal] = useState(false);
    const [optionData, setOptionData] = useState('');
    const [listOptionData, setListOptionData] = useState<object>([]);

    const [dataGeneral, setDataGeneral] = useState<any>([]);
    const [dataFinance, setDataFinance] = useState<object>([]);
    const [dataProduction, setDataProduction] = useState<object>([]);
    const [dataReproduction, setDataReproduction] = useState<object>([]);
    const [dataHealth, setDataHealth] = useState<object>([]);

    useEffect(() => {
      getService("https://animal-rest-service-production.up.railway.app/api/animals/" + id)
        .then((response) => {
        setNameCow(response.name);
        setDataGeneral(response);
      });
      getService("https://finance-rest-service-production.up.railway.app/api/finance/animal/" + id)
        .then((response) => {
        if (response.status != '404') setDataFinance(response);
      });
      getService("https://production-rest-service-production.up.railway.app/api/production/animal/" + id).then((response) => {
        if (response.status != '404') setDataProduction(response);
      });
      getService("https://reproduction-rest-service-production.up.railway.app/api/reproduction/animal/" + id).then((response) => {
        if (response.status != '404') setDataReproduction(response);
      });
      getService("https://health-rest-service-production.up.railway.app/api/health/animal/" + id).then((response) => {
        if (response.status != '404') setDataHealth(response);
      });
    }, [])

    const handleClickButton = (option: string) => {
      setOptionData(option);
      if (option == 'Información Salud') setListOptionData(dataHealth);
      else if (option == 'Información Producción') setListOptionData(dataProduction);
      else if (option == 'Información Reproducción') setListOptionData(dataReproduction);
      else if (option == 'Información Finanzas') setListOptionData(dataFinance);
      else setListOptionData(dataGeneral);
      handleClickModal();
    } 

    const handleClickModal = () => {
      setOpenModal((value) => !value);
    } 

    return (
        <div className="animalCard-container">

            <div>
                <h1 className='animalCard-title'>Información del Animal</h1>
            </div>
            
            <div className="information-animal">

                <div className='info-main'>
                  <h2 className='name-animal'>{nameAnimal}</h2>
                  <img className='image-animal' src={imageAnimal} alt="Animal" />
                  <AnimalActions handleClick={handleClickButton} />
                </div>
                
                <div className='info-general'>
                  <InfoCard cardTitle="Información General" info={dataGeneral}/>
                </div>
                
            </div>

            {openModal && (
              <Modal>
                {
                  <Dropdown
                    title="Ver Datos"
                    onClicDropdown={handleClickModal}
                    >
                    <InfoCard cardTitle={optionData} info={listOptionData}/>
                  </Dropdown>
                }
              </Modal> 
            )}

            <HelpButton title="Detalles Animal" description="En esta sección encontraras toda la información del Animal, Datos generales, producción, reproducción, finanzas y salud." />
        </div>
    )
}
export default AnimalInfo;