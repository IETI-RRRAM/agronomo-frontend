import Form from 'components/form/Form';
import FormItem from 'components/formItem/FormItem';
import { useEffect, useState } from 'react';
import Dropdown from '../dropdown/Dropdown';
import Table from '../table/Table';
import ItemButton from '../buttons/item/ItemButton';

interface FormType {
  status: undefined | string;
}

interface FormProps {
  id: undefined | string;
  isEdit: undefined | boolean;
}

const AnimalDataHealth = ({id, isEdit}: FormProps) => {

    //Datos Quemados Para probar
    const dataMeds = [
      { id: 1, name: 'Med 1', age: 25 },
      { id: 2, name: 'Med 2', age: 30 },
      { id: 3, name: 'Med 3', age: 35 },
    ];
    const dataTreatments = [
      { id: 1, name: 'Treatments 1', age: 25 },
      { id: 2, name: 'Treatments 2', age: 30 },
      { id: 3, name: 'Treatments 3', age: 35 },
    ];
    const dataAlerts = [
      { id: 1, name: 'alerts 1', age: 25 },
      { id: 2, name: 'alerts 2', age: 30 },
      { id: 3, name: 'alerts 3', age: 35 },
    ];

    const [status, setStatus] = useState('');
    const [listTreatments, setListTreatments] = useState(dataTreatments);
    const [listMeds, setListMeds] = useState(dataMeds);
    const [listAlerts, setListAlerts] = useState(dataAlerts);

    const [openDropdown, setOpenDropdown] = useState(false);
    const [optionDropdown, setOptionDropdown] = useState('');
    const [titleDropdown, setTitleDropdown] = useState('');
    const [listItemsDropdown, setListItemsDropdown] = useState(dataTreatments);

    const [validForm, setValidForm] = useState<FormType>({
      status: undefined,
    });

    const onClicDropdown = () => {
      setOpenDropdown(value => !value);
    }

    const handleDelete = (index: number) => {
      let newList;
      if (optionDropdown == "treatments") newList = [...listTreatments];
      else if (optionDropdown == "meds") newList = [...listMeds];
      else newList = [...listAlerts];
      newList.splice(index, 1);
      if (optionDropdown == "treatments") setListTreatments(newList);
      else if (optionDropdown == "meds") setListMeds(newList);
      else setListAlerts(newList);
      setListItemsDropdown(newList);
    };

    const onSubmit = (event: any): void => {
      const formData = {
        status: status,
        treatments: listTreatments,
        meds: listMeds,
        alerts: listAlerts,
      };
      event.preventDefault();
      console.log(formData);
      // serviceAnimals(formData);
    };

    const handleStatusChange = (event: any) => {
      const value = event.target.value;
      setValidForm({
        ...validForm,
        status: value.length === 0 ? 'El estado del animal es obligatorio' : ''
      });
      setStatus(value);
    }

    const handleClickTreatments = () => {
      setTitleDropdown('Lista de Tratamientos');
      setListItemsDropdown(dataTreatments);
      setOptionDropdown("treatments");
      if (!openDropdown) {
        onClicDropdown();
      }
    }

    const handleClickMeds = () => {
      setTitleDropdown('Lista de Medicamentos');
      setListItemsDropdown(dataMeds);
      setOptionDropdown("meds");
      if (!openDropdown) {
        onClicDropdown();
      }
    }

    const handleClickAlerts = () => {
      setTitleDropdown('Lista de Alertas');
      setListItemsDropdown(dataAlerts);
      setOptionDropdown("alerts");
      if (!openDropdown) {
        onClicDropdown();
      }
    }

    const isValid = Object.keys(validForm).every(
      (key) => validForm[key as keyof typeof validForm] === ''
    )

    return (
    <>
      <Form title={isEdit ? 'Edita los datos de Salud' : 'Añade los datos de Salud'} onSubmit={onSubmit} isValid={isValid} buttonText={isEdit ? 'Editar' : 'Crear'}>
      <FormItem 
          title={'Estado Animal:'}
          placeHolder={'Ingrese el estado del animal'}
          type={'text'}
          value={status}
          onChagne={handleStatusChange}
          error={validForm.status}
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
        onClicDropdown={onClicDropdown}
        >
        <Table 
        listObjects={listItemsDropdown}
        onDelete={handleDelete}
        />
        </Dropdown>
      }
    </>
    );

}

export default AnimalDataHealth;