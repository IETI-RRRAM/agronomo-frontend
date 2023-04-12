import React, { useContext, useState } from "react";
import { postService } from "src/services/postServices";
import Form from 'components/form/Form';
import FormItem from 'components/formItem/FormItem';
import {AuthContext} from "components/contexts/AuthContext";

function LoginPage(){
    const BASE_URL = "http://localhost:8080";
    const [authUser, setAuthUser] = useState({
        email:"",
        password:""
    });
    const [errorAuthData, setErrorAuthData] = useState({
        email:"",
        password:"",
        error:""
    });
    const {setToken} = useContext(AuthContext);

    const handleEmail = (event: any) => {
        let newEmailValue = event.target.value;
        if(!newEmailValue){
            setErrorAuthData({...errorAuthData, email: "email is required"});
        }else if(!(newEmailValue.includes("@") && newEmailValue.includes("."))){
            setErrorAuthData({...errorAuthData, email: "email is not valid", error:""});
        }else{
            setErrorAuthData({...errorAuthData, email:""});
        }
        setAuthUser({...authUser, email: newEmailValue});
    };

    const handlePassword = (event: any) => {
        let newPasswordValue = event.target.value;
        if(!newPasswordValue){
            setErrorAuthData({...errorAuthData, password: "password is required"});
        }else if(newPasswordValue.length < 4){
            setErrorAuthData({...errorAuthData, password: "password must have more than 3 character", error:""});
        }else{
            setErrorAuthData({...errorAuthData, password:""});
        }
        setAuthUser({...authUser, password: newPasswordValue});
    };

    const handleSubmit = (event: any ) => {
        event.preventDefault();
        if(authUser.email && authUser.password){
            //send the data
            setErrorAuthData({...errorAuthData, error:""})
            postService(`${BASE_URL}/v1/auth`, authUser)
            .then( data => {
                if(data?.token){
                    localStorage.setItem("token", data.token);
                    setToken(data.token);
                }else{
                    setErrorAuthData({...errorAuthData, error:data.message});
                    setAuthUser({...authUser, email:"", password: ""});
                }
            })
        }
        else{
            setErrorAuthData({...errorAuthData, error:"The data is incorrect, please check it."})
        }
    }

    const isValidDataForm = () => {
        return !errorAuthData.error && !!authUser.email && !!authUser.password && !errorAuthData.password && !errorAuthData.email;
    }

    return(
        <Form title="Iniciar sesión" onSubmit={handleSubmit} isValid={isValidDataForm()} buttonText="Iniciar sesión" formError={errorAuthData.error}>
            <FormItem 
            title="Email:" 
            placeHolder="user@example.com" 
            type="text" 
            value={authUser.email} 
            onChagne={handleEmail} 
            error={errorAuthData.email}/>

            <FormItem 
            title="Contraseña:" 
            placeHolder="******" 
            type="password" 
            value={authUser.password} 
            onChagne={handlePassword} 
            error={errorAuthData.password}/>
        </Form>
    );
};
export default LoginPage;