import { FC, useState } from 'react';
import ToDoList from './components/ToDoList';
import NewToDo from './components/NewToDo';
import { IToDo } from './types/model';

const App: FC = () => {
  const [todos, setToDo] = useState<IToDo[]>([]);
  const toDoAddHandle = (text: string) => {
    setToDo([...todos, { id: Math.random().toString(), text: text }]);
  };

  return (
    <div className="App">
      <NewToDo onAddToDo={toDoAddHandle} />
      {/* this 'pointer' is what enables the passing of data between the components.*/}
      <ToDoList items={todos} />
    </div>
  );
};

export default App;
