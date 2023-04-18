import Form from "../form/Form";
import FormItem from "../formItem/FormItem";
import { useState } from "react";

interface FormTypeTreatments {
    name: undefined | string;
    description: undefined | string;
    startDate: undefined | string; 
    endDate: undefined | string;
}

interface FormProps {
    newItem: (item: string) => void;
}

const FormAddTreatments = ({newItem} : FormProps) => {

    const [nameTreatments, setNameTreatments] = useState('');
    const [descriptionTreatments, setDescriptionTreatments] = useState('');
    const [startDateTreatments, setStartDateTreatments] = useState('');
    const [endDateTreatments, setendDateTreatments] = useState('');

    const [validFormTreatments, setValidFormTreatments] = useState<FormTypeTreatments>({
        name: undefined,
        description: undefined,
        startDate: undefined,
        endDate: undefined,
    });

    const onSubmitTreatments = (event: any): void => {
        const formData = {
          name: nameTreatments,
          description: descriptionTreatments,
          startDate: startDateTreatments,
          endDate: endDateTreatments,
        };
        event.preventDefault();
        newItem(JSON.stringify(formData));
    };

    const handleNameTreatmentsChange = (event: any) => {
        const value = event.target.value;
        setValidFormTreatments({
          ...validFormTreatments,
          name: value.length === 0 ? 'El nombre del tratamiento es obligatorio' : ''
        });
        setNameTreatments(value);
    }
    const handleDescriptionTreatmentsChange = (event: any) => {
        const value = event.target.value;
        setValidFormTreatments({
          ...validFormTreatments,
          description: value.length === 0 ? 'La descripción del tratamiento es obligatorio' : ''
        });
        setDescriptionTreatments(value);
    }
    const handleStartDateTreatmentsChange = (event: any) => {
        const value = event.target.value;
        setValidFormTreatments({
          ...validFormTreatments,
          startDate: value.length === 0 ? 'La fecha del tratamiento es obligatorio' : ''
        });
        setStartDateTreatments(value);
    }
    const handleEndDateTreatmentsChange = (event: any) => {
        const value = event.target.value;
        setValidFormTreatments({
          ...validFormTreatments,
          endDate: value.length === 0 ? 'La fecha del tratamiento es obligatorio' : ''
        });
        setendDateTreatments(value);
    }

    const isValidTreatments = Object.keys(validFormTreatments).every(
        (key) => validFormTreatments[key as keyof typeof validFormTreatments] === ''
    )

    return (
        <Form onSubmit={onSubmitTreatments} isValid={isValidTreatments} buttonText={'Añadir'}>
            <FormItem 
                title={'Nombre:'}
                placeHolder={'Ingrese el nombre del tratamiento'}
                type={'text'}
                value={nameTreatments}
                onChagne={handleNameTreatmentsChange}
                error={validFormTreatments.name}
            />
            <FormItem 
                title={'Descripción:'}
                placeHolder={'Ingrese la descripción del tratamiento'}
                type={'text'}
                value={descriptionTreatments}
                onChagne={handleDescriptionTreatmentsChange}
                error={validFormTreatments.description}
            />
            <FormItem 
                title={'Fecha Inicio:'}
                placeHolder={'Ingrese la fecha de inicio del tratamiento'}
                type={'date'}
                value={startDateTreatments}
                onChagne={handleStartDateTreatmentsChange}
                error={validFormTreatments.startDate}
            />
            <FormItem 
                title={'Fecha Fin:'}
                placeHolder={'Ingrese la fecha de fin del tratamiento'}
                type={'date'}
                value={endDateTreatments}
                onChagne={handleEndDateTreatmentsChange}
                error={validFormTreatments.endDate}
            />
        </Form>
    )
}
export default FormAddTreatments;