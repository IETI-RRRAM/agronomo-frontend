import Form from 'components/form/Form';
import FormItem from 'components/formItem/FormItem';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

interface FormType {
  status: undefined | string;
}

const AnimalDataHealth = () => {

    const [isEdit, setIsEdit] = useState(false);

    let { id } = useParams();

    useEffect(() => {
      if (id) {
        setIsEdit(true);
        // getService(id) SE DEBE HACER CONSULTA DE ESE ANIMAL
      }
    }, [])

    const [status, setStatus] = useState('');

    const [validForm, setValidForm] = useState<FormType>({
        status: undefined,
    });

    const onSubmit = (event: any): void => {
      const formData = {
        status: status,
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


    const isValid = Object.keys(validForm).every(
      (key) => validForm[key as keyof typeof validForm] === ''
    )

    return (
    <Form title={isEdit ? 'Edita los datos del animal' : 'Añade un nuevo Animal'} onSubmit={onSubmit} isValid={isValid} buttonText={isEdit ? 'Editar' : 'Crear'}>
    
    <FormItem 
        title={'Estado Animal:'}
        placeHolder={'Ingrese el estado del animal'}
        type={'text'}
        value={status}
        onChagne={handleStatusChange}
        error={validForm.status}
    />
    </Form>);
}

export default AnimalDataHealth;