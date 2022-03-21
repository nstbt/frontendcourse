import {useState, useEffect} from 'react';
import { useForm } from "react-hook-form";
 
 const TodoItem = (props) => {
  const [status, setStatus] = useState(props.done);
  const [editing, setEditing] = useState(false);

  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  
  const onSubmit = data => {
    const newTodo = {...data, done: false}
    updateFunction(newTodo);
  }

  const updateFunction = async(todo) => {
    console.log(todo);
  }

  const getTodo = async(id) => {
    console.log(id);
    const result = await fetch(`http://localhost:3030/todos/${id}`);

    return await result.json();

  } 

  const handleEdit = async(id) => {
    const todo = await getTodo(id);
    console.log(todo);
  }

  const updateTodoStatus = async(id) => {
    const todo = await getTodo(id);
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

  const handleEditing = () => {
    console.log("edit mode activated");
    setEditing(true);
  }

  const handleUpdatedDone = event => {
    if (event.key === "Enter") {
      setEditing(false);
    }
  }

  //do i need useEffect?

  var viewMode = {};
  var editMode = {};
  

  useEffect(() => {

    if (editing) {
      viewMode = {display: "none"}
      editMode = {display: "block"}
    } else {
      editMode = {display: "none"}
      viewMode = {display: "block"}
    }
  },[editing, viewMode, editMode])

    return (
      <div className='flex items-center my-1 delete'>
        <input className='mr-2 checked:bg-purple-600' type="checkbox" onChange={() => updateTodoStatus(props.id)} checked={status} />
        <div onDoubleClick={handleEditing} style={viewMode}>
          {/* <label onClick={() => handleEdit(props.id)}>{props.label}</label> */}
          <label>{props.label}</label>
          <button className='ml-auto text-purple-600' onClick={() => props.deleteFunction(props.id)}></button>
        </div>
        <input type="text" style={editMode} value={props.label} onKeyDown={handleUpdatedDone} onChange={e => {props.updateFunction(e.target.value, props.id)}} className="border border-slate-200 py-0.5 px-1.5 mr-3" />
            
      </div>
    )
}

export default TodoItem;