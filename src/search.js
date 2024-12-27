import { useNavigate } from "react-router-dom";
import SearchComponent from "./components/Search/SearchComponent";
import { useEffect, useState } from "react";
const Search = () => {
    const [posts, setPosts] = useState([]);
    const [users, setUsers] = useState([]);
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    // navigate back to login if token is empty
    useEffect(() => {
        if (token === null) {
            navigate('/login')
        }

    }, [token])

    return (
        <div>
            <h2>Search</h2>
            <SearchComponent posts={posts} users={users} setPosts={setPosts} setUsers={setUsers} />
        </div>
    );
}

export default Search;