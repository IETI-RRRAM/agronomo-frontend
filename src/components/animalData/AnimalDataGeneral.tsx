import Form from 'components/form/Form';
import FormItem from 'components/formItem/FormItem';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

interface FormType {
  name: undefined | string;
  type: undefined | string;
  gender: undefined | string;
  stage: undefined | string;
  weight: undefined | string;
  breed: undefined | string;
  age: undefined | string;
}

const AnimalDataGeneral = () => {

    const [isEdit, setIsEdit] = useState(false);

    let { id } = useParams();

    useEffect(() => {
      if (id) {
        setIsEdit(true);
        // getService(id) SE DEBE HACER CONSULTA DE ESE ANIMAL
      }
    }, [])

    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [gender, setGender] = useState('');
    const [stage, setStage] = useState('');
    const [weight, setWeight] = useState('');
    const [breed, setBreed] = useState('');
    const [age, setAge] = useState('');

    const [validForm, setValidForm] = useState<FormType>({
      name: undefined,
      type: undefined,
      gender: undefined,
      stage: undefined,
      weight: undefined,
      breed: undefined,
      age: undefined,
    });

    const onSubmit = (event: any): void => {
      const formData = {
        name: name,
        type: type,
        gender: gender,
        stage: stage,
        weight: weight,
        breed: breed,
        age: age,
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

    const handleStageChange = (event: any) => {
      const value = event.target.value;
      setValidForm({
        ...validForm,
        stage: value.length === 0 ? 'La Raza es obligatoria' : ''
      });
      setStage(value);
    }

    const handleWeightChange = (event: any) => {
        const value = event.target.value;
        setValidForm({
          ...validForm,
          weight: value.length === 0 ? 'El peso es obligatorio' : ''
        });
        setWeight(value);
      }

    const handleBreedChange = (event: any) => {
      const value = event.target.value;
      setValidForm({
        ...validForm,
        breed: value.length === 0 ? 'El numero de crias es obligatorio' : ''
      });
      setBreed(value);
    }

    const handleAgeChange = (event: any) => {
      const value = event.target.value;
      setValidForm({
        ...validForm,
        age: value.length === 0 ? 'La edad es obligatoria' : ''
      });
      setAge(value);
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
        value={stage}
        onChagne={handleStageChange}
        error={validForm.stage}
    />
    <FormItem 
        title={'Peso:'}
        placeHolder={'Ingrese el peso'}
        type={'text'}
        value={weight}
        onChagne={handleWeightChange}
        error={validForm.weight}
    />
    <FormItem 
        title={'Crias:'}
        placeHolder={'Ingrese el numero de crias'}
        type={'number'}
        value={breed}
        onChagne={handleBreedChange}
        error={validForm.breed}
    />
    <FormItem 
        title={'Edad:'}
        placeHolder={'Ingrese la edad'}
        type={'number'}
        value={age}
        onChagne={handleAgeChange}
        error={validForm.age}
    />
    </Form>);
}

export default AnimalDataGeneral;