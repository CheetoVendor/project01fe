import SearchComponent from "./components/Search/SearchComponent";
import { useState } from "react";
const Search = () => {
    const [posts, setPosts] = useState([]);
    const [users, setUsers] = useState([]);
    return (
        <div>
            <h2>Search</h2>
            <SearchComponent posts={posts} users={users} setPosts={setPosts} setUsers={setUsers} />
        </div>
    );
}

export default Search;