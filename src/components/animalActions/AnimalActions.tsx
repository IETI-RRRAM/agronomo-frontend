import ActionButton from 'components/buttons/actions/ActionButton';
import { useState } from "react";
import './AnimalActions.css';

type FormProps = {
    changeSection: React.Dispatch<React.SetStateAction<string>>;
};

const AnimalActions = ({changeSection}: FormProps) => {

    const handleClickButton = (value: string) => {
        changeSection(value);
    }

    return (
        <nav className='buttons-container'>

            <ActionButton click={() => handleClickButton('Salud')} icon={
                <span className="material-symbols-outlined">
                    favorite
                </span>
            } text='Salud'/>

            <ActionButton click={() => handleClickButton('Producción')} icon={
                <span className="material-symbols-outlined">
                monitoring
                </span>
            } text='Producción' />
            <ActionButton click={() => handleClickButton('Reproducción')} icon={
                <span className="material-symbols-outlined">
                monitor_heart
                </span>
            } text='Reproducción' />
            <ActionButton click={() => handleClickButton('Finanzas')} icon={
                <span className="material-symbols-outlined">
                request_quote
                </span>
            } text='Finanzas' />
        </nav>
    )
}

export default AnimalActions;