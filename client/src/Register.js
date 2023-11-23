import React, { useEffect, useState } from "react";
import { useResource } from "react-request-hook";
// Register component definition
export default function Register({ dispatch }) {
  // Initial form data state
  const initialFormData = {
email: "",
password: "",
passwordRepeat: "",
};
  // State to manage form data
const [formData, setFormData] = useState(initialFormData);
// Resource hook for making a registration request
const [register, registerRequest] = useResource(({ email, password }) => ({
url: "/register",            // API endpoint for registration
method: "post",
data: { email, password },   // Request data (email and password)
}));
  // State to track registration success
const [registrationSuccess, setRegistrationSuccess] = useState(false);
// Effect to handle successful registration and update component state
useEffect(() => {
if (register && register.data) {
dispatch({ type: "REGISTER", email: register.data.email });
setRegistrationSuccess(true);
 }
}, [register, dispatch]);
  // Effect to clear form data and reset registration success after a delay
useEffect(() => {
if (registrationSuccess) {
const timer = setTimeout(() => {
setRegistrationSuccess(false);
setFormData(initialFormData); // Clear form values
}, 3000);
return () => clearTimeout(timer);
}
}, [registrationSuccess, setFormData]);
  // Event handler for form input changes
function handleChange(evt) {
const { name, value } = evt.target;
setFormData((prevData) => ({
...prevData,
[name]: value,
 }));
 }
  // Event handler for registration form submission
function handleRegister() {
const { email, password } = formData;
registerRequest({ email, password });
  }
  // JSX for the registration form and success message
return (
<div>
<form onSubmit={(e) => { e.preventDefault(); handleRegister(); }}
>
{/* Email input field */}
<label htmlFor="register-email">Email:</label>
<input type="text" name="email" id="register-email" value={formData.email} onChange={handleChange} />
{/* Password input field */}
<label htmlFor="register-password">Password:</label>
<input type="password" name="password" id="register-password" value={formData.password} onChange={handleChange}/>
{/* Repeat password input field */}
<label htmlFor="register-password-repeat">Repeat password:</label>
<input type="password" name="passwordRepeat" id="register-password-repeat" value={formData.passwordRepeat} onChange={handleChange}/>
{/* Submit button */}
<input type="submit" value="Register" disabled={
formData.email.length === 0 ||
formData.password.length === 0 ||
formData.password !== formData.passwordRepeat
}
/>
</form>
{/* Display success message */}
{registrationSuccess && (
<div>
User created ! Redirecting ...
</div>
)}
</div>
  );
}
    