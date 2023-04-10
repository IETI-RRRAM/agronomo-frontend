import './InfoCard.css'

type InfoCardType = {
    cardTitle: string;
    info?: {[key: string]: string}[];
}

const InfoCard = ({cardTitle, info}: InfoCardType) => {
    return (
        <div className='info-card'>
            <h3 className='info-card-title'>{cardTitle}</h3>
            <ul className='info-card-items'>
                <li className='info-card-item'>
                    <p><b>Nombre:</b> Granja Gallina Feliz </p>
                </li>
                <li className='info-card-item'>
                    <p><b>Propósito:</b>  Granja de huevos </p>
                </li>
                <li className='info-card-item'>
                    <p><b>Lugar:</b>  Cogua</p>
                </li>
                <li className='info-card-item'>
                    <p><b>Area:</b>  20 fanegada</p>
                </li>
            </ul>
        </div>
    )
}
export default InfoCard;