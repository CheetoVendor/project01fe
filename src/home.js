import AxiosGetPosts from "./components/PostDisplay/AxiosGetPosts";
import PostForm from "./components/PostDisplay/PostForm";
import UserLinks from "./components/PostDisplay/UserLinks";
const Home = () => {
    return (
        <div className="homeContainer">
            <div className="leftColumn">
                <UserLinks />
            </div>
            <div className="centerColumn">
                <PostForm />
                <AxiosGetPosts />
            </div>
            <div className="rightColumn">
                <h2>right col</h2>
            </div>
        </div>

    );
}

export default Home;