// Using react hooks
import React, { Fragment, useEffect, useState } from "react";
import EditTodo from "./EditTodo";
// primary component "listtodos"
const ListTodos = () => {
  //create state
  const [todos, setTodos] = useState([]); // default val empty array

  //delete func.
  // async, takes in id from params
  const deleteTodo = async (id) => {
    // try catch block
    try {
      // deleteTodo object will recieve the response of fetch statement
      const deleteTodo = await fetch(`http://localhost:5000/todos/${id}`, {
        method: "DELETE", // change fetch method to
      }); //template string
      console.log(deleteTodo);

      // update the state of todos
      // using a filter method for the todos object
      // take in x and return x that have an id
      // logically, filter todos object's primary key todo_id that do not have an id
      setTodos(todos.filter((todo) => todo.todo_id !== id));
    } catch (err) {}
  };

  const getTodos = async () => {
    try {
      const response = await fetch("http://localhost:5000/todos"); //by default fetch is a get reqeust
      const jsonData = await response.json(); // parse the json data

      setTodos(jsonData); //setTodos only way to change state
    } catch (err) {
      console.log(err.message);
    }
  };
  useEffect(() => {
    getTodos();
  }, []);
  return (
    <Fragment>
      {" "}
      <table className="table mt-5 text-center">
        <thead>
          <tr>
            <th>Description</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {/* <tr>
               <td>John</td>
            <td>Doe</td>
            <td>john@example.com</td> 
            </tr>
            */}
          {todos.map((todo) => (
            <tr key={todo.todo_id}>
              <td>{todo.description}</td>
              <td>
                <EditTodo />
              </td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteTodo(todo.todo_id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  );
};

export default ListTodos;
