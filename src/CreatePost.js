import React, { useState } from "react"; // Import React and useState from the React library
export default function CreatePost({ user, handleAddPost, dispatchPost }) {
 // Define a functional component named CreatePost that takes user, handleAddPost, and dispatchPost as props
const [title, setTitle] = useState(""); // State for the post title
const [content, setContent] = useState(""); // State for the post content
const [author, setAuthor] = useState(""); // State for the post author
 // Event handler functions to update state when input fields change
function handleTitleChange(event) {
setTitle(event.target.value);
}
function handleContentChange(event) {
setContent(event.target.value); // Update the content state when the content input changes
}
function handleAuthorChange(event) {
setAuthor(event.target.value); // Update the author state when the author input changes
}
// Event handler for form submission
function handleSubmit(event) {
event.preventDefault();  // Prevent the default form submission behavior
const newPost = {
title,
content,
author,
dateCreated: new Date().toISOString(), // Generate the current timestamp
};
 // Dispatch an action to create a new post with the post object
dispatchPost({ type: "CREATE_POST", post: newPost });
// Clear the form input fields after submission
setTitle("");
setContent("");
setAuthor("");
}
return (
<div className="create-post">
<h3>Create New Post</h3>
<form onSubmit={handleSubmit}>
<div >
<label htmlFor="title">Title:</label>
<input type="text" id="title" value={title} onChange={handleTitleChange} />
</div>
<div>
<label htmlFor="content">Content:</label>
<textarea id="content" value={content} onChange={handleContentChange} />
</div>     
<div>
<button type="submit">Create Post</button>
</div>
</form>
</div>
);
}