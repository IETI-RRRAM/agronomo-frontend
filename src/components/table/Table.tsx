import './Table.css';

type FormProps = {
    listObjects?: { [key: string]: any}[];
    onDelete: (index: number) => void;
};

const Table = ({listObjects = [], onDelete}: FormProps) => {

    const columns = (listObjects.length != 0)?Object.keys(listObjects[0]):["Datos"];

    return (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                {columns.map((column) => (
                  <th key={column}>{column}</th>
                ))}
                <th></th>
              </tr>
            </thead>
            <tbody>
              {listObjects?.map((row, index) => (
                <tr key={index}>
                  {columns.map((column, index) => (
                    <td key={index}>{row[column]}</td>
                  ))}
                  <td>
                    <span onClick={() => onDelete(index)} className="material-symbols-outlined boton-delete">
                        delete
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
}
export default Table;