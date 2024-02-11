import React from "react"
import "./styling/Navbar.css"

const Navbar = ({ goToOffset }) => {
	return (
		<nav className="navbar">
			<ul>
				<li> - - - </li>
				<li onClick={() => goToOffset(0)}>Welcome</li>
				<li onClick={() => goToOffset(1)}>to me,</li>
				<li onClick={() => goToOffset(2)}>my experiences,</li>
				<li onClick={() => goToOffset(4)}>education,</li>
				<li onClick={() => goToOffset(5)}>and contacts! </li>

				<li onClick={() => goToOffset(0)}>
					<a
						href="https://github.com/ArminRezz"
						target="_blank"
						rel="noopener noreferrer"
					>
						<img
							style={{
								marginBottom: "-5px",
								paddingTop: "3px",
								width: "25px",
								height: "25px",
							}}
							src={require("../images/githubLogo.png")}
							alt="not"
						/>
					</a>
				</li>

				<li onClick={() => goToOffset(0)}>
					<a
						href="https://www.linkedin.com/in/arminrezaiyan/"
						target="_blank"
						rel="noopener noreferrer"
					>
						<img
							style={{
								marginBottom: "-5px",
								paddingTop: "3px",
								width: "25px",
								height: "25px",
							}}
							src={require("../images/linkedInLogo.png")}
							alt="not"
						/>
					</a>
				</li>

				<li> - - - </li>
			</ul>
		</nav>
	)
}

export default Navbar
