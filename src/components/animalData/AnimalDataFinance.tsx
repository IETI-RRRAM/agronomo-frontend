import Form from 'components/form/Form';
import FormItem from 'components/formItem/FormItem';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

interface FormType {
  moneyProduced: undefined | string;
  moneySpent: undefined | string;
  profitability: undefined | string;
}

const AnimalDataFinance = () => {

    const [isEdit, setIsEdit] = useState(false);

    let { id } = useParams();

    useEffect(() => {
      if (id) {
        setIsEdit(true);
        // getService(id) SE DEBE HACER CONSULTA DE ESE ANIMAL
      }
    }, [])

    const [moneyProduced, setMoneyProduced] = useState('');
    const [moneySpent, setMoneySpent] = useState('');
    const [profitability, setProfitability] = useState('');

    const [validForm, setValidForm] = useState<FormType>({
      moneyProduced: undefined,
      moneySpent: undefined,
      profitability: undefined,
    });

    const onSubmit = (event: any): void => {
      const formData = {
        moneyProduced: moneyProduced,
        moneySpent: moneySpent,
        profitability: profitability,
      };
      event.preventDefault();
      console.log(formData);
      // serviceAnimals(formData);
    };

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

    const handleProfitabilityChange = (event: any) => {
      const value = event.target.value;
      setValidForm({
        ...validForm,
        profitability: value.length === 0 ? 'La rentabilidad es obligatoria' : ''
      });
      setProfitability(value);
    }

    const isValid = Object.keys(validForm).every(
      (key) => validForm[key as keyof typeof validForm] === ''
    )

    return (
    <Form title={isEdit ? 'Edita los datos del animal' : 'Añade un nuevo Animal'} onSubmit={onSubmit} isValid={isValid} buttonText={isEdit ? 'Editar' : 'Crear'}>
    
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
    <FormItem 
        title={'Rentabilidad:'}
        placeHolder={'Ingrese la rentabilidad'}
        type={'number'}
        value={profitability}
        onChagne={handleProfitabilityChange}
        error={validForm.profitability}
    />
    </Form>);
}

export default AnimalDataFinance;