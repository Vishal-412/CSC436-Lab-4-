import ToDo from "./ToDo";
import { useStateContext } from "./contexts";
// ToDoList component definition
export default function ToDoList() {
// Get the current state and dispatch function from the context
const { state, dispatch } = useStateContext();
const { todos } = state;
  // Event handler for toggling the completion status of a todo
const handleToggleComplete = (id) => {
dispatch({
type: "TOGGLE_TODO",   // Action type for toggling todo completion status
id,                    // ID of the todo to be toggled
});
};
  // Event handler for deleting a todo
const handleDeleteTodo = (id) => {
dispatch({
type: "DELETE_TODO",    // Action type for deleting a todo
id,                     // ID of the todo to be deleted
});
  };
  // JSX for rendering the list of todos
return (
<div>
{/* Map through the todos and render a ToDo component for each */}
{todos.map((todo) => (
<ToDo
key={todo.id}                               // Unique key for each ToDo component
handleToggleComplete={() => handleToggleComplete(todo.id)}  // Pass handler with todo ID
handleDeleteTodo={() => handleDeleteTodo(todo.id)}          // Pass handler with todo ID
{...todo}  // Spread all todo properties as props to ToDo component
/>
))}
</div>
);
}
