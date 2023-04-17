import Form from 'components/form/Form';
import FormItem from 'components/formItem/FormItem';
import { useEffect, useState, useRef } from 'react';
import SelectItem from '../selectItem/SelectItem';

interface FormType {
  name: undefined | string;
  type: undefined | string;
  gender: undefined | string;
  stage: undefined | string;
  weight: undefined | string;
  breed: undefined | string;
  age: undefined | string;
}

interface FormProps {
  id: undefined | string;
  isEdit: undefined | boolean;
}

const AnimalDataGeneral = ({id, isEdit}: FormProps) => {

    const optionsType: string[] = ["Bovino", "Equino", "Pollo", "Conejo"];
    const optionsGender: string[] = ["Macho", "Hembra"];
    const selectRefTypes = useRef<HTMLSelectElement>(null);
    const selectRefGender = useRef<HTMLSelectElement>(null);

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
        idRanch: 1,
        name: name,
        type: type,
        gender: gender,
        stage: stage,
        weight: weight,
        breed: breed,
        age: age,
      };
      event.preventDefault();
      clearVariable();
      console.log(formData);
    };

    const clearVariable = () => {
      setName('');
      setType('');
      setGender('');
      setStage('');
      setWeight('');
      setBreed('');
      setAge('');
      setValidForm({
        name: undefined,
        type: undefined,
        gender: undefined,
        stage: undefined,
        weight: undefined,
        breed: undefined,
        age: undefined,
      });
    }

    const handleNameChange = (event: any) => {
      const value = event.target.value;
      setValidForm({
        ...validForm,
        name: value.length === 0 ? 'El nombre es obligatorio' : ''
      });
      setName(value);
    }

    const handleTypeChange = () => {
      const value = selectRefTypes.current?.value;
      setValidForm({
        ...validForm,
        type:  ''
      });
      if (value !== undefined) {
        setType(value.toString());
      }
    }

    const handleGenderChange = () => {
      const value = selectRefTypes.current?.value;
      setValidForm({
        ...validForm,
        gender: ''
      });
      if (value !== undefined) {
        setGender(value.toString());
      }
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
    <Form title={isEdit ? 'Edita los datos Generales' : 'Añade los datos Generales'} onSubmit={onSubmit} isValid={isValid} buttonText={isEdit ? 'Editar' : 'Crear'}>
    
    <FormItem 
        title={'Nombre:'}
        placeHolder={'Ingrese un nombre'}
        type={'text'}
        value={name}
        onChagne={handleNameChange}
        error={validForm.name}
    />
    <SelectItem 
      title={'Seleccione el Tipo:'}
      selectRef={selectRefTypes}
      onChagne={handleTypeChange}
      options={optionsType}
      error={validForm.type}
    />
    <SelectItem 
      title={'Seleccione el Genero:'}
      selectRef={selectRefGender}
      onChagne={handleGenderChange}
      options={optionsGender}
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
        title={'Peso (arrobas):'}
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
        title={'Edad (meses):'}
        placeHolder={'Ingrese la edad'}
        type={'number'}
        value={age}
        onChagne={handleAgeChange}
        error={validForm.age}
    />
    </Form>);
}

export default AnimalDataGeneral;