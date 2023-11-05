import { useState, useReducer } from "react";
export default function Login({ dispatchUser }) {
const [username, setUsername] = useState("");
function handleUsername(evt) {
setUsername(evt.target.value);
}
function userReducer(state, action) {
switch (action.type) {
case "LOGIN":
return action.username;
default:
return state;
}
}
const handleSubmit = (e) => {
e.preventDefault();
// set the LOGIN action to update the global user state
dispatchUser({ type: "LOGIN", username: username });
};
return (
<form onSubmit={handleSubmit}>
<label htmlFor="login-username">Username:</label>
<input type="text" name="login-username" id="login-username" value={username} onChange={handleUsername}/>
<label htmlFor="login-password">Password:</label>
<input type="password" name="login-password" id="login-password" />
<input type="submit" value="Login" disabled={username.length === 0}/>
</form>
);
}

    
    