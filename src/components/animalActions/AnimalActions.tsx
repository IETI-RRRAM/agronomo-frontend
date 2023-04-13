import ActionButton from 'components/buttons/actions/ActionButton';
import './AnimalActions.css'

const AnimalActions = () => {
    return (
        <nav className='buttons-container'>
            <ActionButton icon={
                <span className="material-symbols-outlined">
                    favorite
                </span>
            } text='Salud' />
            <ActionButton icon={
                <span className="material-symbols-outlined">
                monitoring
                </span>
            } text='Producción' />
            <ActionButton icon={
                <span className="material-symbols-outlined">
                monitor_heart
                </span>
            } text='Reproducción' />
            <ActionButton icon={
                <span className="material-symbols-outlined">
                request_quote
                </span>
            } text='Finanzas' />
        </nav>
    )
}

export default AnimalActions;