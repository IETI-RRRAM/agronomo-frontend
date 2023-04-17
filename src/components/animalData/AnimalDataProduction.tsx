import Form from 'components/form/Form';
import FormItem from 'components/formItem/FormItem';
import { useEffect, useState } from 'react';
import Dropdown from '../dropdown/Dropdown';
import Table from '../table/Table';
import ItemButton from '../buttons/item/ItemButton';
import Modal from '../modal/Modal';
import FormAddProduct from '../formAddAnimal/FormAddProduct';

interface FormType {
  totalProduction: undefined | string;
}

interface FormProps {
  id: undefined | string;
  isEdit: undefined | boolean;
}

const AnimalDataProduction = ({id, isEdit}: FormProps) => {

    const [totalProduction, setTotalProduction] = useState('');
    const [listProducts, setListProducts] = useState<string[]>([]); 
    const [validForm, setValidForm] = useState<FormType>({
      totalProduction: undefined,
    });

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
        totalProduction: totalProduction,
      };
      event.preventDefault();
      clearVariable();
      console.log(formData);
    };

    const clearVariable = () => {
      setTotalProduction('');
      setListProducts([]);
      setValidForm({
        totalProduction: undefined,
      });
      setOpenDropdown(false);
    }

    const handleTotalProductionChange = (event: any) => {
      const value = event.target.value;
      setValidForm({
        ...validForm,
        totalProduction: value.length === 0 ? 'El total de producción es obligatorio' : ''
      });
      setTotalProduction(value);
    }

    const handleClickProducs = (event: any): void => {
      event.preventDefault();
      setListItemsDropdown(listProducts);
      if (!openDropdown) {
        onClickDropdown();
      }
    }

    const isValid = Object.keys(validForm).every(
      (key) => validForm[key as keyof typeof validForm] === ''
    )

    return (
      <>
      <Form title={isEdit ? 'Edita los datos de Producción' : 'Añade los datos de Producción'} onSubmit={onSubmit} isValid={isValid} buttonText={isEdit ? 'Editar' : 'Crear'}>
      <FormItem 
          title={'Total de Producción:'}
          placeHolder={'Ingrese el total de producción'}
          type={'text'}
          value={totalProduction}
          onChagne={handleTotalProductionChange}
          error={validForm.totalProduction}
      />
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