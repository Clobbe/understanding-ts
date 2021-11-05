import React, { useRef } from 'react';
import './NewToDo.css';

interface NewToDoProps {
  onAddToDo: (toDoText: string) => void;
}

const NewToDo: React.FC<NewToDoProps> = (props) => {
  const textInputRef = useRef<HTMLInputElement>(null);
  const toDoSubmitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    const enteredText = textInputRef.current!.value;
    /* again an example of where the addition of an exclamation (!) tells TS that this will not be null.
    In this particular situation it's needed since we know that the connection between the input-field and useRef()-function will work since the above code will not be triggered unless the below code has already successfully been rendered.*/
    props.onAddToDo(enteredText);
  };

  return (
    <form onSubmit={toDoSubmitHandler}>
      <div className="form-control">
        <label htmlFor="todo-text">ToDo Text</label>
        <br />
        <input type="text" id="todo-text" ref={textInputRef} />
      </div>
      <button type="submit">Add ToDo</button>
    </form>
  );
};

export default NewToDo;
