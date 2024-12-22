import { useState } from "react";
import AxiosGetPosts from "./components/PostDisplay/AxiosGetPosts";
import PostForm from "./components/PostDisplay/PostForm";
import UserLinks from "./components/PostDisplay/UserLinks";
const Home = () => {

    const [posts, setPosts] = useState([])

    const addPost = (newPost) => {
        setPosts((prevPosts) => [...prevPosts, newPost]);
    }

    return (
        <div className="centerColumn">
            <PostForm onPostAdded={addPost} />
            <AxiosGetPosts posts={posts} setPosts={setPosts} />
        </div>


    );
}

export default Home;