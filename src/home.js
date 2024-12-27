import { useState, useEffect } from "react";
import AxiosGetPosts from "./components/PostDisplay/AxiosGetPosts";
import PostForm from "./components/PostDisplay/PostForm";
import { useNavigate } from "react-router-dom";
const Home = () => {

    const [posts, setPosts] = useState([])

    const addPost = (newPost) => {
        setPosts((prevPosts) => [...prevPosts, newPost]);
    }

    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    // navigate back to login if token is empty
    useEffect(() => {
        if (token === null) {
            navigate('/login')
        }

    }, [token])

    return (
        <div className="centerColumn">
            <PostForm onPostAdded={addPost} />
            <AxiosGetPosts posts={posts} setPosts={setPosts} />
        </div>


    );
}

export default Home;