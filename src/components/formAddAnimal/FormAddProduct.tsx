import Form from "../form/Form";
import FormItem from "../formItem/FormItem";
import { useState } from "react";

interface FormType {
    product: undefined | string;
    quantity: undefined | string;
    measurement: undefined | string; 
    date: undefined | string;
}

interface FormProps {
    newItem: (item: string) => void;
}

const FormAddProduct = ({newItem} : FormProps) => {

    const [product, setProduct] = useState('');
    const [quantity, setQuantity] = useState('');
    const [measurement, setMeasurement] = useState('');
    const [date, setDate] = useState('');

    const [validForm, setValidForm] = useState<FormType>({
        product: undefined,
        quantity: undefined,
        measurement: undefined,
        date: undefined,
    });

    const onSubmit = (event: any): void => {
        const formData = {
          product: product,
          quantity: quantity,
          measurement: measurement,
          date: date,
        };
        event.preventDefault();
        newItem(JSON.stringify(formData));
    };

    const handleProductChange = (event: any) => {
        const value = event.target.value;
        setValidForm({
          ...validForm,
          product: value.length === 0 ? 'El nombre del producto es obligatorio' : ''
        });
        setProduct(value);
    }

    const handleQuantityChange = (event: any) => {
        const value = event.target.value;
        setValidForm({
          ...validForm,
          quantity: value.length === 0 ? 'La cantidad es obligatorio' : ''
        });
        setQuantity(value);
    }

    const handleMeasurementChange = (event: any) => {
        const value = event.target.value;
        setValidForm({
          ...validForm,
          measurement: value.length === 0 ? 'La medición es obligatorio' : ''
        });
        setMeasurement(value);
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
                title={'Producto:'}
                placeHolder={'Ingrese el nombre del producto'}
                type={'text'}
                value={product}
                onChagne={handleProductChange}
                error={validForm.product}
            />
            <FormItem 
                title={'Cantidad:'}
                placeHolder={'Ingrese la cantidad del producto'}
                type={'text'}
                value={quantity}
                onChagne={handleQuantityChange}
                error={validForm.quantity}
            />
            <FormItem 
                title={'Medición:'}
                placeHolder={'Ingrese la medición del producto'}
                type={'text'}
                value={measurement}
                onChagne={handleMeasurementChange}
                error={validForm.measurement}
            />
            <FormItem 
                title={'Fecha:'}
                placeHolder={'Ingrese la fecha de producto'}
                type={'date'}
                value={date}
                onChagne={handleDateChange}
                error={validForm.date}
            />
        </Form>
    )
}
export default FormAddProduct;