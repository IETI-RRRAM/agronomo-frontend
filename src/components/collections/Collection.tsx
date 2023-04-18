import HelpButton from 'src/components/buttons/help/HelpButton';
import AddButton from 'src/components/buttons/add/AddButton';
import CollectionCard from 'src/components/collectionCard/CollectionCard';
import InfoCard from 'src/components/infoCard/InfoCard';
import getService from 'src/services/getService';
import { useEffect, useState } from 'react';
import './Collection.css';

type FormProps = {
    title: string;
    cardTitle: string;
    cardDescription: string;
    endpointUrl: string;
    iconUrl: string;
    addUrl: string;
    editUrl: string;
    cardUrl: string;
    haveInfo?: boolean;
    infoCardTitle?: string;
    infoCard?: {[key: string]: string};
};

const Collection = ({title, cardTitle, cardDescription, endpointUrl, iconUrl, addUrl, editUrl, cardUrl, haveInfo, infoCardTitle, infoCard}: FormProps) => {

    const [collectionInfo, setCollectionInfo] = useState();
    const [itemsCollection, setItemsCollection] = useState([]);

    useEffect(() => {
        getService(endpointUrl).then((response) => setItemsCollection(response.slice(0, 5)));
    }, []);

    return (
        <div className='container'>
            <div className='collection-title'>
                <h1>{title}</h1>
                {haveInfo && <InfoCard cardTitle={infoCardTitle ?? ''} info={infoCard}></InfoCard>}
            </div>
            <main className='card-group'>
                {
                    itemsCollection.map((item: any, index) => {
                        return <CollectionCard key={index} icon={iconUrl} editUrl={`${editUrl}${index + 1}`} name={`${item.name.substring(0, 9)}`} detailUrl={`${cardUrl}${item.id}`}/>
                    })
                }
            </main>
            <HelpButton title={cardTitle} description={cardDescription} />
            <AddButton redirectUrl={addUrl} />
        </div>
    )
}
export default Collection;