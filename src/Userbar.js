import Login from './Login'
import Logout from './Logout'
import Register from './Register'
export default function UserBar({ user, dispatchUser }) {
// Define a functional component named UserBar that takes 'user' and 'dispatchUser' as props
if (user) { return <Logout user={user} dispatchUser={dispatchUser}/> }
// Render the Logout component with user and dispatchUser props if a user is logged in
else {
return (
<> <Login dispatchUser={dispatchUser} />
<Register dispatchUser={dispatchUser} />
</>
);
}
}
