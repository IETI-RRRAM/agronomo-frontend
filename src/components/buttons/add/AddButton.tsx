import { useNavigate } from 'react-router-dom';
import './AddButton.css';

type HelpButtonType = {
    redirectUrl: string;
}

const HelpButton = ({ redirectUrl }: HelpButtonType) => {
    const navigate = useNavigate();

    return (
            <button className='add' onClick={() => navigate(redirectUrl)}>
                <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
                <span className="material-symbols-outlined button-add">
                    add
                </span>
            </button>
    )
}

export default HelpButton;