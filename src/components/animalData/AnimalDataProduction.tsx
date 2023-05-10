import Form from 'components/form/Form';
import { useEffect, useState } from 'react';
import Dropdown from '../dropdown/Dropdown';
import Table from '../table/Table';
import ItemButton from '../buttons/item/ItemButton';
import Modal from '../modal/Modal';
import FormAddProduct from '../formAddAnimal/FormAddProduct';
import getService from 'src/services/getService';

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

const AnimalDataProduction = ({id, isEdit, validFormAnimal, setValidFormAnimal, validFormAnimalData, setValidFormAnimalData}: FormProps) => {

    const [idProduction, setIdProduction] = useState('');
    const [listProducts, setListProducts] = useState<string[]>([]); 

    useEffect(() => {
      if (isEdit) {
        getService("https://production-rest-service-production.up.railway.app/api/production/animal/" + id)
        .then((response) => {
          setIdProduction(response.id);
          setListProducts(response.productions);
        });
      }
    }, [])

    //Dropdown
    const [openDropdown, setOpenDropdown] = useState(false);
    const [listItemsDropdown, setListItemsDropdown] = useState([{}]);

    //Modal
    const [openModal, setOpenModal] = useState(false);

    const handleClickModal = () => {
      setOpenModal(value => !value);
    }

    const onClickDropdown = () => {
      setOpenDropdown(value => !value);
    }

    const handleDelete = (index: number) => {
      const newList = [...listProducts];
      newList.splice(index, 1);
      setListProducts(newList);
      setListItemsDropdown(newList);
    };

    const addNewItem = (item: string) => {
      setOpenModal(false);
      const newList = [...listProducts];;
      newList.push(JSON.parse(item));
      setListProducts(newList);
      setListItemsDropdown(newList);
    }

    useEffect(() => {
      const isValid = listProducts.length > 0;
      if (isValid) {
        setValidFormAnimal({
          ...validFormAnimal,
          production: true
        });
        onSubmitData();
      } else {
        setValidFormAnimal({
          ...validFormAnimal,
          production: false
        });
      }
    }, [listProducts])

    const onSubmitData = () => {
      let formData;
      if (isEdit) {
        formData = {
          id: idProduction,
          idAnimal: id,
          productions: listProducts,
        };
      } else {
        formData = {
          productions: listProducts,
        };
      }
      setValidFormAnimalData({
        ...validFormAnimalData,
        production: formData
      });
    }

    const handleClickProducs = (event: any): void => {
      event.preventDefault();
      setListItemsDropdown(listProducts);
      if (!openDropdown) {
        onClickDropdown();
      }
    }

    return (
      <>
      <Form title={isEdit ? 'Edita los datos de Producción' : 'Añade los datos de Producción'}>
      <ItemButton 
          title={'Productos:'} 
          value={'Ver Lista de Productos'}
          onClick={handleClickProducs}
      />
      </Form>
      {
        (openDropdown) && 
        <Dropdown
        title="Lista de Producción"
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
              <Dropdown
                title='Agregar un Produto'
                onClicDropdown={handleClickModal}
              >
                <FormAddProduct newItem={addNewItem}/>
              </Dropdown>
          </Modal>
        )
      }
      </>
    );
}

export default AnimalDataProduction;