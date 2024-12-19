import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <div className="navbar">
            {/* change O-O to page name on click*/}
            <h2>Socialbook ::  O-O</h2>
            <div className="links">
                <Link to="./home">Home</Link>
                <Link to="./login">Login</Link>
            </div>
        </div>
    );
}

export default Navbar;