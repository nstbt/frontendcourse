import {useState, useEffect} from 'react';
import TodoItem from './components/TodoItem';
import Input from './components/Input';

function App() {
  const [todos, setTodos] = useState([]);

  const getData = async () => {
    const result = await fetch('http://localhost:3030/todos');
    return await result.json();
  }

  useEffect(() => {
    getData().then((res) => setTodos(res));
  },[])

  const getAllTodos = () => {
    getData().then((res) => setTodos(res));
  }

  const getActiveTodos = () => {
    getData().then((res) => setTodos((res.filter((todo) => todo.done === false))));
  }

  const getCompletedTodos = () => {
    getData().then((res) => setTodos((res.filter((todo) => todo.done === true))));
  }

  const createTodo = async(todo) => {
    const result = await fetch('http://localhost:3030/todos', {
      method: 'POST',
      body: JSON.stringify(todo),
      headers: {'Content-type': 'application/json'}
    });

    const data = await result.json();

    setTodos([...todos, data]);
  }

  const deleteTodo = async(id) => {
    console.log("delete " + id);

    const result = await fetch(`http://localhost:3030/todos/${id}`, {
      method: 'DELETE',
      headers: {'Content-type': 'application/json'}
    });

    const data = await result.json(); // is this needed?

    console.log(data);

    getData().then((res) => setTodos(res));
  }

  return (
    <div>
      <Input createFunction={createTodo} />
      <button onClick={getAllTodos}>All</button><button onClick={getActiveTodos}>Open</button><button onClick={getCompletedTodos}>Completed</button>
      {todos.map((todo) => (
        <TodoItem key={todo.id} {...todo} deleteFunction={deleteTodo} />
      ))}
      
    </div>
    
  );
}

export default App;
