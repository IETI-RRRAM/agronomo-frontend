import React, { useContext, useState } from "react";
import { postService } from "src/services/postServices";
import { json } from "react-router-dom";
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
    return(
        <div className="Login">
            <form className="formLogin" onSubmit={handleSubmit}>
                <h1>Iniciar sesión</h1>
                <div className="email">
                    <label htmlFor="email">Email:</label>
                    <input type="text" id="email" name="email" value={authUser.email} onChange={handleEmail}/>
                </div>
                { errorAuthData.email && <span className="error-warning">{errorAuthData.email}</span>}

                <div className="password">
                    <label htmlFor="password">Contraseña:</label>
                    <input type="password" id="password" name="password" value={authUser.password}  onChange={handlePassword}/>
                </div>
                {errorAuthData.password && <span className="error-warning">{errorAuthData.password}</span>}

                <button type="submit">Iniciar sesión</button>
                {errorAuthData.error && <span id="error-submit" className="error-warning">{errorAuthData.error}</span>}
            </form>
        </div>
    );
};
export default LoginPage;