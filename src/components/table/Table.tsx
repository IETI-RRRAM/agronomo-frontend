import { useEffect } from 'react';
import './Table.css';

type FormProps = {

    listObjects?: { [key: string]: any}[];
    isEdit: boolean;
    onDelete?: (index: number) => void;
    onAdd?: () => void;
};

const Table = ({listObjects = [], isEdit, onDelete, onAdd}: FormProps) => {

    let col;
    if (listObjects.length == 0) {
      col = ["Agrega Datos"];
    } else if (typeof listObjects[0] === "object") {
      col = Object.keys(listObjects[0]);
    } else {
      col = ['Date'];
    }
    const columns = col;

    const handleOnDelete = (index: number) => {
      if (onDelete) onDelete(index);
    }

    return (
        <div className="table-container">
          {
          (listObjects.length != 0)?
          <table>
            <thead>
              <tr>
                {columns.map((column) => (
                  <th key={column}>{column}</th>
                ))}
                {
                (isEdit && <th></th>)
                } 
              </tr>
            </thead>
            <tbody>
              {listObjects?.map((row, index) => {
                
                let valueRow;
                if (typeof row === "string") {
                  valueRow = new Date(row).toLocaleString();
                }
                
                return <tr key={index}>
                  
                  {(typeof listObjects[0] === "object")?columns.map((column, index) => (
                    <td key={index}>{row[column]}</td>
                  )):<td key={index}>{valueRow}</td>}

                  {
                    (isEdit &&
                    <td>
                    <span onClick={() => handleOnDelete(index)} className="material-symbols-outlined boton-delete">
                        delete
                    </span>
                    </td>)
                  }
                </tr>
            } )}
            </tbody>
          </table>
          :<h1 className='no-items'>No Hay Items Para Mostrar</h1>
          }
          {
            (isEdit &&
            <span className="material-symbols-outlined boton-add" onClick={onAdd}>
            add_circle
            </span>)
          }
        </div>
      );
}
export default Table;