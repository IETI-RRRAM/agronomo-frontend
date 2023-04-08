import  HelpButton from 'src/components/help/HelpButton'
import  CollectionCard from 'src/components/collectionCard/CollectionCard'
import './Collection.css'
import { useEffect, useState } from 'react';
import getService from 'src/services/getService'

type FormProps = {
    title: string;
    cardTitle: string;
    cardDescription: string;
    urlEndpoint: string;
};

const Collection = ({title, cardTitle, cardDescription, urlEndpoint}: FormProps) => {

    const [itemsCollection, setItemsCollection] = useState([]);


    // Se está usando un url de ejemplo tiene que ser sustituida por nuestros endpoints
    useEffect(() => {
        getService(urlEndpoint).then((response) => setItemsCollection(response.slice(0, 5)));
    }, []);
    
    return (
        <div className='container'>
            <div className='collection-title'><h1>{title}</h1></div>
            <HelpButton title={cardTitle} description={cardDescription}></HelpButton>
            <main className='card-group'>
                {
                    itemsCollection.map((item, index) => {
                        return <CollectionCard key={index} icon={'src/assets/tractor.svg'} editUrl={`farms/edit/${index + 1}`} name={`Tractor ${index + 1}`} detailUrl={`ranches/${index + 1}`}/>
                    })
                }
            </main>
        </div>
    )
}
export default Collection;