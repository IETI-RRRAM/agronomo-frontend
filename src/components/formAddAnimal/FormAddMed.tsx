import Form from "../form/Form";
import FormItem from "../formItem/FormItem";
import { useState } from "react";

interface FormTypeMeds {
    name: undefined | string;
    description: undefined | string;
    startDate: undefined | string; 
    endDate: undefined | string;
    dose: undefined | string;
}

interface FormProps {
    newItem: (item: string) => void;
}
  
const FormAddMed = ({newItem} : FormProps) => {

    const [nameMeds, setNameMeds] = useState('');
    const [descriptionMeds, setDescriptionMeds] = useState('');
    const [startDateMeds, setStartDateMeds] = useState('');
    const [endDateMeds, setendDateMeds] = useState('');
    const [doseDateMeds, setdoseMeds] = useState('');

    const [validFormMeds, setValidFormMeds] = useState<FormTypeMeds>({
        name: undefined,
        description: undefined,
        startDate: undefined,
        endDate: undefined,
        dose: undefined,
    });

    const onSubmitMeds = (event: any): void => {
        const formData = {
          name: nameMeds,
          description: descriptionMeds,
          startDate: startDateMeds,
          endDate: endDateMeds,
          dose: doseDateMeds,
        };
        event.preventDefault();
        newItem(JSON.stringify(formData));
    };

    const handleNameMedsChange = (event: any) => {
        const value = event.target.value;
        setValidFormMeds({
          ...validFormMeds,
          name: value.length === 0 ? 'El nombre del medicamento es obligatorio' : ''
        });
        setNameMeds(value);
    }
    const handleDescriptionMedsChange = (event: any) => {
        const value = event.target.value;
        setValidFormMeds({
          ...validFormMeds,
          description: value.length === 0 ? 'La descripción del medicamento es obligatorio' : ''
        });
        setDescriptionMeds(value);
    }
    const handleStartDateMedsChange = (event: any) => {
        const value = event.target.value;
        setValidFormMeds({
          ...validFormMeds,
          startDate: value.length === 0 ? 'La fecha del medicamento es obligatorio' : ''
        });
        setStartDateMeds(value);
    }
    const handleEndDateMedsChange = (event: any) => {
        const value = event.target.value;
        setValidFormMeds({
          ...validFormMeds,
          endDate: value.length === 0 ? 'La fecha del medicamento es obligatorio' : ''
        });
        setendDateMeds(value);
    }
    const handleDoseMedsChange = (event: any) => {
        const value = event.target.value;
        setValidFormMeds({
          ...validFormMeds,
          dose: value.length === 0 ? 'La dosis del medicamento es obligatorio' : ''
        });
        setdoseMeds(value);
    }

    const isValidMeds = Object.keys(validFormMeds).every(
        (key) => validFormMeds[key as keyof typeof validFormMeds] === ''
      )

    return (
        <Form onSubmit={onSubmitMeds} isValid={isValidMeds} buttonText={'Añadir'}>
            <FormItem 
                title={'Nombre:'}
                placeHolder={'Ingrese el nombre del medicamento'}
                type={'text'}
                value={nameMeds}
                onChagne={handleNameMedsChange}
                error={validFormMeds.name}
            />
            <FormItem 
                title={'Descripción:'}
                placeHolder={'Ingrese la descripción del medicamento'}
                type={'text'}
                value={descriptionMeds}
                onChagne={handleDescriptionMedsChange}
                error={validFormMeds.description}
            />
            <FormItem 
                title={'Fecha Inicio:'}
                placeHolder={'Ingrese la fecha de inicio del medicamento'}
                type={'date'}
                value={startDateMeds}
                onChagne={handleStartDateMedsChange}
                error={validFormMeds.startDate}
            />
            <FormItem 
                title={'Fecha Fin:'}
                placeHolder={'Ingrese la fecha de fin del medicamento'}
                type={'date'}
                value={endDateMeds}
                onChagne={handleEndDateMedsChange}
                error={validFormMeds.endDate}
            />
            <FormItem 
                title={'Dosis:'}
                placeHolder={'Ingrese la dosis del tratamiento'}
                type={'text'}
                value={doseDateMeds}
                onChagne={handleDoseMedsChange}
                error={validFormMeds.dose}
            />
        </Form>
    )
}
export default FormAddMed;