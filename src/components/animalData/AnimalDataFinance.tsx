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

const AnimalDataFinance = ({id, isEdit, validFormAnimal, setValidFormAnimal, validFormAnimalData, setValidFormAnimalData}: FormProps) => {

    const [idFinance, setIdFinance] = useState('');
    const [moneyProduced, setMoneyProduced] = useState('');
    const [moneySpent, setMoneySpent] = useState('');

    const [validForm, setValidForm] = useState<FormType>({
      moneyProduced: undefined,
      moneySpent: undefined,
    });

    useEffect(() => {
      if (isEdit) {
        getService("https://finance-rest-service-production.up.railway.app/api/finance/animal/" + id)
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
    }, [])

    useEffect(() => {
      const isValid = Object.keys(validForm).every(
        (key) => validForm[key as keyof typeof validForm] === ''
      )
      if (isValid) {
        setValidFormAnimal({
          ...validFormAnimal,
          finance: true
        });
        onSubmitData();
      } else {
        setValidFormAnimal({
          ...validFormAnimal,
          finance: false
        });
      }
    }, [validForm, moneyProduced, moneySpent])

    const onSubmitData = () => {
      let formData;
      if (isEdit) {
        formData = {
          id: idFinance,
          idAnimal: id,
          moneyProduced: moneyProduced,
          moneySpent: moneySpent,
        };
      } else {
        formData = {
          moneyProduced: moneyProduced,
          moneySpent: moneySpent,
        };
      }
      setValidFormAnimalData({
        ...validFormAnimalData,
        finance: formData
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

    return (
    <Form title={isEdit ? 'Edita los datos Financieros' : 'Añade los datos Financieros'} >
    
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