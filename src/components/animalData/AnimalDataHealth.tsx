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
import {postService} from '../../services/postServices';
import getService from 'src/services/getService';
import {putService} from 'src/services/putService';

interface FormTypeGeneral {
  status: undefined | string;
}

interface FormProps {
  id: undefined | string;
  isEdit: boolean;
}

const AnimalDataHealth = ({id, isEdit}: FormProps) => {

    const [idHealth, setIdHealth] = useState('643701dd2e851b2cd7ce4360');

    useEffect(() => {
        if (isEdit) {
            getService("https://health-rest-service-production.up.railway.app/api/health/" + idHealth)
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
    }, [isEdit])

    //Data General
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

    const onSubmit = (event: any): void => {
      const formData = {
        idAnimal: id,
        status: status,
        treatments: listTreatments,
        meds: listMeds,
        alerts: listAlerts,
      };
      event.preventDefault();
      clearVariable();
      if (!isEdit) {
        postService("https://health-rest-service-production.up.railway.app/api/health", formData);
      } else {
        putService("https://health-rest-service-production.up.railway.app/api/health/" + idHealth, formData);
      }
    };

    const clearVariable = () => {
      setStatus('');
      setListTreatments([]);
      setListMeds([]);
      setListAlerts([]);
      setValidFormGeneral({
        status: undefined,
      });
      setOpenDropdown(false);
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

    const isValidGeneral = Object.keys(validFormGeneral).every(
      (key) => validFormGeneral[key as keyof typeof validFormGeneral] === ''
    )

    return (
    <>
      <Form title={isEdit ? 'Edita los datos de Salud' : 'Añade los datos de Salud'} onSubmit={onSubmit} isValid={isValidGeneral} buttonText={isEdit ? 'Editar' : 'Crear'}>
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