import Form from 'components/form/Form';
import FormItem from 'components/formItem/FormItem';
import { useEffect, useState } from 'react';
import Dropdown from '../dropdown/Dropdown';
import Table from '../table/Table';
import ItemButton from '../buttons/item/ItemButton';
import Modal from '../modal/Modal';
import FormAddProduct from '../formAddAnimal/FormAddProduct';
import {postService} from '../../services/postServices';
import getService from 'src/services/getService';
import {putService} from 'src/services/putService';

interface FormType {
  totalProduction: undefined | string;
}

interface FormProps {
  id: undefined | string;
  isEdit: boolean;
}

const AnimalDataProduction = ({id, isEdit}: FormProps) => {

    const [idProduction, setIdProduction] = useState('643710881bae917097607d0b');

    useEffect(() => {
      if (isEdit) {
        getService("https://production-rest-service-production.up.railway.app/api/production/" + idProduction)
        .then((response) => {
          setIdProduction(response.id);
          setListProducts(response.productions);
        });
      }
    }, [isEdit])

    const [listProducts, setListProducts] = useState<string[]>([]); 

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

    const onSubmit = (event: any): void => {
      const formData = {
        idAnimal: id,
        productions: listProducts,
      };
      event.preventDefault();
      clearVariable();
      if (!isEdit) {
        postService("https://production-rest-service-production.up.railway.app/api/production", formData);
      } else {
        putService("https://production-rest-service-production.up.railway.app/api/production/" + idProduction, formData);
      }
    };

    const clearVariable = () => {
      setListProducts([]);
      setOpenDropdown(false);
    }

    const handleClickProducs = (event: any): void => {
      event.preventDefault();
      setListItemsDropdown(listProducts);
      if (!openDropdown) {
        onClickDropdown();
      }
    }

    const isValid = true;

    return (
      <>
      <Form title={isEdit ? 'Edita los datos de Producción' : 'Añade los datos de Producción'} onSubmit={onSubmit} isValid={isValid} buttonText={isEdit ? 'Editar' : 'Crear'}>
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