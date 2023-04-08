import { useNavigate } from 'react-router-dom';
import './CollectionCard.css'
type CollectionCardProps = {
    icon: string;
    editUrl: string;
    detailUrl: string;
    name: string;
}

const CollectionCard = ({icon, editUrl, name, detailUrl}: CollectionCardProps) => {
    const navigation = useNavigate();

    return(
        <article className='collection-card'>
            <div className='edit'>
                <button className='edit-button' onClick={() => navigation(editUrl)}>
                    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
                    <span className="material-symbols-outlined">
                        edit
                    </span>
                </button>
            </div>
            <img className='card-image' src={icon} alt="tractor" width={150}  onClick={() => navigation(detailUrl)}/>
            <h3 className='card-title'  onClick={() => navigation(detailUrl)}>{name}</h3>
        </article>
    )
}

export default CollectionCard;