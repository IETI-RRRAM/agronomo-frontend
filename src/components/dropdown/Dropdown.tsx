import './Dropdown.css';

type FormProps = {
    title: string;
    children: React.ReactNode;
    onClicDropdown: () => void;
};

const Dropdown = ({title, children, onClicDropdown}: FormProps) => {

    return (
        <div className='dropdown-container'>
            <div className='dropdown-header'>
                <h1 className='dropdown-title'>{title}</h1>
                <span onClick={onClicDropdown} className="material-symbols-outlined boton-close">
                close
                </span>
            </div>
            <main>
                {children}
            </main>
        </div>   
    )
}
export default Dropdown;
