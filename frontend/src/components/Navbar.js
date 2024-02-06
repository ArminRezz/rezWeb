import React from "react"
import "./styling/Navbar.css";

const Navbar = ({ goToOffset }) => {
	return (
		<nav className="navbar">
			<ul>
                <li> - - - </li>
				<li onClick={() => goToOffset(0)}>Welcome</li>
				<li onClick={() => goToOffset(1)}>to my</li>
				<li onClick={() => goToOffset(2)}>Experiences</li>
				<li onClick={() => goToOffset(3)}>Education</li>
				<li onClick={() => goToOffset(4)}>& Contacts</li>
                <li> - </li>
				<li onClick={() => goToOffset(3)}>Git</li>
				<li onClick={() => goToOffset(3)}>lnkdn</li>
			</ul>
		</nav>
	)
}

export default Navbar
