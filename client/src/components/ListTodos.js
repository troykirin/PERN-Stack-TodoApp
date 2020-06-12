// Using react hooks
import React, { Fragment, useEffect, useState } from "react";
// Import EditTodo as edits will happen within the ListTodos component.
import EditTodo from "./EditTodo";

// primary component ListTodos with arrow function
const ListTodos = () => {
  //create reacthooks objects to store todos and alter
  const [todos, setTodos] = useState([]); // default val empty array

  // Delete func. behaves async, takes in id from params then runs logic
  // Note: Know that async functions return a promise, you could consume that promise's return value with .then()
  const deleteTodo = async (id) => {
    // try catch block
    try {
      // deleteTodo object will wait (pause code moving foward) for a promise to be returned by the fetch statement
      // Note: await can be put in front of any async promise-based function. Meaning that fetch is a async function
      // deleteTodo will recieve the response from fetch api
      const deleteTodo = await fetch(`http://localhost:5000/todos/${id}`, {
        method: "DELETE", // change fetch method to
      }); //template string
      // log the promise
      console.log(deleteTodo);

      // update the state of todos
      // using a filter method for the todos object
      // take in x and return x that have an id
      // logically, filter todos object's primary key todo_id that do not have an id
      setTodos(todos.filter((todo) => todo.todo_id !== id));
    } catch (err) {
      console.log(err.message);
    }
  };

  // List all todos
  const getTodos = async () => {
    try {
      // fetch data from API
      // by default fetch is a get reqeust, which is what we need
      const response = await fetch("http://localhost:5000/todos");
      // await promise to be returned then parse the data to json
      const jsonData = await response.json();

      // call setState function, setState only way to change state
      // update todos with the with the grabbed json data
      setTodos(jsonData);
    } catch (err) {
      console.log(err.message);
    }
  };

  // React Hooks method useEffect to update the component.
  // useEffect used for when dealing with side effects. Similar to ComponentDidMount, ComponnentDidUpdate
  // Scenarios: Data fetching, setting up a subscription, and manually changing the DOM in React components are all examples of side effects.
  // Think, runs after render. So when the DOM renders, it will run useEffect again to contionusly update the DOM / View

  useEffect(() => {
    getTodos();
  }, []);
  return (
    <Fragment>
      {" "}
      {/* table component */}
      <table className="table mt-5 text-center">
        {/* table head */}
        <thead>
          {/* table head contains rows */}
          <tr>
            {/* row heads names*/}
            <th>Description</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        {/* table body */}
        <tbody>
          {/* <tr>
               <td>John</td>
            <td>Doe</td>
            <td>john@example.com</td> 
            </tr>
            */}
          {/* Map todos so that for every key, there is a unique table row.*/}
          {todos.map((todo) => (
            <tr key={todo.todo_id}>
              {/* each row contains unique description */}
              <td>{todo.description}</td>
              {/* Todo column contains the EditTodo component, while passing prop along with it. */}
              <td>
                {/* passing todo as a prop during component call */}
                <EditTodo todo={todo} />
              </td>
              {/* data of last table column is a button component that is red
              onClick method will callback deleteTodo for the unique todo.  */}
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
