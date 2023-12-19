import React from "react";
import { Link } from "react-router-dom";
import './Navbar.css';

const Navbar = () => {
    return(
        
        <nav>
            <Link to="/bitcoin">Cotação Bitcoin</Link>
            <Link to="/convert">Converter Moeda</Link> 
        </nav>
        
    )
}

export default Navbar;