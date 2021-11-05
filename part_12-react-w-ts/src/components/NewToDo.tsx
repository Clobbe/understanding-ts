import React, { useRef } from 'react';

const NewToDo: React.FC = () => {
  const textInputRef = useRef<HTMLInputElement>(null);
  const toDoSubmitHandler = (event: React.FormEvent) => {
    event.preventDefault();
  };

  return (
    <form onSubmit={toDoSubmitHandler}>
      <div>
        <label htmlFor="todo-text">ToDo Text</label>
        <br />
        <input type="text" id="todo-text" ref={textInputRef} />
      </div>
      <button type="submit">Add ToDo</button>
    </form>
  );
};

export default NewToDo;
