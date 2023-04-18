import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
function AccountOpt({setAccountOptions} : any){
    const {setToken} = useContext(AuthContext)
    return ( 
        <ul>
            <button>Ver Perfil</button>
            <button onClick={()=> {
                localStorage.clear();
                setToken("");
                setAccountOptions(false);
            }}>Cerrar Sesion</button>
            <button>Configuracion</button>
        </ul>
        );
}

export {AccountOpt};