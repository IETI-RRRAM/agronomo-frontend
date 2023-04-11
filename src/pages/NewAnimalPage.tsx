import Form from 'components/form/Form';
import FormItem from 'components/formItem/FormItem';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

interface FormType {
  name: undefined | string;
  type: undefined | string;
  gender: undefined | string;
  race: undefined | string;
  production: undefined | string;
  birthdate: undefined | string;
  weight: undefined | string;
}

const NewAnimalPage = () => {
    const [isEdit, setIsEdit] = useState(false);

    let { id } = useParams();

    useEffect(() => {
      if (id) {
        setIsEdit(true);
        // getService(id) SE DEBE HACER CONSULTA DE ESE RANCHO
      }
    }, [])

    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [gender, setGender] = useState('');
    const [race, setRace] = useState('');
    const [production, setProduction] = useState('');
    const [birthdate, setBirthDate] = useState('');
    const [weight, setWeight] = useState('');

    const [validForm, setValidForm] = useState<FormType>({
      name: undefined,
      type: undefined,
      gender: undefined,
      race: undefined,
      production: undefined,
      birthdate: undefined,
      weight: undefined,
    });

    const onSubmit = (event: any): void => {
      const formData = {
        name: name,
        type: type,
        gender: gender,
        race: race,
        production: production,
        birthdate: gender,
        weight: weight,
      };
      event.preventDefault();
      console.log(formData);
      // serviceAnimals(formData);
    };

    const handleNameChange = (event: any) => {
      const value = event.target.value;
      setValidForm({
        ...validForm,
        name: value.length === 0 ? 'El nombre es obligatorio' : ''
      });
      setName(value);
    }

    const handleTypeChange = (event: any) => {
      const value = event.target.value;
      setValidForm({
        ...validForm,
        type: value.length === 0 ? 'El tipo es obligatorio' : ''
      });
      setType(value);
    }

    const handleGenderChange = (event: any) => {
      const value = event.target.value;
      setValidForm({
        ...validForm,
        gender: value.length === 0 ? 'El genero es obligatorio' : ''
      });
      setGender(value);
    }

    const handleRaceChange = (event: any) => {
      const value = event.target.value;
      setValidForm({
        ...validForm,
        race: value.length === 0 ? 'La Raza es obligatoria' : ''
      });
      setRace(value);
    }

    const handleProductionChange = (event: any) => {
      const value = event.target.value;
      setValidForm({
        ...validForm,
        production: value.length === 0 ? 'La Produción es obligatoria' : ''
      });
      setProduction(value);
    }

    const handleBirthDateChange = (event: any) => {
      const value = event.target.value;
      setValidForm({
        ...validForm,
        birthdate: value.length === 0 ? 'La Fecha de Nacimiento es obligatoria' : ''
      });
      setBirthDate(value);
    }

    const handleWeightChange = (event: any) => {
      const value = event.target.value;
      setValidForm({
        ...validForm,
        weight: value.length === 0 ? 'El peso es obligatorio' : ''
      });
      setWeight(value);
    }

    const isValid = Object.keys(validForm).every(
      (key) => validForm[key as keyof typeof validForm] === ''
    )

    return (
    <Form title={isEdit ? 'Edita los datos del animal' : 'Añade un nuevo Animal'} onSubmit={onSubmit} isValid={isValid} buttonText={isEdit ? 'Editar' : 'Crear'}>
    
    <FormItem 
        title={'Nombre:'}
        placeHolder={'Ingrese un nombre'}
        type={'text'}
        value={name}
        onChagne={handleNameChange}
        error={validForm.name}
    />
    <FormItem 
        title={'Tipo:'}
        placeHolder={'Tipo de Animal'}
        type={'text'}
        value={type}
        onChagne={handleTypeChange}
        error={validForm.type}
    />
    <FormItem 
        title={'Género:'}
        placeHolder={'Ingrese el Género'}
        type={'text'}
        value={gender}
        onChagne={handleGenderChange}
        error={validForm.gender}
    />
    <FormItem 
        title={'Raza:'}
        placeHolder={'Ingrese la raza'}
        type={'text'}
        value={race}
        onChagne={handleRaceChange}
        error={validForm.race}
    />
    <FormItem 
        title={'Producción:'}
        placeHolder={'Ingrese el tipo de Producción'}
        type={'text'}
        value={production}
        onChagne={handleProductionChange}
        error={validForm.production}
    />
    <FormItem 
        title={'Fecha de Nacimiento:'}
        placeHolder={'Ingrese la fecha de Nacimiento'}
        type={'date'}
        value={birthdate}
        onChagne={handleBirthDateChange}
        error={validForm.birthdate}
    />
    <FormItem 
        title={'Peso:'}
        placeHolder={'Ingrese el peso del animal'}
        type={'text'}
        value={weight}
        onChagne={handleWeightChange}
        error={validForm.weight}
    />
    
    </Form>);
}


export default NewAnimalPage;