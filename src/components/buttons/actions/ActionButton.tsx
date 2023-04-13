import { ReactNode } from 'react';
import './ActionButton.css'

type ActionButtonPros= {
    icon: ReactNode;
    text: string;
}

const ActionButton = ({ icon, text }: ActionButtonPros) => {
    return (
        <>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
        <button className='action'> 
            {icon}
            <p className='action-text'>{text}</p>
        </button>
        </>
    )
}

export default ActionButton;