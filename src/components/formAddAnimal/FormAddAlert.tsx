import Form from "../form/Form";
import FormItem from "../formItem/FormItem";
import { useState } from "react";

interface FormType {
    name: undefined | string;
    description: undefined | string;
    startDate: undefined | string; 
    endDate: undefined | string; 
}

interface FormProps {
    newItem: (item: string) => void;
}

const FormAddAlert = ({newItem} : FormProps) => {

    const [nameAlerts, setNameAlerts] = useState('');
    const [descriptionAlerts, setDescriptionAlerts] = useState('');
    const [startDateAlerts, setStartDateAlerts] = useState('');
    const [endDateAlerts, setendDateAlerts] = useState('');

    const [validFormAlerts, setValidFormAlerts] = useState<FormType>({
        name: undefined,
        description: undefined,
        startDate: undefined,
        endDate: undefined,
    });

    const onSubmitAlerts = (event: any): void => {
        const formData = {
            name: nameAlerts,
            description: descriptionAlerts,
            startDate: startDateAlerts,
            endDate: endDateAlerts,
          };
          event.preventDefault();
          newItem(JSON.stringify(formData));
    };

    const handleNameAlertsChange = (event: any) => {
        const value = event.target.value;
        setValidFormAlerts({
          ...validFormAlerts,
          name: value.length === 0 ? 'El nombre de la alerta es obligatorio' : ''
        });
        setNameAlerts(value);
    }
    const handleDescriptionAlertsChange = (event: any) => {
        const value = event.target.value;
        setValidFormAlerts({
          ...validFormAlerts,
          description: value.length === 0 ? 'La descripción de la alerta es obligatorio' : ''
        });
        setDescriptionAlerts(value);
    }
    const handleStartAlertsChange = (event: any) => {
        const value = event.target.value;
        setValidFormAlerts({
          ...validFormAlerts,
          startDate: value.length === 0 ? 'La fecha de la alerta es obligatorio' : ''
        });
        setStartDateAlerts(value);
    }
    const handleEndDateAlertsChange = (event: any) => {
        const value = event.target.value;
        setValidFormAlerts({
          ...validFormAlerts,
          endDate: value.length === 0 ? 'La fecha de la alerta es obligatorio' : ''
        });
        setendDateAlerts(value);
    }

    const isValidAlerts = Object.keys(validFormAlerts).every(
        (key) => validFormAlerts[key as keyof typeof validFormAlerts] === ''
    )

    return (
        <Form onSubmit={onSubmitAlerts} isValid={isValidAlerts} buttonText={'Añadir'}>
            <FormItem 
                title={'Nombre:'}
                placeHolder={'Ingrese el nombre de la alerta'}
                type={'text'}
                value={nameAlerts}
                onChagne={handleNameAlertsChange}
                error={validFormAlerts.name}
            />
            <FormItem 
                title={'Descripción:'}
                placeHolder={'Ingrese la descripción de la alerta'}
                type={'text'}
                value={descriptionAlerts}
                onChagne={handleDescriptionAlertsChange}
                error={validFormAlerts.description}
            />
            <FormItem 
                title={'Fecha Inicio:'}
                placeHolder={'Ingrese la fecha de inicio de la alerta'}
                type={'date'}
                value={startDateAlerts}
                onChagne={handleStartAlertsChange}
                error={validFormAlerts.startDate}
            />
            <FormItem 
                title={'Fecha Fin:'}
                placeHolder={'Ingrese la fecha de fin de la alerta'}
                type={'date'}
                value={endDateAlerts}
                onChagne={handleEndDateAlertsChange}
                error={validFormAlerts.endDate}
            />
        </Form>
    )
}
export default FormAddAlert;