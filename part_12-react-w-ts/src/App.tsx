import { FC, useState } from 'react';
import ToDoList from './components/ToDoList';
import NewToDo from './components/NewToDo';
import { IToDo } from './types/model';

const App: FC = () => {
  const [todos, setToDo] = useState<IToDo[]>([]);
  const toDoAddHandle = (text: string) => {
    /* setToDo([...todos, { id: Math.random().toString(), text: text }]); */
    /* the above is a valid implementation, however it's not the most clean solution */
    setToDo((prevToDos) => [
      ...prevToDos,
      { id: Math.random().toString(), text: text },
    ]);
  };

  const toDoDeleteHandler = (toDoId: string) => {
    setToDo((prevToDos) => {
      return prevToDos.filter((todo) => todo.id !== toDoId);
    });
    /* this handler takes, like on adding items, the current state of todo-items and by using the built-in filter-method we then filter all items except the current todo-item's id. */
  };

  return (
    <div className="App">
      <NewToDo onAddToDo={toDoAddHandle} />
      {/* this 'pointer' is what enables the passing of data between the components.*/}

      <ToDoList items={todos} onDeleteToDo={toDoDeleteHandler} />
      {/* by adding the prop onDeleteToDo and assigning the handler this is sent to ToDoList-component, which then removes the given todo-item */}
    </div>
  );
};

export default App;
