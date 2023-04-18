import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
const AccountOpt = () => {
    const {setToken} = useContext(AuthContext)
    return ( 
        <ul>
            <button className='submit-button' onClick={()=> {
                localStorage.clear();
                setToken("")
            }}>Cerrar Sesion</button>
        </ul>
        );
}

export default AccountOpt;