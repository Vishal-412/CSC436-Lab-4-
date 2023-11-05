import{ v4 as uuid4 } from "uuid";
import React from "react";
import Post from './Post';
export default function PostList({ posts = [], handleDeletePost }) {
return (
<div>
{posts.map((p, i) => ( <div key={uuid4()}>
<Post post={p} />
<button onClick={() => handleDeletePost(p.title)}>Delete</button>
</div>
))}
 </div>
);}
