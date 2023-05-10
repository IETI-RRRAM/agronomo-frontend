import AnimalDataFinance from 'src/components/animalData/AnimalDataFinance';
import AnimalDataGeneral from 'src/components/animalData/AnimalDataGeneral';
import AnimalDataHealth from 'src/components/animalData/AnimalDataHealth';
import AnimalDataProduction from 'src/components/animalData/AnimalDataProduction';
import AnimalDataReproduction from 'src/components/animalData/AnimalDataReproduction';
import { useNavigate, useParams } from 'react-router-dom';
import {postService} from '../../services/postServices';
import getService from 'src/services/getService';
import {putService} from 'src/services/putService';
import { useEffect, useState } from 'react';
import './AnimalData.css';

interface FormProps {
    idRancho: undefined | string;
    isEdit: boolean;
}  

interface FormType {
    general: boolean;
    finance: boolean;
    health: boolean;
    production: boolean;
    reproduction: boolean;
}

interface FormTypeData {
    general: {};
    finance: {};
    health: {};
    production: {};
    reproduction: {};
}

interface FormTypeId {
    general: string | undefined;
    finance: string | undefined;
    health: string | undefined;
    production: string | undefined;
    reproduction: string | undefined;
}

const AnimalData = ({idRancho, isEdit}: FormProps) => {

    const { id } = useParams();
    const navigate = useNavigate();

    const [validForm, setValidForm] = useState<FormType>({
        general: false,
        finance: false,
        health: false,
        production: false,
        reproduction: false,
    });

    useEffect(() => {
        if (isEdit) {
            const newValidForm = {
                general: true,
                finance: true,
                health: true,
                production: true,
                reproduction: true,
            };
            setValidForm(newValidForm);
        }
    }, [])

    const [validFormData, setValidFormData] = useState<FormTypeData>({
        general: {},
        finance: {},
        health: {},
        production: {},
        reproduction: {},
    });

    const isValid = Object.keys(validForm).every(
        (key) => validForm[key as keyof typeof validForm] === true
    )

    const actionEditOrCreate = () => {
        console.log(validFormData);
        if (isEdit) {
            actionsUpdate();
        } else {
            actionsCreate();
        }
        navigate(-1);
    }

    const actionsUpdate = () => {
        //Data General
        const idGeneral = ("id" in validFormData["general"])?validFormData["general"].id: "";
        if (idGeneral) putService("https://animal-rest-service-production.up.railway.app/api/animals/" + idGeneral, validFormData["general"])
        //Data Finance
        const idFinance = ("id" in validFormData["finance"])?validFormData["finance"].id: "";
        if (idFinance) putService("https://finance-rest-service-production.up.railway.app/api/finance/" + idFinance, validFormData["finance"]);
        //Data Health
        const idHealth = ("id" in validFormData["health"])?validFormData["health"].id: "";
        if (idHealth) putService("https://health-rest-service-production.up.railway.app/api/health/" + idHealth, validFormData["health"]);
        //Data Production
        const idProduction = ("id" in validFormData["production"])?validFormData["production"].id: "";
        if (idProduction) putService("https://production-rest-service-production.up.railway.app/api/production/" + idProduction, validFormData["production"]);
        //Data Reproduction
        const idReproduction = ("id" in validFormData["reproduction"])?validFormData["reproduction"].id: "";
        if (idReproduction) putService("https://reproduction-rest-service-production.up.railway.app/api/reproduction/" + idReproduction, validFormData["reproduction"]);
    }

    const actionsCreate = () => {
        //Data General
        postService("https://animal-rest-service-production.up.railway.app/api/animals", validFormData["general"])
        .then(data => {
            const jsonID = { idAnimal: data.id };            
            // Data Finance
            postService("https://finance-rest-service-production.up.railway.app/api/finance", Object.assign({}, jsonID, validFormData["finance"]))
            //Data Health
            postService("https://health-rest-service-production.up.railway.app/api/health", Object.assign({}, jsonID, validFormData["health"]));
            //Data Production
            postService("https://production-rest-service-production.up.railway.app/api/production", Object.assign({}, jsonID, validFormData["production"]) );
            //Data Reproduction
            postService("https://reproduction-rest-service-production.up.railway.app/api/reproduction", Object.assign({}, jsonID, validFormData["reproduction"]));
            //Redirect
            navigate(-1);
        })
    }

    return (

    <div className="component-container">

        <div className='data-title'><h1>{(!isEdit)?"Agrega un nuevo Animal":"Edita la información del Animal"}</h1></div>

        <AnimalDataGeneral 
        id={id} 
        idRanch={idRancho}
        isEdit={isEdit} 
        validFormAnimal={validForm} 
        setValidFormAnimal={setValidForm}
        validFormAnimalData={validFormData} 
        setValidFormAnimalData={setValidFormData}
        /> 

        <AnimalDataFinance 
        id={id} 
        isEdit={isEdit} 
        validFormAnimal={validForm} 
        setValidFormAnimal={setValidForm}
        validFormAnimalData={validFormData} 
        setValidFormAnimalData={setValidFormData}
        />

        <AnimalDataHealth 
        id={id} 
        isEdit={isEdit} 
        validFormAnimal={validForm} 
        setValidFormAnimal={setValidForm}
        validFormAnimalData={validFormData} 
        setValidFormAnimalData={setValidFormData}
        />

        <AnimalDataProduction 
        id={id} 
        isEdit={isEdit} 
        validFormAnimal={validForm} 
        setValidFormAnimal={setValidForm}
        validFormAnimalData={validFormData} 
        setValidFormAnimalData={setValidFormData}
        />

        <AnimalDataReproduction 
        id={id} 
        isEdit={isEdit} 
        validFormAnimal={validForm} 
        setValidFormAnimal={setValidForm}
        validFormAnimalData={validFormData} 
        setValidFormAnimalData={setValidFormData}
        />

        <button disabled={!isValid} onClick={() => actionEditOrCreate()} className='data-button'>{(isEdit)?"Editar":"Añadir"}</button>
    </div>

    );
}


export default AnimalData;