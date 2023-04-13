import './InfoCard.css'

type InfoCardType = {
    cardTitle: string;
    info?: {[key: string]: any};
}

const InfoCard = ({cardTitle, info = {}}: InfoCardType) => {

    return (
        <div className='info-card'>
            <h3 className='info-card-title'>{cardTitle}</h3>
            <ul className='info-card-items'>                
                {
                    Object.keys(info).map((infoKey, key) => {
                        //Si es un String
                        if (typeof(info[infoKey]) === "string") {
                            return (
                                <li key={key} className='info-card-item'>
                                    <p><b>{infoKey}:</b> {info[infoKey]} </p>
                                </li>
                            )
                        
                        //Si es un arreglo
                        } else if (Array.isArray(info[infoKey])) {
                                return (
                                    <div className='container-objects'>
                                        <h1 className='section-animal'>{infoKey}</h1>
                                        {
                                            info[infoKey].map((obj: object, index: number) => {
                                                return (
                                                    <div className='container-objects'>
                                                        <h1 className='section-animal'>{infoKey} {index+1}</h1>
                                                    {
                                                        Object.keys(obj).map((infoObj, keyIndex) => {
                                                            return (
                                                                <li key={keyIndex} className='info-card-item'>
                                                                    <p><b>{infoObj}:</b> {info[infoKey][infoObj]} </p>
                                                                </li>
                                                            );
                                                        })
                                                    }
                                                    </div>
                                                );
                                            })
                                        } 
                                    </div>
                                );
                        //Si es un Objecto
                        } else if (typeof(info[infoKey]) === "object") {
                                return (
                                    <div className='container-objects'>
                                        <h1 className='section-animal'>{infoKey}</h1>
                                    {
                                        Object.keys(info[infoKey]).map((infoObj, keyIndex) => {
                                            return (
                                                <li key={keyIndex} className='info-card-item'>
                                                    <p><b>{infoObj}:</b> {info[infoKey][infoObj]} </p>
                                                </li>
                                            );
                                        })
                                    }
                                    </div>
                                );
                        }
                    } )
                }
            </ul>
        </div>
    )
}
export default InfoCard;
