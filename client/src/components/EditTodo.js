import React, { Fragment, useState } from "react";

// Edit component, yellow buttons

// Functional component EditTodo, you destructure the todo prop incoming.
const EditTodo = ({ todo }) => {
  // Check data passed when component mounted
  console.log(todo);

  // state hooks for description, set to the incoming passed data
  const [description, setDescription] = useState(todo.description);

  //update description function
  const updateDescription = async (e) => {
    e.preventDefault();
    try {
      // capture the description changes
      const body = { description };
      // await for the return from fetch with a "PUT" method.
      const response = await fetch(
        `http://localhost:5000/todos/${todo.todo_id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );

      // log the response when edit clicked
      console.log(response);
      window.location = "/";
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Fragment>
      {/* <!-- Button to Open the Modal --> */}
      <button
        type="button"
        // btn-warning for yellow button, keep modal consistient with table view
        className="btn btn-warning"
        data-toggle="modal"
        // the data target will reference the id of data-toggle "modal"
        // use template string to dynamic reference id
        // point with #id
        data-target={`#id${todo.todo_id}`}
      >
        Edit
      </button>

      {/* <!-- The Modal --> */}
      {/* the way a modal works is that it references an id. so use a template string to the primary key inside our todo object. */}
      {/* then the button we click needs to also point(target) to the correct modal, so using the # to target and then another template string. */}

      <div
        className="modal"
        // set id of class=modal
        id={`id${todo.todo_id}`}
        // when click out of modal reset description to previous.
        onClick={() => setDescription(todo.description)}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            {/* <!-- Modal Header --> */}
            <div className="modal-header">
              <h4 className="modal-title">Edit Todo</h4>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                // when modal close button pressed, reset description field
                onClick={() => setDescription(todo.description)}
              >
                &times;
              </button>
            </div>

            {/* <!-- Modal body --> */}
            <div className="modal-body">
              <input
                type="text"
                className="form-control"
                // for the value changes in text box, set description based on the event taking place, target value.
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            {/* <!-- Modal footer --> */}

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-warning"
                data-dismiss="modal"
                // clicking the edit button will trigger update function.
                onClick={(e) => updateDescription(e)}
              >
                Edit
              </button>
              <button
                type="button"
                className="btn btn-danger"
                data-dismiss="modal"
                // pressing red close in modal will reset description when opened next
                onClick={() => setDescription(todo.description)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default EditTodo;
