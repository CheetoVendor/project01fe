import AxiosGetPosts from "./components/PostDisplay/AxiosGetPosts";
import PostDisplay from "./components/PostDisplay/PostDisplay";
import PostForm from "./components/PostDisplay/PostForm";
const Home = () => {
    return (
        <div>
            <PostForm />
            <AxiosGetPosts />
        </div>

    );
}

export default Home;