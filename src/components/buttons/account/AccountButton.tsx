import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import './AccountButton.css'
const AccountOpt = ({setAccountOptions} : any) => {
    const {setToken} = useContext(AuthContext)
    return ( 
        <ul>
            <button className='submit-button account-button' onClick={()=> {
                localStorage.clear();
                setToken("");
                setAccountOptions(false);
            }}>Cerrar Sesion</button>
        </ul>
        );
}

export default AccountOpt;