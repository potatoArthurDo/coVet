import "../styles/NavbarStyle.css"
import "../styles/index.css"
import logo from "../assets/logo/covet-logo.png" 
import { Link } from "react-router-dom"
import Pets from "../pages/Pets"


function Navbar() {
    return (
        <div className="navbar">
            <Link to="/"><img className="logo" src={logo} /> </Link>
            <ul className="nav-element">
                {/* <li><a href="#">Services <i className="fas fa-caret-down"></i></a>
                    <div className="dropdown-menu">
                        <ul>
                            <li><Link to="/demo"> Demo</Link></li>
                            <li><Link to="/pets">Link2</Link></li>
                            <li><a href="#">Link1</a></li>
                            <li><a href="#">Link1</a></li>
                        </ul>
                    </div>
                </li> */}
                <li><Link to="/appointment" className="nav-tab">Appointment</Link></li>
                <li><Link to="/pets"  className="nav-tab">Pets</Link></li>
                {/* <li><Link to="/shop">Shop</Link></li> */}
                <li><Link to="/instruction"  className="nav-tab">Instruction</Link></li>
                {/* <li><Link to="/" ><i className="fa-solid fa-cart-shopping fa-lg" ></i></Link></li>
                <li><Link to="/"><i className="fa-solid fa-user fa-lg" ></i></Link></li> */}
                <li><Link to="/logout"  className="nav-tab">LogOut</Link></li>
                <li><Link to="/profile"  className="nav-tab">Profile</Link></li>

            </ul>
            <div className="nav-menu"><i className="fa-solid fa-bars"></i></div>
        </div>
    )
}

export default Navbar