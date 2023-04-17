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

    //Datos Quemados
    const dataGeneralCow= {
      id: "1",
      idRanch: "12",
      name: "Vaquerita",
      type: "Cow",
      gender: "H",
      stage: "Engorde",
      weight: "100 kilos",
      breed: "Normando",
      age: "18 meses",
    }

    const dataGeneralNew = {
      id: "1",
      idRanch: "12",
      name: "Vaquerita",
      lista1: [
      {"name": "camilo", "edad": "12", "email": "yesid@mail.com"},
      {"name": "camilo", "edad": "12", "email": "yesid@mail.com"}],
      lista2: [
      {"name": "camilo", "edad": "12", "email": "yesid@mail.com"},
      {"name": "camilo", "edad": "12", "email": "yesid@mail.com"}],
      object: {"name": "camilo", "edad": "12", "email": "yesid@mail.com"},
    }

    const { id } = useParams();
    const [nameAnimal, setNameCow] = useState('Vaquerita');
    const [imageAnimal, setImageAnimal] = useState('https://media.istockphoto.com/id/1205758678/es/foto/cabeza-de-vaca-blanca-y-negra-madura-aspecto-suave-nariz-rosa-delante-de-un-cielo-azul.jpg?b=1&s=612x612&w=0&k=20&c=Ra0ApF1-ZSF8XuR8g2eNy2UNAKAzj0bdsS60HxTviWI=');
    const [openModal, setOpenModal] = useState(false);

    const [optionData, setOptionData] = useState('');
    const [listOptionData, setListOptionData] = useState<object>([]);

    const [dataGeneral, setDataGeneral] = useState<object>([]);
    const [dataFinance, setDataFinance] = useState<object>([]);
    const [dataProduction, setDataProduction] = useState<object>([]);
    const [dataReproduction, setDataReproduction] = useState<object>([]);
    const [dataHealth, setDataHealth] = useState<object>([]);

    useEffect(() => {
      //getService("url-General").then((response) => {
      //  setDataGeneral(response.json());
      //});
      //getService("url-Finance").then((response) => {
      //  setDataFinance(response.json());
      //});
      //getService("url-Production").then((response) => {
      //  setDataProduction(response.json());
      //});
      //getService("url-Reproduction").then((response) => {
      //  setDataReproduction(response.json());
      //});
      //getService("url-Health").then((response) => {
      //  setDataHealth(response.json());
      //});
    }, [])

    const handleClickButton = (option: string) => {
      setOptionData(option);
      if (option == 'Información Salud') setListOptionData(dataGeneralNew);
      else if (option == 'Información Producción') setListOptionData(dataGeneralNew);
      else if (option == 'Información Reproducción') setListOptionData(dataGeneralNew);
      else if (option == 'Información Finanzas') setListOptionData(dataGeneralNew);
      else setListOptionData(dataGeneralCow);
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
                  <InfoCard cardTitle="Información General" info={dataGeneralCow}/>
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