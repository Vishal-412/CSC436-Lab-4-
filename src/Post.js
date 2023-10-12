import { useState } from "react";
export default function Post({ title, description, author, dateCreated, complete, dateCompleted }) {
function formatDateTime(dateTime) {
  if (dateTime) {
  return new Date(dateTime).toLocaleString();
}
return "Not Applicable";
}
const [isComplete, setIsComplete] = useState(complete);
const [completionDate, setCompletionDate] = useState(dateCompleted);
function handleCompleteToggle() {
setIsComplete(!isComplete);        
if (!completionDate && isComplete) {
 // Get the current time in the Chicago time zone (Central Time Zone)
  const chicagoTime = new Date().toLocaleString("en-US", {
 timeZone: "America/Chicago",
 });
 // Set the completion date to Chicago time
 setCompletionDate(chicagoTime);
 } else if (!isComplete) {
 setCompletionDate('');
 }
}
return (
<div>
<h3>{title}</h3>
<div>{description}</div>
<br />
<i>Written by <b>{author}</b></i>
<div><i>Date Created: <b>{formatDateTime(Date(dateCreated))}</b></i></div>
<div>
<label>
<input type="checkbox" checked={isComplete} onChange={handleCompleteToggle} /> Complete
</label>
</div>
{isComplete && (
<div>
<i>Date Completed: <b>{formatDateTime(Date(completionDate))}</b></i>
</div>
)}
</div>
);
}

    