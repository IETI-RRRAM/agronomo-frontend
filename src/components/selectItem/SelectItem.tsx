import { useRef, useState } from "react";
import './SelectItem.css';

interface FormSelectType {
    title: string,
    selectRef: React.RefObject<HTMLSelectElement>;
    onChagne: any,
    options: string[],
    error: string | undefined,
}

const SelectItem = ({title, selectRef, onChagne, options, error}: FormSelectType) => {
    

    return (
        <div className='select-container'>
            {title}
            <select ref={selectRef} onChange={onChagne}>
                {
                    options.map((option, index) => {
                        return (
                            <option key={index} value={option}>{option}</option>
                        );
                    })
                }
            </select>
            {error && <span className="error" role="alert">{error}</span>}
        </div>
    )
}
export default SelectItem;