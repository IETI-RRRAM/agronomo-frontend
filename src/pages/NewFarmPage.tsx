import Form from 'components/form/Form';
import FormItem from 'components/formItem/FormItem';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom'
import { uploadFile } from '../../firebase/config'
import { postService } from 'src/services/postServices';

interface FormType {
  location: undefined | string;
  name: undefined | string;
  area: undefined | string;
  purpose: undefined | string;
  image: undefined | string;
}

const NewFarmPage = () => {
    const [isEdit, setIsEdit] = useState(false);

    const locationRoute = useLocation();

    useEffect(() => {
      if (locationRoute.pathname.includes('/edit')) {
        setIsEdit(true);
        // getService(id) SE DEBE HACER CONSULTA DE ESA GRANJA
      }
    }, [])

    const [location, setLocation] = useState('');
    const [name, setName] = useState('');
    const [area, setArea] = useState('');
    const [purpose, setPurpose] = useState('');
    const [image, setImage] = useState<any>('');
    const [imageName, setImageName] = useState<any>('');
  
    const [validForm, setValidForm] = useState<FormType>({
      location: undefined,
      name: undefined,
      area: undefined,
      purpose: undefined,
      image: '',
    });

    const onSubmit = async (event: any) => {
      event.preventDefault();
      let fileUrl = '';
      if (image !== '') {
        fileUrl = await uploadFile(image).then((file) => {
          return file;
        }) ?? ''
      }
      const formData = {
        name: name,
        ownerId : localStorage.getItem("userId"),
        location: location,
        area: Number(area),
        purpose: purpose,
        imageUrl: fileUrl
      };
      postService(`${import.meta.env.VITE_BASE_URL_FARM}v1/farm`, formData)
    };

    const handleNameChange = (event: any) => {
      const value = event.target.value;
      setValidForm({
        ...validForm,
        name: value.length === 0 ? 'el nombre es obligatorio' : ''
      });
  
      setName(value);
    }

    const handleLocationChange = (event: any) => {
      const value = event.target.value;
      setValidForm({
        ...validForm,
        location: value.length === 0 ? 'la ubicación es obligatoria' : ''
      });
  
      setLocation(value);
    }

    const handlePurposeChange = (event: any) => {
      const value = event.target.value;
      setValidForm({
        ...validForm,
        purpose: value.length === 0 ? 'la ubicación es obligatoria' : ''
      });
  
      setPurpose(value);
    }

    const handleAreaChange = (event: any) => {
      const value = event.target.value;
      let errorMessage = '';
      if (value <= '0') errorMessage = 'el area debe ser mayor a 0';
      if (value === '') errorMessage = 'el area es obligatoria';
      setValidForm({
        ...validForm,
        area: errorMessage
      });
      setArea(value);
    }

    const handleImageChange = (event: any) => {
      const selectedFile = event.target.files[0];
      const value = event.target.value;
      setImage(selectedFile || '');
      setImageName(value);
    }

    const isValid = Object.keys(validForm).every(
      (key) => validForm[key as keyof typeof validForm] === ''
    )

    return (
    <Form title={isEdit ? 'Edita tu granja' : 'Crea una nueva granja'} onSubmit={onSubmit} isValid={isValid} buttonText={isEdit ? 'Editar' : 'Crear'}>
    <FormItem
        title={'Nombre:'}
        placeHolder={'Ingrese un nombre'}
        type={'text'}
        value={name}
        onChagne={handleNameChange}
        error={validForm.name}
    />
    <FormItem 
        title={'Proposito:'}
        placeHolder={'Proposito del Granja'}
        type={'text'}
        value={purpose}
        onChagne={handlePurposeChange}
        error={validForm.purpose}
    />
    <FormItem 
        title={'Ubicación:'}
        placeHolder={'Ingrese la ubicación'}
        type={'text'}
        value={location}
        onChagne={handleLocationChange}
        error={validForm.location}
    />
    <FormItem 
        title={'Área:'}
        placeHolder={'Ingrese el área de la granja'}
        type={'number'}
        value={area}
        onChagne={handleAreaChange}
        error={validForm.area}
    />
    <FormItem 
        title={'Imagen:'}
        placeHolder={'Suba una imagen de su granja'}
        type={'file'}
        value={imageName}
        onChagne={handleImageChange}
        accept=".jpg, .jpeg, .png"
        error={validForm.image}
    />
    
    </Form>);
}


export default NewFarmPage;