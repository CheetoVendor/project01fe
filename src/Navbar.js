import { Link } from "react-router-dom";

const Navbar = () => {
    const signout = () => {
        localStorage.removeItem('token')
    }

    return (
        <div className="navbar">
            {/* change O-O to page name on click*/}
            <h2>Socialbook ::  O-O</h2>
            <div className="links">
                <Link to="./home">Home</Link>
                <Link to="./login">Login</Link>
                <Link to="./signup">Signup</Link>
                <Link to="./login" onClick={signout}>Signout</Link>
                <Link to="./profile" >Profile</Link>
            </div>
        </div >
    );
}

export default Navbar;