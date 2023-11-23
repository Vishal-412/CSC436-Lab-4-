// Import necessary components and the useStateContext hook from the "contexts" module
import Login from "./Login";
import Logout from "./Logout";
import Register from "./Register";
import { useStateContext } from "./contexts";
// Define and export the UserBar functional component
export default function UserBar() {
// Destructure state and dispatch from the global context using the useStateContext hook
const { state, dispatch } = useStateContext();
const { user } = state;
if (user) { // Check if a user is logged in
  // If a user is logged in, render the Logout component
return <Logout user={user} dispatch={dispatch} />;
 } else {
return (
<>
<Login dispatch={dispatch} />
<Register dispatch={dispatch} />
</>
);
}
}