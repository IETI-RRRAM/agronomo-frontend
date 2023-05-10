import Form from "../form/Form";
import FormItem from "../formItem/FormItem";
import { useState } from "react";

interface FormType {
    date: undefined | string;
}

interface FormProps {
    newItem: (item: string) => void;
}

const FormAddLastHeats = ({newItem} : FormProps) => {

    const [date, setDate] = useState('');

    const [validForm, setValidForm] = useState<FormType>({
        date: undefined,
    });

    const onSubmit = (event: any): void => {
        event.preventDefault();
        newItem(JSON.stringify(date));
    };

    const handleDateChange = (event: any) => {
        const value = event.target.value;
        setValidForm({
          ...validForm,
          date: value.length === 0 ? 'La fecha es obligatorio' : ''
        });
        setDate(value);
    }

    const isValid = Object.keys(validForm).every(
        (key) => validForm[key as keyof typeof validForm] === ''
    )

    return (
        <Form onSubmit={onSubmit} isValid={isValid} buttonText={'Añadir'}>
            <FormItem 
                title={'Fecha:'}
                placeHolder={'Ingrese la fecha'}
                type={'date'}
                value={date}
                onChagne={handleDateChange}
                error={validForm.date}
            />
        </Form>
    )
}
export default FormAddLastHeats;