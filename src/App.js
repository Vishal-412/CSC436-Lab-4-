import React, { useState, useReducer } from "react";
import CreatePost from "./CreatePost"; // Import the CreatePost component
import UserBar from "./Userbar"; // Import the UserBar component
import PostList from "./PostList"; // Import the PostList component
import "./App.css";
function App() { // Define initial posts data
const initialPosts = [
{title: "Node JS", content: "Used for backend", author: "Vishal",dateCreated: new Date().toISOString(),},
{title: "React", content: "Used for frontend", author: "Vishal", dateCreated: new Date().toISOString(),},
{title: "Webapplications",content: "Frontend + Backend",author: "Vishal", dateCreated: new Date().toISOString(),}
];
// State to control the visibility of the create post form
const [createPostVisible, setCreatePostVisible] = useState(false);
function userReducer(state, action) {  // User Reducer: Manages user-related actions
switch (action.type) {
case "LOGIN":
setCreatePostVisible(true); // Show create post form when user logs in
return action.username;
case "REGISTER":
setCreatePostVisible(true); // Show create post form when user registers
return action.username;
case "LOGOUT":
setCreatePostVisible(false); // Hide create post form when user logs out
return null;
default:
return state;
}
}
// State and set for managing user data
const [user, dispatchUserUser] = useReducer(userReducer, "");
// Reducer function for managing post-related actions
function postReducer(state, action) {
switch (action.type) {
case "CREATE_POST":
const newPost = { title: action.post.title, content: action.post.content, author: user,complete: false,
dateCreated: new Date().toISOString(),
dateCompleted: null,
};
return [newPost, ...state];
case "TOGGLE_POST":
const updatedPosts = state.map((post) => {
if (post.title === action.title) {
post.complete = !post.complete;
post.dateCompleted = post.complete ? new Date().toISOString() : null;
}
return post; });
return updatedPosts;
case "DELETE_POST":
return state.filter((post) => post.title !== action.title);
default:
return state;
}}
// State and set for managing post data
const [posts, dispatchPost] = useReducer(postReducer, initialPosts);
const handleAddPost = (newPost) => {
console.log(newPost);  // Function to handle adding a new post
dispatchPost({ type: "CREATE_POST", ...newPost });
};
// Function to handle deleting a post
const handleDeletePost = (title) => {
dispatchPost({ type: "DELETE_POST", title });
};
return (
<div className="app-container">
<UserBar user={user} dispatchUser={dispatchUserUser} />
{user && (
<CreatePost user={user} handleAddPost={handleAddPost} dispatchPost={dispatchPost} />
)}
<PostList posts={posts} handleDeletePost={handleDeletePost} /> //renders the postlist component
</div>
);
}
export default App;




