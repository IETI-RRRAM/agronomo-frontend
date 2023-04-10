import Form from 'components/form/Form';
import FormItem from 'components/formItem/FormItem';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

interface FormType {
  location: undefined | string;
  name: undefined | string;
  area: undefined | string;
  purpose: undefined | string;
}

const NewRanchPage = () => {
    const [isEdit, setIsEdit] = useState(false);

    let { id } = useParams();
    useEffect(() => {
      if (id) {
        setIsEdit(true);
        // getService(id) SE DEBE HACER CONSULTA DE ESE RANCHO
      }
    }, [])

    const [location, setLocation] = useState('');
    const [name, setName] = useState('');
    const [area, setArea] = useState('');
    const [purpose, setPurpose] = useState('');
  
    const [validForm, setValidForm] = useState<FormType>({
      location: undefined,
      name: undefined,
      area: undefined,
      purpose: undefined
    });

    const onSubmit = (event: any): void => {
      const formData = {
        name: name,
        location: location,
        area: Number(area),
        purpose: purpose
      };
      event.preventDefault();
      console.log(formData);
      // serviceRanch(formData);
    };

    const handleNameChange = (event: any) => {
      const value = event.target.value;
      setValidForm({
        ...validForm,
        name: value.length === 0 ? 'el nombre es obligatorio' : ''
      });
  
      setName(value);
    }

    const handleLocationChange = (event: any) => {
      const value = event.target.value;
      setValidForm({
        ...validForm,
        location: value.length === 0 ? 'la ubicación es obligatoria' : ''
      });
  
      setLocation(value);
    }

    const handlePurposeChange = (event: any) => {
      const value = event.target.value;
      setValidForm({
        ...validForm,
        purpose: value.length === 0 ? 'la ubicación es obligatoria' : ''
      });
  
      setPurpose(value);
    }

    const handleAreaChange = (event: any) => {
      const value = event.target.value;
      let errorMessage = '';
      if (value <= '0') errorMessage = 'el area debe ser mayor a 0';
      if (value === '') errorMessage = 'el area es obligatoria';
      setValidForm({
        ...validForm,
        area: errorMessage
      });
      setArea(value);
    }

    const isValid = Object.keys(validForm).every(
      (key) => validForm[key as keyof typeof validForm] === ''
    )

    return (
    <Form title={isEdit ? 'Edita tu rancho' : 'Crea un nuevo rancho'} onSubmit={onSubmit} isValid={isValid} buttonText={isEdit ? 'Editar' : 'Crear'}>
    <FormItem 
        title={'Nombre:'}
        placeHolder={'Ingrese un nombre'}
        type={'text'}
        value={name}
        onChagne={handleNameChange}
        error={validForm.name}
    />
    <FormItem 
        title={'Proposito:'}
        placeHolder={'Proposito del rancho'}
        type={'text'}
        value={purpose}
        onChagne={handlePurposeChange}
        error={validForm.purpose}
    />
    <FormItem 
        title={'Ubicación:'}
        placeHolder={'Ingrese la ubicación'}
        type={'text'}
        value={location}
        onChagne={handleLocationChange}
        error={validForm.location}
    />
    <FormItem 
        title={'Área:'}
        placeHolder={'Ingrese el área del rancho'}
        type={'number'}
        value={area}
        onChagne={handleAreaChange}
        error={validForm.area}
    />
    
    </Form>);
}


export default NewRanchPage;