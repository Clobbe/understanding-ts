import React from 'react';
import { IToDo } from '../types/model';

const ToDoList: React.FC<IToDo> = (props) => {
  return (
    <ul>
      {props.items.map((todo) => (
        <li key={todo.id}>{todo.text}</li>
      ))}
    </ul>
  );
};

export default ToDoList;
