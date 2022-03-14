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

  const createTodo = async(todo) => {
    const result = await fetch('http://localhost:3030/todos', {
      method: 'POST',
      body: JSON.stringify(todo),
      headers: {'Content-type': 'application/json'}
    });

    const data = await result.json();

    setTodos([...todos, data]);
  }

  return (
    <div>
      <Input createFunction={createTodo} />
      <ul>
        {todos.map((todo) => (
          <TodoItem key={todo.id} {...todo} />
        ))}
      </ul>
    </div>
    
  );
}

export default App;
