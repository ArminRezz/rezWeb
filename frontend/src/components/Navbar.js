import React from "react"
import "./styling/Navbar.css";

const Navbar = ({ goToOffset }) => {
	return (
		<nav className="navbar">
			<ul>
                <li> - - - </li>
				<li onClick={() => goToOffset(0)}>Home</li>
				<li onClick={() => goToOffset(1)}>Experiences</li>
				<li onClick={() => goToOffset(2)}>Projects</li>
				<li onClick={() => goToOffset(3)}>Contact Me</li>
                <li> - - - </li>
			</ul>
		</nav>
	)
}

export default Navbar
