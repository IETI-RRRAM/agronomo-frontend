import Form from 'components/form/Form';
import FormItem from 'components/formItem/FormItem';
import { useEffect, useState } from 'react';
import Dropdown from '../dropdown/Dropdown';
import Table from '../table/Table';
import ItemButton from '../buttons/item/ItemButton';
import Modal from '../modal/Modal';
import FormAddTreatments from '../formAddAnimal/FormAddTreatments';
import FormAddMed from '../formAddAnimal/FormAddMed';
import FormAddAlert from '../formAddAnimal/FormAddAlert';
import getService from 'src/services/getService';

interface FormTypeGeneral {
  status: undefined | string;
}

interface FormProps {
  id: undefined | string;
  isEdit: boolean;
  validFormAnimal: FormTypeAnimal;
  setValidFormAnimal: React.Dispatch<React.SetStateAction<any>>;
  validFormAnimalData: FormTypeData;
  setValidFormAnimalData: React.Dispatch<React.SetStateAction<any>>;
}

interface FormTypeAnimal {
  general: boolean;
  finance: boolean;
  health: boolean;
  production: boolean;
  reproduction: boolean;
}

interface FormTypeData {
  general: {};
  finance: {};
  health: {};
  production: {};
  reproduction: {};
}

interface FormTypeId {
  general: string | undefined;
  finance: string | undefined;
  health: string | undefined;
  production: string | undefined;
  reproduction: string | undefined;
}

