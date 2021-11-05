import React from 'react';
import './ToDoList.css';

interface IToDo {
  items: { id: string; text: string }[];
  onDeleteToDo: (id: string) => void;
  /* this is added in order to tell TS what type the onDeleteToDo is */
}

const ToDoList: React.FC<IToDo> = (props) => {
  return (
    <ul>
      {props.items.map((todo) => (
        <li key={todo.id}>
          <span>{todo.text} </span>
          <button onClick={props.onDeleteToDo.bind(null, todo.id)}>
            {/* to make it work we use the props, which by our App-component receives the onDeleteToDo-prop that passes in the handler to remove an item. This is then binded to make sure that the todo.id is passed down to the toDoDeleteHandler. */}
            delete
          </button>
        </li>
      ))}
    </ul>
  );
};

export default ToDoList;
