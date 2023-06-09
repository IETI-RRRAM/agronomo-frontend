
import './FormItem.css';

interface FormItemType {
    title: string,
    placeHolder: string,
    type: string,
    accept?: string,
    value: any,
    onChagne: any,
    error: string | undefined
}

const FormItem = ({title, placeHolder, type, value, onChagne, error , accept = ''}: FormItemType) => {
    return (
        <div className='item-container'>
          {title}
          <label>
            <input value={value} onChange={onChagne} type={type} placeholder={placeHolder} accept={accept}/>
          </label>
          {error && <span className="error" role="alert">{error}</span>}
        </div>
    )
}
export default FormItem;