import React, { Fragment, useState } from "react";

// recall you need to destrucuture props
const EditTodo = ({ todo }) => {
  //   console.log(todo); // check data pass

  const [description, setDescription] = useState(todo.description);

  //update description function
  const updateDescription = async (e) => {
    e.preventDefault();
    try {
      const body = { description };
      const response = await fetch(
        `http://localhost:5000/todos/${todo.todo_id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );
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
        className="btn btn-warning"
        data-toggle="modal"
        // data target must use # to target a specific id for data and not just a generic modal.
        data-target={`#id${todo.todo_id}`}
      >
        Edit
      </button>

      {/* <!-- The Modal --> */}
      {/* the way a modal works is that it references an id. so use a template string to the primary key inside our todo object. */}
      {/* then the button we click needs to also point(target) to the correct modal, so using the # to target and then another template string. */}

      <div
        className="modal"
        id={`id${todo.todo_id}`}
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
                onClick={(e) => updateDescription(e)}
              >
                Edit
              </button>
              <button
                type="button"
                className="btn btn-danger"
                data-dismiss="modal"
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
