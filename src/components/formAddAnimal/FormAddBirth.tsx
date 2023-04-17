import Form from "../form/Form";
import FormItem from "../formItem/FormItem";
import { useState } from "react";
import { useParams } from 'react-router-dom';

interface FormType {
    idBreeding: undefined | string;
    date: undefined | string;
}

interface FormProps {
    newItem: (item: string) => void;
}

const FormAddBirth = ({newItem} : FormProps) => {

    const { id } = useParams();
    const [idBreeding, setIdBreeding] = useState('');
    const [date, setDate] = useState('');

    const [validForm, setValidForm] = useState<FormType>({
        idBreeding: undefined,
        date: undefined,
    });

    const onSubmit = (event: any): void => {
        const formData = {
          idAnimal: id,
          idBreeding: idBreeding,
          date: date,
        };
        event.preventDefault();
        newItem(JSON.stringify(formData));
    };

    const handleIdBreedingChange = (event: any) => {
        const value = event.target.value;
        setValidForm({
          ...validForm,
          idBreeding: value.length === 0 ? 'El id es obligatorio' : ''
        });
        setIdBreeding(value);
    }

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
                title={'Id de Cria:'}
                placeHolder={'Ingrese el id de la cria'}
                type={'text'}
                value={idBreeding}
                onChagne={handleIdBreedingChange}
                error={validForm.idBreeding}
            />
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
export default FormAddBirth;