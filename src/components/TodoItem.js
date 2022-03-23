import {useState, useEffect} from 'react';
 
 const TodoItem = (props) => {
  const [status, setStatus] = useState(props.done);
  const [editing, setEditing] = useState(false);

  const updateFunction = (updatedTitle, id) => {
    console.log(updatedTitle, id);
    
  }

  const getTodo = async(id) => {
    console.log(id);
    const result = await fetch(`http://localhost:3030/todos/${id}`);

    return await result.json();

  } 

  const handleEdit = async(updatedTitle, id) => {
    const todo = await getTodo(id);
    todo.label = updatedTitle;
    const result = await fetch(`http://localhost:3030/todos/${id}`, {
      method: 'PUT',
      body: JSON.stringify(todo),
      headers: {'Content-type': 'application/json'}
    });

    const data = await result.json(); //is this needed?

    console.log(data);

    props.updateFunction();
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
    console.log(event);
    if (event.key === "Enter") {
      setEditing(false);
      // props.updateFunction(event.target.value, props.id)
      handleEdit(event.target.value, props.id)
    }
  }

  //do i need useEffect?

  var viewMode = {};
  var editMode = {};
  

  useEffect(() => {

    if (editing) {
      viewMode = {display: "none"}
    } else {
      editMode = {display: "none"}
    }
  },[editing, viewMode, editMode])

    return (
      <div className='flex items-center my-1 delete'>
        <input className='mr-2 checked:bg-purple-600' type="checkbox" onChange={() => updateTodoStatus(props.id)} checked={status} />
        { !editing ? <div onDoubleClick={handleEditing} style={viewMode} className='flex justify-end w-100'>
          {/* <label onClick={() => handleEdit(props.id)}>{props.label}</label> */}
          <label>{props.label}</label>
          
        </div> : 
        <input type="text" style={editMode} defaultValue={props.label} onKeyDown={handleUpdatedDone} onChange={e => {updateFunction(e.target.value, props.id)}} className="border border-slate-200 py-0.5 px-1.5 mr-3" /> }
        <button className='ml-auto text-purple-600' onClick={() => props.deleteFunction(props.id)}></button>
      </div>
    )
}

export default TodoItem;