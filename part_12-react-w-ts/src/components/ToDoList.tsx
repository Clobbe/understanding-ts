import React from 'react';

const ToDoList: React.FC = () => {
  const todos = [{ id: 'id1', text: 'complete this course' }];
  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>{todo.text}</li>
      ))}
    </ul>
  );
};

export default ToDoList;
