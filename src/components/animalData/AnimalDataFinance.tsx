import Form from 'components/form/Form';
import FormItem from 'components/formItem/FormItem';
import { useEffect, useState } from 'react';
import {postService} from '../../services/postServices';
import getService from 'src/services/getService';
import {putService} from 'src/services/putService';

interface FormType {
  moneyProduced: undefined | string;
  moneySpent: undefined | string;
}

interface FormProps {
  id: undefined | string;
  isEdit: boolean;
}

const AnimalDataFinance = ({id, isEdit}: FormProps) => {

    const [idFinance, setIdFinance] = useState('6436dce279c07e2ba8d6655b');

    useEffect(() => {
      if (isEdit) {
        getService("https://finance-rest-service-production.up.railway.app/api/finance/" + idFinance)
        .then((response) => {
          setIdFinance(response.id);
          setMoneyProduced(response.moneyProduced);
          setMoneySpent(response.moneySpent);
          setValidForm({
            moneyProduced: '',
            moneySpent: '',
          });
        });
      }
    }, [isEdit])

    const [moneyProduced, setMoneyProduced] = useState('');
    const [moneySpent, setMoneySpent] = useState('');

    const [validForm, setValidForm] = useState<FormType>({
      moneyProduced: undefined,
      moneySpent: undefined,
    });

    const onSubmit = (event: any): void => {
      const formData = {
        idAnimal: id,
        moneyProduced: moneyProduced,
        moneySpent: moneySpent,
      };
      event.preventDefault();
      clearVariable();
      if (!isEdit) {
        postService("https://finance-rest-service-production.up.railway.app/api/finance", formData);
      } else {
        putService("https://finance-rest-service-production.up.railway.app/api/finance/" + idFinance, formData);
      }
    }

    const clearVariable = () => {
      setMoneyProduced('');
      setMoneySpent('');
      setValidForm({
        moneyProduced: undefined,
        moneySpent: undefined,
      });
    }

    const handleMoneyProducedChange = (event: any) => {
      const value = event.target.value;
      setValidForm({
        ...validForm,
        moneyProduced: value.length === 0 ? 'El dinero producido es obligatorio' : ''
      });
      setMoneyProduced(value);
    }

    const handleMoneySpentChange = (event: any) => {
      const value = event.target.value;
      setValidForm({
        ...validForm,
        moneySpent: value.length === 0 ? 'El dinero gastado es obligatorio' : ''
      });
      setMoneySpent(value);
    }

    const isValid = Object.keys(validForm).every(
      (key) => validForm[key as keyof typeof validForm] === ''
    )

    return (
    <Form title={isEdit ? 'Edita los datos Financieros' : 'Añade los datos Financieros'} onSubmit={onSubmit} isValid={isValid} buttonText={isEdit ? 'Editar' : 'Crear'}>
    
    <FormItem 
        title={'Dinero Producido:'}
        placeHolder={'Ingrese el dinero producido'}
        type={'number'}
        value={moneyProduced}
        onChagne={handleMoneyProducedChange}
        error={validForm.moneyProduced}
    />
    <FormItem 
        title={'Dinero Gastado:'}
        placeHolder={'Ingrese el dinero gastado'}
        type={'number'}
        value={moneySpent}
        onChagne={handleMoneySpentChange}
        error={validForm.moneySpent}
    />
    </Form>);
}

export default AnimalDataFinance;