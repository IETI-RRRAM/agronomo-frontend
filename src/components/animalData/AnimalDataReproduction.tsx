import Form from 'components/form/Form';
import FormItem from 'components/formItem/FormItem';
import { useEffect, useState } from 'react';
import ItemButton from '../buttons/item/ItemButton';
import Dropdown from '../dropdown/Dropdown';
import Table from '../table/Table';

interface FormType {
  status: undefined | string;
  partner: undefined | string;
  nextHeat: undefined | string;
  cycleDuration: undefined | string;
}

interface FormProps {
  id: undefined | string;
  isEdit: undefined | boolean;
}

const AnimalDataReproduction = ({id, isEdit}: FormProps) => {

    //Datos quemados de prueba
    const data = [
      { id: 1, name: 'Prueba 1', age: 25 },
      { id: 2, name: 'Prueba 2', age: 30 },
      { id: 3, name: 'Prueba 3', age: 35 },
    ];

    const [status, setStatus] = useState('');
    const [partner, setPartner] = useState('');
    const [nextHeat, setNextHeat] = useState('');
    const [cycleDuration, setCicleDuration] = useState('');
    const [listBirths, setListBirths] = useState(data);
    const [listLastHeats, setListLastHeats] = useState(data);

    const [openDropdown, setOpenDropdown] = useState(false);
    const [optionDropdown, setOptionDropdown] = useState('');
    const [titleDropdown, setTitleDropdown] = useState('');
    const [listItemsDropdown, setListItemsDropdown] = useState(data);

    const [validForm, setValidForm] = useState<FormType>({
        status: undefined,
        partner: undefined,
        nextHeat: undefined,
        cycleDuration: undefined,
    });

    const onClicDropdown = () => {
      setOpenDropdown(value => !value);
    }

    const handleDelete = (index: number) => {
      let newList;
      if (optionDropdown == "births") newList = [...listBirths];
      else newList = [...listLastHeats];
      newList.splice(index, 1);
      if (optionDropdown == "births") setListBirths(newList);
      else setListLastHeats(newList);
      setListItemsDropdown(newList);
    };

    const onSubmit = (event: any): void => {
      const formData = {
        births: listBirths,
        status: status,
        partner: partner,
        lastHeats: listLastHeats,
        nextHeat: nextHeat,
        cycleDuration: cycleDuration,
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

    const handlePartnerChange = (event: any) => {
        const value = event.target.value;
        setValidForm({
          ...validForm,
          partner: value.length === 0 ? 'La pareja del animal es obligatorio' : ''
        });
        setPartner(value);
    }

    const handleNextHeatChange = (event: any) => {
        const value = event.target.value;
        setValidForm({
          ...validForm,
          nextHeat: value.length === 0 ? 'El siguien calor es obligatorio' : ''
        });
        setNextHeat(value);
    }

    const handleCycleDurationChange = (event: any) => {
        const value = event.target.value;
        setValidForm({
          ...validForm,
          cycleDuration: value.length === 0 ? 'El ciclo de duración es obligatorio' : ''
        });
        setCicleDuration(value);
    }

    const handleClickBirths = () => {
      setTitleDropdown('Lista de Nacimientos');
      setListItemsDropdown(listBirths);
      setOptionDropdown("births");
      if (!openDropdown) {
        onClicDropdown();
      }
    }

    const handleClickListLastHeats = () => {
      setTitleDropdown('Lista de Ultimos Calores');
      setListItemsDropdown(listLastHeats);
      setOptionDropdown("lastHeats");
      if (!openDropdown) {
        onClicDropdown();
      }
    }

    const isValid = Object.keys(validForm).every(
      (key) => validForm[key as keyof typeof validForm] === ''
    )

    return (
      <>
      <Form title={isEdit ? 'Edita los datos de Reproducción' : 'Añade los datos de Reproducción'} onSubmit={onSubmit} isValid={isValid} buttonText={isEdit ? 'Editar' : 'Crear'}>
    
      <FormItem 
          title={'Estado Animal:'}
          placeHolder={'Ingrese el estado del animal'}
          type={'text'}
          value={status}
          onChagne={handleStatusChange}
          error={validForm.status}
      />
      <FormItem 
          title={'Pareja Reproductiva:'}
          placeHolder={'Ingrese la pareja reproductiva del animal'}
          type={'text'}
          value={partner}
          onChagne={handlePartnerChange}
          error={validForm.partner}
      />
      <FormItem 
          title={'Siguiente Calor:'}
          placeHolder={'Ingrese el siguiente calor del animal'}
          type={'date'}
          value={status}
          onChagne={handleNextHeatChange}
          error={validForm.nextHeat}
      />
      <FormItem 
          title={'Ciclo de Duración:'}
          placeHolder={'Ingrese el ciclo de duración'}
          type={'number'}
          value={status}
          onChagne={handleCycleDurationChange}
          error={validForm.cycleDuration}
      />
      <ItemButton 
          title={'Nacimientos:'} 
          value={'Ver Lista de Nacimientos'}
          onClick={handleClickBirths}
      />
      <ItemButton 
          title={'Ultimos Calores:'} 
          value={'Ver Lista de Ultimos Calores'}
          onClick={handleClickListLastHeats}
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

export default AnimalDataReproduction;