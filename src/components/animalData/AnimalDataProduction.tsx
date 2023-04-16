import Form from 'components/form/Form';
import FormItem from 'components/formItem/FormItem';
import { useEffect, useState } from 'react';
import Dropdown from '../dropdown/Dropdown';
import Table from '../table/Table';
import ItemButton from '../buttons/item/ItemButton';
interface FormType {
  totalProduction: undefined | string;
}

interface FormProps {
  id: undefined | string;
  isEdit: undefined | boolean;
}

const AnimalDataProduction = ({id, isEdit}: FormProps) => {

    //Datos quemados de prueba
    const data = [
      { id: 1, name: 'Prueba 1', age: 25 },
      { id: 2, name: 'Prueba 2', age: 30 },
      { id: 3, name: 'Prueba 3', age: 35 },
    ];

    const [totalProduction, setTotalProduction] = useState('');
    const [listProducts, setListProducts] = useState(data); 

    const [openDropdown, setOpenDropdown] = useState(false);
    const [validForm, setValidForm] = useState<FormType>({
      totalProduction: undefined,
    });

    const onClicDropdown = () => {
      setOpenDropdown(value => !value);
    }

    const handleDelete = (index: number) => {
      const newList = [...listProducts];
      newList.splice(index, 1);
      setListProducts(newList);
    };

    const onSubmit = (event: any): void => {
      const formData = {
        productions: listProducts,
        totalProduction: totalProduction,
      };
      event.preventDefault();
      console.log(formData);
      // serviceAnimals(formData);
    };

    const handleTotalProductionChange = (event: any) => {
      const value = event.target.value;
      setValidForm({
        ...validForm,
        totalProduction: value.length === 0 ? 'El total de producción es obligatorio' : ''
      });
      setTotalProduction(value);
    }

    const handleClickProducs = () => {
      setListProducts(data);
      if (!openDropdown) {
        onClicDropdown();
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
        onClicDropdown={onClicDropdown}
        >
        <Table 
        listObjects={listProducts}
        onDelete={handleDelete}
        />
        </Dropdown>
      }
      </>
    );
}

export default AnimalDataProduction;