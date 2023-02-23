import './app.scss';
import Column from './components/Column/Column';
import { useState } from 'react';
import ColumnForm from './components/Column/ColumnForm';

function App() {
  const [columns, setColumns] = useState([{title:"C-One"}])
  const [columnForm, setColumnForm] = useState(false)

  function toggleColumnForm(){
    setColumnForm(!columnForm)
  }

  function removeColumn(title){
    const updatedColumns = columns.filter((col) => col.title !== title)
    setColumns(updatedColumns)
  }

  return (
    <div className="App">
      <button onClick={toggleColumnForm}>Add new column</button>
      {
        columns.map((col, index) => {return <Column key={index} props={{col, removeColumn}}/>}
        )
      }
      {columnForm? <ColumnForm props={{columns, setColumns, toggleColumnForm}}/>:""}
    </div>
  );
}

export default App;
