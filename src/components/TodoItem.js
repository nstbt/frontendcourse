import {useState} from 'react';
 
 const TodoItem = (props) => {
  const [status, setStatus] = useState(props.done);

  const getTodo = async(id) => {
    console.log(id);
    const result = await fetch(`http://localhost:3030/todos/${id}`);

    const data = await result.json();

    updateTodo(data);
  } 



  const updateTodo = async(todo) => {

    todo.done = !todo.done;
    setStatus(todo.done);

    const result = await fetch(`http://localhost:3030/todos/${todo.id}`, {
      method: 'PUT',
      body: JSON.stringify(todo),
      headers: {'Content-type': 'application/json'}
    });

    const data = await result.json(); //is this needed?

    console.log(data);
  }

  //do i need useEffect?

    return (
        <div>
            {/* <input type="checkbox" checked={props.done} onChange={updateTodo(props.id)} /><label>{props.label} ({props.done})</label> */}
            <input type="checkbox" onChange={() => getTodo(props.id)} checked={status} /><label>{props.label}</label><button onClick={() => props.deleteFunction(props.id)}>x</button>
        </div>
    )
}

export default TodoItem;