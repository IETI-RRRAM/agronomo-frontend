import './ItemButton.css';

interface FormProps {
    title: string,
    value: any,
    onClick: any,
}

const ItemButton = ({title, value, onClick}: FormProps) => {
    return (
        <div className='button-container'>
          {title}
          <label>
            <button className='button-item' onClick={onClick}>{value}</button>
          </label>
        </div>
    )
}
export default ItemButton;