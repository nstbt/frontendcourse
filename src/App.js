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

  const getAllTodos = (e) => {
    const button = e.target;
    styleFilters(button);
    getData().then((res) => setTodos(res));
  }

  const getActiveTodos = (e) => {
    const button = e.target;
    styleFilters(button);
    
    getData().then((res) => setTodos((res.filter((todo) => todo.done === false))));
  }

  const getCompletedTodos = (e) => {
    const button = e.target;
    styleFilters(button);
    getData().then((res) => setTodos((res.filter((todo) => todo.done === true))));
  }

  const styleFilters = button => {
    const filterButtons = button.parentNode.childNodes;
    for (let i = 0; i < filterButtons.length; i++) {
      filterButtons[i].classList.remove('active');
    }
    button.classList.add('active');
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

  const setUpdate = () => {
      getData().then((res) => setTodos(res))
    
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
    <div className="container mx-auto max-w-fit	p-20">
      <Input createFunction={createTodo} />
      <div className='flex justify-between my-3'><button className='active rounded hover:bg-purple-200 hover:border-purple-600 border border-slate-200 py-0.5 px-3' onClick={getAllTodos}>All</button><button className='rounded hover:bg-purple-200 hover:border-purple-600 border border-slate-200 active:border-purple-600 py-0.5 px-3' onClick={getActiveTodos}>Open</button><button className='rounded hover:bg-purple-200 hover:border-purple-600 border border-slate-200 active:border-purple-600 py-0.5 px-3' onClick={getCompletedTodos}>Completed</button></div>
      {todos.map((todo) => (
        <TodoItem key={todo.id} {...todo} deleteFunction={deleteTodo} updateFunction={setUpdate} />
      ))}
      
    </div>
    
  );
}

export default App;
