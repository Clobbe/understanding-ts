import React from 'react';

interface IToDo {
  items: { id: string; text: string }[];
}

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
