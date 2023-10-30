import React from "react"
import { Link } from "react-router-dom"
import "../pages/styling/Navbar.css"

const Navbar = () => {
	return (
		<header>
			<div className="container">
				<Link to="/" className="nav-link">
					<h3>Home</h3>
				</Link>
				<Link to="/workouts" className="nav-link">
					<h3>Workouts</h3>
				</Link>
				<Link to="/art" className="nav-link">
					<h3>Art</h3>
				</Link>
				<Link to="/code" className="nav-link">
					<h3>Code</h3>
				</Link>
			</div>
		</header>
	)
}

export default Navbar
