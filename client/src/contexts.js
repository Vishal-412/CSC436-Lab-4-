// Import createContext and useContext hooks from React
import { createContext, useContext } from "react";

// Create a context to hold the global state of the application
export const StateContext = createContext();

// Create a custom hook to simplify accessing the state and dispatch functions
export const useStateContext = () => {
  // Use the useContext hook to access the current context value (state and dispatch)
  return useContext(StateContext);
};