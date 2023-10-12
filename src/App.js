import { useState } from "react";
import CreatePost from "./CreatePost";
import UserBar from "./Userbar";
import PostList from "./PostList";
import "./App.css";

function App(){

const [user, setUser] = useState("");
const initialPosts= [
  {title: "Node JS", description: "Used for backend", author:"Vishal"},
  {title: "React", description: "Used for frontend", author:"Vishal"}
]
const [posts, setPosts] = useState(initialPosts);
const handleAddPost = (newPost) => {
  setPosts([newPost,...posts]);
};
return (
  <div>
  <UserBar user={user} setUser={setUser} />
  <CreatePost user={user} handleAddPost={handleAddPost}/>
  <PostList posts={posts} />
  </div>
  )

  }
  export default App;
