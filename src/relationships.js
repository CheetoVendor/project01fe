import Follow from "./components/Follows/Follow";
import FriendDisplay from "./components/Friends/FriendDisplay";
import FriendRequests from "./components/Friends/FriendRequests";

const Relationships = () => {
    const userId = localStorage.getItem("userId");
    return (
        <div>
            <FriendDisplay userId={userId} />
            <FriendRequests />
            <Follow />
        </div>
    );
}

export default Relationships;