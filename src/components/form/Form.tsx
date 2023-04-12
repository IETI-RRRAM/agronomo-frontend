import React, { FormEventHandler } from 'react';
import './Form.css'

type FormProps = {
    title: string;
    buttonText: string;
    children: React.ReactNode;
    isValid: boolean;
    onSubmit: FormEventHandler;
    formError?: string;
};

const Form = ({title, children, onSubmit, isValid, buttonText, formError}: FormProps) => {
    return (
        <>
            <div className='form-title'><h1>{title}</h1></div>
            <form className='form-group' onSubmit={onSubmit}>
                <main className='form-items'>
                    {children}
                </main>
                <button className='submit-button' disabled={!isValid}>{buttonText}</button>
                {formError && <span className="error" role="alert">{formError}</span>}
            </form>
        </>
    )
}
export default Form;

