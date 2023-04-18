import Dropdown from '../dropdown/Dropdown';
import Table from '../table/Table';
import { useState } from 'react';

import './InfoCard.css'

type InfoCardType = {
    cardTitle: string;
    info?: {[key: string]: any};
}

const InfoCard = ({cardTitle, info = {}}: InfoCardType) => {

    const [openDropdown, setOpenDropdown] = useState(false);
    const [listDropdown, setListDropdown] = useState([{}]);
    const [titleDropdown, setTitleDropdown] = useState('Data');

    const onClicDropdown = (key: string, data: string[]) => {
        if (!Array.isArray(data)) {
            setListDropdown([data]);
        } else {
            setListDropdown(data);
        }
        if (!openDropdown) {
            setOpenDropdown(true);
        }
        setTitleDropdown(key.charAt(0).toUpperCase() + key.slice(1));
    }

    const closeDropdown = () => {
        setOpenDropdown(false);
    }

    return (
        <>
        <div className='info-card'>
            <h3 className='info-card-title'>{cardTitle}</h3>
            <ul className='info-card-items'>                
                {
                    Object.keys(info).map((infoKey, key) => {
                        if (typeof(info[infoKey]) === "object") {
                            return (
                                <li key={key} className='info-card-item'>
                                    <p><b>{infoKey}:</b> <button className='button-table' onClick={() => onClicDropdown(infoKey, info[infoKey])}>Ver</button></p>
                                </li>
                            );
                        } else  {
                            return (
                                <li key={key} className='info-card-item'>
                                    <p><b>{infoKey}:</b> {info[infoKey]} </p>
                                </li>
                            )
                        } 
                    })
                }
            </ul>
        </div>
        {
            (openDropdown) && 
            <Dropdown
            title={titleDropdown}
            onClicDropdown={closeDropdown}
            >
            <Table 
            listObjects={listDropdown}
            isEdit={false}
            />
            </Dropdown>
        }
        </>
        
    )
}
export default InfoCard;
