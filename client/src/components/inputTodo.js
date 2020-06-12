import React, { Fragment, useState } from "react";

// Functional component arrow function
const InputTodo = () => {
  // React hooks, denoted by importing useState
  // description variable changed by setDescription
  const [description, setDescription] = useState("");

  // async function onForm submission
  // see that in return statement <Framement> contains <form>
  // function takes in an event passed into it
  // run a trycatch block
  // then, package the description
  // capture response from await fetch which will wait for when fetch is done and returns a promise
  // change fetch method to POST as we are sending data
  // headers working with is a "Content-Type" for json application
  // body coming in, stringify it back out to body

  // update the browser with window.location by setting it to "/" current directory
  // log response to check for a 200
  const onSubmitForm = async (event) => {
    event.preventDefault();
    try {
      const body = { description };
      const response = await fetch("http://localhost:5000/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }); // fetch does a get request by default
      window.location = "/";
      console.log(response);
    } catch (err) {
      console.error(err.message);
    }
  };

  // returns Fragment containing a header
  // className for interface formatting
  return (
    <Fragment>
      <h1 className="text-cener mt-5">Pern Todo List</h1>
      {/* for a form component, method onSubmit takes in a callback function in this case custom function above "onSubmitForm*/}
      <form className="d-flex mt-5" onSubmit={onSubmitForm}>
        {/* the form will contain an input box and then a button */}

        {/* input box will take in text type and the value will be description. Description will start with no value as input box will be empty. */}
        {/* onChange where user enters text will take the event that took place, then use an anonymous arrow function to set the description of the reactHooks object created during the instanciation of the component. */}
        <input
          type="text"
          className="form-control"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
        {/* btn class with subtype success for the green color. text will be Add */}
        <button className="btn btn-success">Add</button>
      </form>
    </Fragment>
  );
};

// export component
export default InputTodo;
