// Import necessary modules and hooks from React and other libraries
import React, { useContext, useState } from "react";
import { StateContext } from "./contexts";
import { useResource } from "react-request-hook";
// Define a functional component named CreateToDo
const CreateToDo = () => {
  // Destructure state and dispatch from the StateContext
const { state, dispatch } = useContext(StateContext);
const { user } = state;
// Define a resource hook for creating a to-do item
const [, createToDo] = useResource(({ title, description, author, dateCreated, completed, dateCompleted }) => ({
url: '/todolist',
method: 'post',
data: { title, description, author, dateCreated, completed, dateCompleted }
  }));
  // Initialize state variables using the useState hook
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [author, setAuthor] = useState(user); // Initialize author with the current user
  const [successMessage, setSuccessMessage] = useState(null);
  // Event handler functions for updating state on user input
function handleTitle(evt) { setTitle(evt.target.value); }
function handleDescription(evt) { setDescription(evt.target.value); }
function handleAuthor(evt) { setAuthor(evt.target.value); }
// Event handler for creating a new to-do item
function handleCreate() {
const date = new Date();
const formattedDate = date.toISOString();
const newTodo = {
title,
description,
author, // Use the author state here
dateCreated: formattedDate,
completed: false,
dateCompleted: ''
};
// Use the createToDo resource hook to make the API request
createToDo(newTodo, ({ data, error }) => {
if (error) {
console.error('Error adding todo:', error);
} else {
  // Display a success message and clear it after 3 seconds
setSuccessMessage('Todo Added Successfully');
setTimeout(() => setSuccessMessage(null), 3000);
}
});
// Dispatch an action to update the local state with the new to-do
dispatch({ type: 'CREATE_TODO', title, description, author });
}
// Render the form component
return (
<form onSubmit={(e) => { e.preventDefault(); handleCreate(); }}
>
{successMessage && <div style={{ color: 'green' }}>{successMessage}</div>}
<div>
Author: <b>{user}</b>
</div>
<div>
{/* Add an input for the author */}
<label htmlFor="create-author">Author:</label>
<input type="text" value={author} onChange={handleAuthor} name="create-author" id="create-author" required/>
</div>
<div>
<label htmlFor="create-title">Title:</label>
<input type="text" value={title} onChange={handleTitle} name="create-title" id="create-title" required/>
</div>
<div>
<label htmlFor="create-description">Description:</label>
<textarea
value={description}
onChange={handleDescription}
name="create-description"
id="create-description"
/>
</div>
<input type="submit" value="Create" />
</form>
);
};
export default CreateToDo;