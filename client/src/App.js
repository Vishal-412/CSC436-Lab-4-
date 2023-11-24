import React, { useEffect, useReducer } from "react";
import CreateToDo from "./CreateToDo";
import { StateContext } from "./contexts";
import ToDoList from "./ToDoList";
import UserBar from "./Userbar";
import { useResource } from "react-request-hook";
import appReducer from "./reducers";
import "./App.css";

function App() {
  // Initial data for posts
  const initialPosts = [
    { title: "Node JS", content: "Used for backend", author: "Vishal", dateCreated: new Date().toISOString() },
    { title: "React", content: "Used for frontend", author: "Vishal", dateCreated: new Date().toISOString() },
    { title: "Webapplications", content: "Frontend + Backend", author: "Vishal", dateCreated: new Date().toISOString() }
  ];

  // Hook to get todo data from the server
  const [todoData, getTodos] = useResource(() => ({
    url: "/todolist",
    method: "get",
  }));

  // Fetch todos when component mounts or when todos change
  useEffect(getTodos, [getTodos]);

  // State and reducer for managing application state
  const [state, dispatch] = useReducer(appReducer, {
    user: "",
    todos: [],
  });

  // Update state with todos from the server
  useEffect(() => {
    if (Array.isArray(todoData.data)) {
      dispatch({ type: "SET_TODOS", todos: todoData.data });
    }
  }, [todoData]);

  // Hook to get posts data from the server
  const [postsResponse, getPosts] = useResource(() => ({
    url: "/post",
    method: "get",
    headers: { Authorization: `${state?.user?.access_token}` },
  }));

  // Fetch posts when user access token changes
  useEffect(() => {
    getPosts();
  }, [state?.user?.access_token]);

  // Update state with fetched posts
  useEffect(() => {
    if (
      postsResponse &&
      postsResponse.isLoading === false &&
      postsResponse.data
    ) {
      dispatch({
        type: "FETCH_POSTS",
        posts: postsResponse.data.reverse(),
      });
    }
  }, [postsResponse]);

  // Update document title based on user information
  useEffect(() => {
    if (state.user) {
      document.title = `${state.user.username}'s Blog`;
    } else {
      document.title = "Blog";
    }
  }, [state.user]);

  // Render the application
  return (
    <StateContext.Provider value={{ state, dispatch }}>
      <div className="app-container">
        <UserBar className="user-bar" />
        <CreateToDo className="create-post" />
        <ToDoList />
      </div>
    </StateContext.Provider>
  );
}

export default App;