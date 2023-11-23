// Import necessary dependencies from React
import { useEffect, useReducer } from "react";
// Import components and contexts
import CreateToDo from "./CreateToDo";
import { StateContext } from "./contexts";
import ToDoList from "./ToDoList";
import UserBar from "./Userbar";
// Import the reducer function
import appReducer from "./reducers";
// Import the useResource hook for making API requests
import { useResource } from "react-request-hook";
// Import styles
import "./App.css";
// Define the main App component
function App() {
  // Initial data for posts
  const initialPosts = [
    { title: "Node JS", content: "Used for backend", author: "Vishal", dateCreated: new Date().toISOString() },
    { title: "React", content: "Used for frontend", author: "Vishal", dateCreated: new Date().toISOString() },
    { title: "Webapplications", content: "Frontend + Backend", author: "Vishal", dateCreated: new Date().toISOString() }
  ];
  // Use the useResource hook to fetch todos
  const [todoData, getTodos] = useResource(() => ({
    url: "/todolist",
    method: "get",
  }));
  // Fetch todos on component mount
  useEffect(getTodos, [getTodos]);
  // Use the useReducer hook to manage state with the appReducer function
  const [state, dispatch] = useReducer(appReducer, {
    user: "",
    todos: [], // Initialize with an empty array since todos will be fetched dynamically
  });
  // Use useEffect to update state with fetched todos
  useEffect(() => {
    // Check if todoData.data exists and is an array
    if (Array.isArray(todoData.data)) {
      // Dispatch action to set todos in the state
      dispatch({ type: "SET_TODOS", todos: todoData.data });
    }
  }, [todoData]);
  // Render the main component
  return (
    // Provide the state and dispatch functions to components using StateContext.Provider
    <StateContext.Provider value={{ state, dispatch }}>
<div className="app-container">
{/* Render the UserBar component */}
<UserBar className="user-bar" />
 {/* Render the CreateToDo component */}
<CreateToDo className="create-post" />
{/* Render the ToDoList component */}
<ToDoList />
</div>
</StateContext.Provider>
  );
}
// Export the App component as the default export
export default App;