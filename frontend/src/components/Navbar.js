import React from "react"
import { Link } from "react-router-dom"
import "../pages/styling/Navbar.css"

const Navbar = () => {
	return (
		<header>
			<div className="container">
				<Link to="/" className="nav-link-1">
					<p> &lt;/&gt; ArminRezz </p>
				</Link>
				<Link to="/workouts" className="nav-link">
					<p>Projects</p>
				</Link>
				<Link to="/art" className="nav-link">
					<p>Experiences</p>
				</Link>
				<Link to="/contact" className="nav-link">
					<p>Resume</p>
				</Link>
			</div>
		</header>
	)
}

export default Navbar