const AnimalDataHealth = ({id, isEdit, validFormAnimal, setValidFormAnimal, validFormAnimalData, setValidFormAnimalData}: FormProps) => {

    //Data General
    const [idHealth, setIdHealth] = useState('');
    const [status, setStatus] = useState('');
    const [listTreatments, setListTreatments] = useState<string[]>([]);
    const [listMeds, setListMeds] = useState<string[]>([]);
    const [listAlerts, setListAlerts] = useState<string[]>([]);

    //Dropdown Table
    const [openDropdown, setOpenDropdown] = useState(false);
    const [optionDropdown, setOptionDropdown] = useState('');
    const [titleDropdown, setTitleDropdown] = useState('');
    const [listItemsDropdown, setListItemsDropdown] = useState([{}]);

    //Valid Forms
    const [validFormGeneral, setValidFormGeneral] = useState<FormTypeGeneral>({
      status: undefined,
    });

    useEffect(() => { 
      if (isEdit) {
          getService("https://health-rest-service-production.up.railway.app/api/health/animal/" + id)
          .then((response) => {
            setIdHealth(response.id);
            setStatus(response.status);
            setListTreatments(response.treatments);
            setListMeds(response.meds);
            setListAlerts(response.alerts);
            setValidFormGeneral({
              status: ''
            });
          });
      }
    }, [])

    //Modal 
    const [openModal, setOpenModal] = useState(false);

    const handleCloseModal = () => {
      setOpenModal(false);
    }

    const handleOpenModal = () => {
      setOpenModal(true);
    }

    const onClickDropdown = () => {
      setOpenDropdown(value => !value);
    }

    const handleDelete = (index: number) => {
      let newList;
      if (optionDropdown == "treatments") {
        newList = [...listTreatments];
      }
      else if (optionDropdown == "meds") {
        newList = [...listMeds];
      }
      else {
        newList = [...listAlerts];
      }
      newList.splice(index, 1);
      if (optionDropdown == "treatments") {
        setListTreatments(newList);
      }
      else if (optionDropdown == "meds") {
        setListMeds(newList);
      }
      else {
        setListAlerts(newList);
      }
      setListItemsDropdown(newList);
    };

    const addNewItem = (item: string) => {
      setOpenModal(false);
      let newList;
      if (optionDropdown == "meds") {
        newList = [...listMeds];
        newList.push(JSON.parse(item));
        setListMeds(newList);
      } else if (optionDropdown == "treatments") {
        newList = [...listTreatments];
        newList.push(JSON.parse(item));
        setListTreatments(newList);
      } else {
        newList = [...listAlerts];
        newList.push(JSON.parse(item));
        setListAlerts(newList);
      }
      setListItemsDropdown(newList);
    }

    useEffect(() => {
      const isValid = Object.keys(validFormGeneral).every(
        (key) => validFormGeneral[key as keyof typeof validFormGeneral] === ''
      )
      if (isValid) {
        setValidFormAnimal({
          ...validFormAnimal,
          health: true
        });
        onSubmitData();
      } else {
        setValidFormAnimal({
          ...validFormAnimal,
          health: false
        });
      }
    }, [validFormGeneral, listTreatments, listMeds, listAlerts, status])

    const onSubmitData = () => {
      let formData;
      if (isEdit) {
        formData = {
          id: idHealth,
          idAnimal: id,
          status: status,
          treatments: listTreatments,
          meds: listMeds,
          alerts: listAlerts,
        };
      } else {
        formData = {
          status: status,
          treatments: listTreatments,
          meds: listMeds,
          alerts: listAlerts,
        };
      }
      setValidFormAnimalData({
        ...validFormAnimalData,
        health: formData
      });
    }

    const handleStatusChange = (event: any) => {
      const value = event.target.value;
      setValidFormGeneral({
        ...validFormGeneral,
        status: value.length === 0 ? 'El estado del animal es obligatorio' : ''
      });
      setStatus(value);
    }

    const handleClickTreatments = (event: any): void => {
      event.preventDefault();
      setTitleDropdown('Lista de Tratamientos');
      setListItemsDropdown(listTreatments);
      setOptionDropdown("treatments");
      if (!openDropdown) {
        onClickDropdown();
      }
    }

    const handleClickMeds = (event: any): void => {
      event.preventDefault();
      setTitleDropdown('Lista de Medicamentos');
      setListItemsDropdown(listMeds);
      setOptionDropdown("meds");
      if (!openDropdown) {
        onClickDropdown();
      }
    }

    const handleClickAlerts = (event: any): void => {
      event.preventDefault();
      setTitleDropdown('Lista de Alertas');
      setListItemsDropdown(listAlerts);
      setOptionDropdown("alerts");
      if (!openDropdown) {
        onClickDropdown();
      }
    }

    return (
    <>
      <Form title={isEdit ? 'Edita los datos de Salud' : 'Añade los datos de Salud'} >
      <FormItem 
          title={'Estado Animal:'}
          placeHolder={'Ingrese el estado del animal'}
          type={'text'}
          value={status}
          onChagne={handleStatusChange}
          error={validFormGeneral.status}
      />
      <ItemButton 
          title={'Tratamientos:'} 
          value={'Ver Lista de Tratamientos'}
          onClick={handleClickTreatments}
      />
      <ItemButton 
          title={'Medicamentos:'} 
          value={'Ver Lista de Medicamentos'}
          onClick={handleClickMeds}
      />
      <ItemButton 
          title={'Alertas:'} 
          value={'Ver Lista de Alertas'}
          onClick={handleClickAlerts}
      />
      </Form>
      {
        (openDropdown) && 
        <Dropdown
        title={titleDropdown}
        onClicDropdown={onClickDropdown}
        >
        <Table 
        listObjects={listItemsDropdown}
        isEdit={true}
        onDelete={handleDelete}
        onAdd={handleOpenModal}
        />
        </Dropdown>
      }
        {openModal && (
            <Modal>
              {
                (optionDropdown == "treatments") &&
                <Dropdown
                title='Agregar un Tratamiento'
                onClicDropdown={handleCloseModal}
                >
                <FormAddTreatments newItem={addNewItem}/>
                </Dropdown>     
              }
              {
                (optionDropdown == "meds") &&
                <Dropdown
                title='Agregar un Medicamento'
                onClicDropdown={handleCloseModal}
                >
                <FormAddMed newItem={addNewItem}/>
                </Dropdown>     
              }
              {
                (optionDropdown == "alerts") &&
                <Dropdown
                title='Agregar una Alerta'
                onClicDropdown={handleCloseModal}
                >
                <FormAddAlert newItem={addNewItem}/>
                </Dropdown>     
              }
            </Modal> 
        )}
    </>
    );

}

export default AnimalDataHealth;