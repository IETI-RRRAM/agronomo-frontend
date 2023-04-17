import ActionButton from 'components/buttons/actions/ActionButton';
import './AnimalActions.css';

type FormProps = {
    handleClick: (option: string) => void;
};

const AnimalActions = ({handleClick}: FormProps) => {

    return (
        <nav className='buttons-container'>

            <ActionButton click={() => handleClick('Información Salud')} icon={
                <span className="material-symbols-outlined icon-actions">
                    favorite
                </span>
            } text='Salud'/>
            <ActionButton click={() => handleClick('Información Producción')} icon={
                <span className="material-symbols-outlined icon-actions">
                monitoring
                </span>
            } text='Producción' />
            <ActionButton click={() => handleClick('Información Reproducción')} icon={
                <span className="material-symbols-outlined icon-actions">
                monitor_heart
                </span>
            } text='Reproducción' />
            <ActionButton click={() => handleClick('Información Finanzas')} icon={
                <span className="material-symbols-outlined icon-actions">
                request_quote
                </span>
            } text='Finanzas' />
        </nav>
    )
}

export default AnimalActions;