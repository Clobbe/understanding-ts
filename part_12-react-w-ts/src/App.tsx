import React from 'react';
import ToDoList from './components/ToDoList';
import NewToDo from './components/NewToDo';

const App: React.FC = () => {
  const todos = [{ id: 'id1', text: 'complete this course' }];

  const toDoAddHandle = (text: string) => {
    console.log(text);
  };

  return (
    <div className="App">
      <NewToDo onAddToDo={toDoAddHandle} />
      <ToDoList items={todos} />
    </div>
  );
};

export default App;
