// Importing necessary hooks from React
import { useEffect, useState } from "react";
import { useResource } from "react-request-hook";
// Login component definition
export default function Login({ dispatch }) {
  // State variables to manage form inputs and state
  const [username, setUsername] = useState("");
  const [loginFailed, setLoginFailed] = useState(false);
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  // Creating a resource hook for making a login request
  const [user, login] = useResource((username, password) => ({
  url: "/login",                  // API endpoint for login
  method: "post",                 // HTTP POST method for login
  data: { email: username, password },  // Request data (username and password)
  }));
  // Effect hook to handle API response and update component state
  useEffect(() => {
  // Check if form has been submitted and API response is received
  if (formSubmitted && user !== undefined) {
console.log("API Response:", user); // Log the API response
// Check if the response status is 400 (Bad Request)
if (user.status === 400) {
setLoginFailed(true);
setErrorMessage(user.data || "An error occurred.");
} else if (user.data?.user) {
// Successful login, update state and dispatch action
setLoginFailed(false);
dispatch({ type: "LOGIN", username: user.data.user.email });
} else {
// Handle unexpected response structure
setLoginFailed(true);
setErrorMessage(
user.data || "An unexpected error occurred."
);
}
}
}, [formSubmitted, user, dispatch]);
 // Event handler for updating username state
function handleUsername(evt) {
setUsername(evt.target.value);
}
  // Event handler for updating password state
  function handlePassword(evt) {
  setPassword(evt.target.value);
  }
  // Event handler for form submission
  function handleSubmit(e) {
  e.preventDefault();
  setFormSubmitted(true);
  login(username, password); // Trigger the login request
  }
  // JSX for the login form
return (
<form onSubmit={handleSubmit}>
{/* Username input field */}
<label htmlFor="login-username">Username:</label>
<input type="text" name="login-username" id="login-username" value={username} onChange={handleUsername}/>
{/* Password input field */}
<label htmlFor="login-password">Password:</label>
<input type="password" value={password} onChange={handlePassword}
name="login-username"  // Note: This should be "login-password" for consistency
id="login-username"    // Note: This should be "login-password" for consistency
/>
{/* Display error message if login fails */}
{formSubmitted && loginFailed && (
<p style={{ color: "red" }}>{errorMessage}</p>
)}
{/* Submit button */}
<input type="submit" value="Login" disabled={username.length === 0} />
</form>
  );
}