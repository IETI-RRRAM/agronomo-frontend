import Form from 'components/form/Form';
import FormItem from 'components/formItem/FormItem';
import { useEffect, useState } from 'react';
import ItemButton from '../buttons/item/ItemButton';
import Dropdown from '../dropdown/Dropdown';
import Table from '../table/Table';
import Modal from '../modal/Modal';
import FormAddBirth from '../formAddAnimal/FormAddBirth';
import FormAddLastHeats from '../formAddAnimal/FormAddLastHeats';
import {postService} from '../../services/postServices';
import getService from 'src/services/getService';
import {putService} from 'src/services/putService';

interface FormType {
  status: undefined | string;
  partner: undefined | string;
  cycleDuration: undefined | string;
}

interface FormProps {
  id: undefined | string;
  isEdit: boolean;
}

const AnimalDataReproduction = ({id, isEdit}: FormProps) => {

    const [idReproduction, setIdReproduction] = useState('6437209782757a3042370df6');

    useEffect(() => {
      if (isEdit) {
        getService("https://reproduction-rest-service-production.up.railway.app/api/reproduction/" + idReproduction)
        .then((response) => {
            setIdReproduction(response.id);
            setListBirths(response.births);
            setStatus(response.status);
            setPartner(response.partner);
            setListLastHeats(response.lastHeats);
            setCicleDuration(response.cycleDuration);
            setValidForm({
              status: '',
              partner: '',
              cycleDuration: ''
            });
        });
      }
    }, [isEdit])

    const [status, setStatus] = useState('');
    const [partner, setPartner] = useState('');
    const [cycleDuration, setCicleDuration] = useState('');
    const [listBirths, setListBirths] = useState<string[]>([]);
    const [listLastHeats, setListLastHeats] = useState<string[]>([]);

    const [openDropdown, setOpenDropdown] = useState(false);
    const [optionDropdown, setOptionDropdown] = useState('');
    const [titleDropdown, setTitleDropdown] = useState('');
    const [listItemsDropdown, setListItemsDropdown] = useState([{}]);

    const [validForm, setValidForm] = useState<FormType>({
        status: undefined,
        partner: undefined,
        cycleDuration: undefined,
    });

    //Modal
    const [openModal, setOpenModal] = useState(false);
    const handleClickModal = () => {
      setOpenModal(value => !value);
    }

    //Dropdown
    const onClickDropdown = () => {
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

    const addNewItem = (item: string) => {
      setOpenModal(false);
      let newList;
      if (optionDropdown == "births") {
        newList = [...listBirths];
        newList.push(JSON.parse(item));
        setListBirths(newList);
      } else {
        newList = [...listLastHeats];
        newList.push(JSON.parse(item));
        setListLastHeats(newList);
      }
      setListItemsDropdown(newList);
    } 

    const onSubmit = (event: any): void => {
      const formData = {
        idAnimal: id,
        births: listBirths,
        status: status,
        partner: partner,
        lastHeats: [new Date()],
        cycleDuration: cycleDuration,
      };
      event.preventDefault();
      clearVariable();
      if (!isEdit) {
        postService("https://reproduction-rest-service-production.up.railway.app/api/reproduction", formData);
      } else {
        putService("https://reproduction-rest-service-production.up.railway.app/api/reproduction/" + idReproduction, formData);
      }
    };

    const clearVariable = () => {
      setStatus('');
      setPartner('');
      setCicleDuration('');
      setListBirths([]);
      setListLastHeats([]);
      setValidForm({
        status: undefined,
        partner: undefined,
        cycleDuration: undefined,
      });
      setOpenDropdown(false);
    }

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

    const handleCycleDurationChange = (event: any) => {
        const value = event.target.value;
        setValidForm({
          ...validForm,
          cycleDuration: value.length === 0 ? 'El ciclo de duración es obligatorio' : ''
        });
        setCicleDuration(value);
    }

    const handleClickBirths = (event: any): void => {
      event.preventDefault();
      setTitleDropdown('Lista de Nacimientos');
      setListItemsDropdown(listBirths);
      setOptionDropdown("births");
      if (!openDropdown) {
        onClickDropdown();
      }
    }

    const handleClickListLastHeats = (event: any): void => {
      event.preventDefault();
      setTitleDropdown('Lista de Ultimos Calores');
      setListItemsDropdown(listLastHeats);
      setOptionDropdown("lastHeats");
      if (!openDropdown) {
        onClickDropdown();
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
          title={'Ciclo de Duración:'}
          placeHolder={'Ingrese el ciclo de duración'}
          type={'number'}
          value={cycleDuration}
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
        onClicDropdown={onClickDropdown}
        >
        <Table 
        listObjects={listItemsDropdown}
        onDelete={handleDelete}
        onAdd={handleClickModal}
        isEdit={true}
        />
        </Dropdown>
      }
      {
        openModal && (
          <Modal>
              {
              (optionDropdown == "births") &&
              <Dropdown
                title='Agregar un Nacimiento'
                onClicDropdown={handleClickModal}
              >
              <FormAddBirth newItem={addNewItem}/>
              </Dropdown>
              }
              {
              (optionDropdown == "lastHeats") &&
              <Dropdown
                title='Agregar una Fecha'
                onClicDropdown={handleClickModal}
              >
              <FormAddLastHeats newItem={addNewItem}/>
              </Dropdown>
              }
          </Modal>
        )
      }
      </>
    );
}

export default AnimalDataReproduction;