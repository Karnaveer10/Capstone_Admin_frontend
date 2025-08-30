import React from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";
import imgs from '../../assets/assets'
// sample comment
const Navbar = () => {

    // const navigate = useNavigate();

    return(
        
        <div className="Navbar">
            <img  src = {imgs.vit_icon} className="icon" onClick={() => navigate('/') } alt="VIT Logo"/>
            <h1>VIT Chennai Campus Capstone Project Registration and Evaluation Portal</h1>
        </div>    

    )
}

export default Navbar;
