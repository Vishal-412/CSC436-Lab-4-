import { useState } from "react"
export default function CreatePost ({user,handleAddPost}) {
const [ title, setTitle ] = useState('')
const [ description, setDescription ] = useState('')
const [dateCreated, setDateCreated] = useState(new Date().toISOString().slice(0, 10));
const [ dateCompleted, setDateCompleted] = useState('')
const [complete, setComplete] = useState(false);

function handleTitle (evt) { setTitle(evt.target.value) }
function handleDescription (evt) { setDescription(evt.target.value) }
function handleComplete() {
setComplete(!complete);
if (!complete) {
  const currentDate = new Date().toLocaleString('en-US', { timeZone: 'America/Chicago' });
setDateCompleted(currentDate);
} else {
setDateCompleted('');
}}
function handleCreate () {
const newPost = { title, description, author: user, dateCreated, dateCompleted, complete}
handleAddPost(newPost);
}
return (
<form onSubmit={(e) => {e.preventDefault(); handleCreate();}}>
<div>Author: <b>{user}</b></div>
<div>
<label htmlFor="create-title">Title:</label>
<
input type="text" 
value={title} 
onChange={handleTitle} 
name="create-title" 
id="create-title" 
/>
</div>
<div><label htmlFor="create-description">Description:</label>
<textarea value={description} onChange={handleDescription} />
<
input type="submit" 
value="Create" 
/>
</div>
<div>
<label htmlFor="create-dateCreated">Date Created on:</label>
<
input type="date" 
 value={dateCreated} 
name="create-dateCreated" 
id="create-dateCreated" 
/>
</div>
</form>
)
}
    