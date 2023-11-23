import React from "react";
import { useResource } from "react-request-hook";
// ToDo component definition
export default function ToDo({
  id,
  title,
  description,
  author,
  dateCreated,
  complete,
  dateCompleted,
  handleToggleComplete,
  handleDeleteTodo,
}) {
  // Resource hook for deleting a todo
  const [, deleteTodo] = useResource(({ id }) => ({
  url: `/todolist/${id}`,
  method: "delete",
  }));
  // Resource hook for toggling the completion status of a todo
  const [, toggleTodo] = useResource(({ id, dateCompleted }) => ({
    url: `/todolist/${id}`,
    method: "patch",
    data: { dateCompleted },
  }));
  // Event handler for toggling the completion status locally
  const handleToggleCompleteLocal = () => {
  const currentDate = new Date().toISOString();
  toggleTodo({ id, dateCompleted: currentDate });
handleToggleComplete();
  };
  // Event handler for deleting a todo locally
  const handleDeleteTodoLocal = () => {
    deleteTodo({ id });
    handleDeleteTodo();
  };
  // JSX for displaying the todo information
return (
<div>
<h3>{title}</h3>
<div>{description}</div>
<div>Author: {author}</div>
<div>Date Created: {new Date(dateCreated).toLocaleString()}</div>
<div>
Complete:{" "}
<input
type="checkbox"
checked={complete}
onChange={handleToggleCompleteLocal}
/>
</div>
{complete && (
<div>Date Completed: {new Date(dateCompleted).toLocaleString()}</div>
)}
<button onClick={handleDeleteTodoLocal}>Delete</button>
<br />
</div>
  );
}