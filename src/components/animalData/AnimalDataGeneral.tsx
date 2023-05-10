import Form from 'components/form/Form';
import FormItem from 'components/formItem/FormItem';
import { useEffect, useState, useRef } from 'react';
import SelectItem from '../selectItem/SelectItem';
import getService from 'src/services/getService';

interface FormType {
  name: undefined | string;
  type: undefined | string;
  gender: undefined | string;
  stage: undefined | string;
  weight: undefined | string;
  breed: undefined | string;
  age: undefined | string;
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

interface FormProps {
  id: undefined | string;
  idRanch: undefined | string;
  isEdit: boolean;
  validFormAnimal: FormTypeAnimal;
  setValidFormAnimal: React.Dispatch<React.SetStateAction<any>>;
  validFormAnimalData: FormTypeData;
  setValidFormAnimalData: React.Dispatch<React.SetStateAction<any>>;
}

interface FormTypeId {
  general: string | undefined;
  finance: string | undefined;
  health: string | undefined;
  production: string | undefined;
  reproduction: string | undefined;
}

const AnimalDataGeneral = ({id, idRanch, isEdit, validFormAnimal, setValidFormAnimal, validFormAnimalData, setValidFormAnimalData}: FormProps) => {

    const [idGeneral, setIdGeneral] = useState('');
    const optionsType: string[] = ["Bovino", "Equino", "Pollo", "Conejo"];
    const optionsGender: string[] = ["Hembra", "Macho"];
    const selectRefTypes = useRef<HTMLSelectElement>(null);
    const selectRefGender = useRef<HTMLSelectElement>(null);

    const [name, setName] = useState('');
    const [type, setType] = useState(optionsType[0]);
    const [gender, setGender] = useState(optionsGender[0]);
    const [stage, setStage] = useState('');
    const [weight, setWeight] = useState('');
    const [breed, setBreed] = useState('');
    const [age, setAge] = useState('');

    const [validForm, setValidForm] = useState<FormType>({
      name: undefined,
      type: '',
      gender: '',
      stage: undefined,
      weight: undefined,
      breed: undefined,
      age: undefined,
    });

    useEffect(() => {
      if (isEdit) {
        getService("https://animal-rest-service-production.up.railway.app/api/animals/" + id)
        .then(value => {
          setIdGeneral(value.id);
          setName(value.name);
          setType(value.type);
          setGender(value.gender);
          setStage(value.stage);
          setWeight(value.weight);
          setBreed(value.breed);
          setAge(value.age);
          setValidForm({
            name: '',
            type: '',
            gender: '',
            stage: '',
            weight: '',
            breed: '',
            age: '',
          });
        })
      }
    }, [])

    useEffect(() => {
      const isValid = Object.keys(validForm).every(
        (key) => validForm[key as keyof typeof validForm] === ''
      )
      if (isValid) {
        setValidFormAnimal({
          ...validFormAnimal,
          general: true
        });
        onSubmitData();
      } else {
        setValidFormAnimal({
          ...validFormAnimal,
          general: false
        });
      }
    }, [validForm, name, type, gender, stage, weight, age])

    const onSubmitData = () => {
      let formData;
      if (isEdit) {
        formData = {
          id: idGeneral,
          idRanch: idRanch,
          name: name,
          type: type,
          gender: gender,
          stage: stage,
          weight: weight,
          breed: breed,
          age: age,
        };
      } else {
        formData = {
          idRanch: idRanch,
          name: name,
          type: type,
          gender: gender,
          stage: stage,
          weight: weight,
          breed: breed,
          age: age,
        };
      }
      setValidFormAnimalData({
        ...validFormAnimalData,
        general: formData
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
      const value = selectRefGender.current?.value;
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

    return (
    <Form title={isEdit ? 'Edita los datos Generales' : 'Añade los datos Generales'}>
    
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