import React from 'react';
import './InfoCard.css'

type InfoCardType = {
    cardTitle: string;
    info?: {[key: string]: string};
}

const InfoCard = ({cardTitle, info = {}}: InfoCardType) => {

    return (
        <div className='info-card'>
            <h3 className='info-card-title'>{cardTitle}</h3>
            <ul className='info-card-items'>                
                {
                    Object.keys(info).map((infoKey, key) => {
                        return (
                            <li key={key} className='info-card-item'>
                                <p><b>{infoKey}:</b> {info[infoKey]} </p>
                            </li>
                        )
                    } )
                }
            </ul>
        </div>
    )
}
export default InfoCard;