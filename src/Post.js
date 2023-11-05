import React, { useState } from "react"; 
// Import React and useState from the React library
export default function Post({ post }) {
// Define a functional component named Post that takes a 'post' prop
function formatDate(dateString) { // Helper function to format a date string
if (dateString) {   // Check if the date string is provided
const date = new Date(dateString);  // Create a Date object from the date string
const formattedDate = date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
return formattedDate; // Format the date
}
return "Not Applicable";
}
function formatDateTime(dateTime) {
// Helper function to format a date and time string
if (dateTime) {
// Check if the date and time are provided
return dateTime.toLocaleString(); // Format with date, time
}
return "Not Applicable";
}
const [isComplete, setIsComplete] = useState(post.complete);
// State variable to manage completion status, initialized with the 'complete' property of the 'post' prop
const [completionDate, setCompletionDate] = useState(post.dateCompleted);
// State variable to manage completion date, initialized with the 'dateCompleted' property of the 'post' prop
function handleCompleteToggle() { // Function to handle the completion toggle
setIsComplete(!isComplete);  // Toggle the completion status
if (!completionDate) {  // If completion date is not set
// Get the current time in the Chicago time zone (Central Time Zone)
const chicagoTime = new Date().toLocaleString("en-US", {
timeZone: "America/Chicago",
});
// Set the completion date to Chicago time
setCompletionDate(new Date(chicagoTime));
} else {
setCompletionDate('');
}
}
return (
<div>
<h3>{post.title}</h3>
<div>{post.content}</div>
<br />
<i>Written by <b>{post.author}</b></i>
<div><i>Date Created: <b>{formatDateTime(new Date(post.dateCreated))}</b></i></div>
<div className="post">
<label>
<input
type="checkbox"
checked={isComplete}
onChange={handleCompleteToggle}
/> Complete
</label>
</div>
{isComplete && (
<div>
<i>Date Completed: <b>{formatDateTime(new Date(completionDate))}</b></i>
</div>
)}
</div>
);
}