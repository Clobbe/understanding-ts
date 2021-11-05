# Part 12 - React with TypeScript

## Main learnings

### useState() with types

```typescript
const [todos, setToDo] = useState<IToDo[]>([]);
```

The above is a simple example of how leveraging types support later on in the code. Making sure that, in this case setTodo() function receives the correct arguments to ensure that for this case, a new ToDo is added to the array, 'todos'.

### State Updates, clean and secure

```typescript
const toDoAddHandle = (text: string) => {
  setToDo([...todos, { id: Math.random().toString(), text: text }]);
};
```

The above code example is a valid implementation of how to make sure we're 'unpacking' whatever exists in the array _todos_ and then adding a new Object to that array. For most cases there would probably not be any errors with this approach. However, due to how the state scheduler works in React, this implementation expose the risk of that it's _not_ the most current state that's being unpacked with the spread-operator (`...todos`) this way.

A more cleaner and secure way of doing it is:

```typescript
const toDoAddHandle = (text: string) => {
    setToDo((prevToDos) => [
      ...prevToDos,
      { id: Math.random().toString(), text: text },
    ]);
```

This way of implementation guarantees that we're updating the state with the most current state of whatever exists in the array `todos` (which is inferred into the `prevToDos`-function)

Below is an other example of how this safe implementation works:

```typescript
const toDoDeleteHandler = (toDoId: string) => {
  setToDo((prevToDos) => {
    return prevToDos.filter((todo) => todo.id !== toDoId);
  });
};
```

Again, show that by unpacking whatever the array contain with the triggering of function (`prevToDos`) we ensure that we update the state properly. The filtering part in the code take care of filtering out the ToDo that should be deleted.
