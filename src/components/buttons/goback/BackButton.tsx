import { useNavigate } from 'react-router-dom';
import './BackButton.css'

const BackButton = () => {
    const navigate = useNavigate();
    const route = window.location.pathname;

    return (
        <>
            {route !== '/' && 
            <button className='back' onClick={() => navigate(-1)}>
                <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
                <span className="material-symbols-outlined button-back">
                    arrow_back_ios
                </span>
            </button>}
        </>
    )
}

export default BackButton;