import { v4 as uuidv4 } from "uuid";
// User Reducer
function userReducer(state, action) {
switch (action.type) {
// Handle login and register actions
case "LOGIN":
case "REGISTER":
return action.username; // Set the username in the state
case "LOGOUT":
return ""; // Clear the username when logging out
default:
return state;
}
}
// Todo Reducer
function todoReducer(state, action) {
switch (action.type) {
// Create a new todo
case "CREATE_TODO":
const newTodo = {
id: uuidv4(),                 // Generate a unique ID for the todo
title: action.title,
description: action.description,
author: action.author,
dateCreated: Date.now(),       // Set the current date/time for creation
complete: false,               // Initialize as incomplete
dateCompleted: null,           // No completion date initially
};
return [...state, newTodo];      // Add the new todo to the state array
// Toggle the completion status of a todo
case "TOGGLE_TODO":
return state.map((todo) =>
todo.id === action.id
? {
...todo,
complete: !todo.complete,                // Toggle completion status
dateCompleted: todo.complete ? null : Date.now(),  // Set/clear completion date
}
: todo
);
// Set the todos in the state
case "SET_TODOS":
return action.todos;
// Delete a todo
case "DELETE_TODO":
return state.filter((todo) => todo.id !== action.id); // Remove todo with the specified ID
default:
return state;
  }
}
// Combined App Reducer
export default function appReducer(state, action) {
return {
user: userReducer(state.user, action),     // Call userReducer to update user-related state
todos: todoReducer(state.todos, action),   // Call todoReducer to update todos-related state
};
}