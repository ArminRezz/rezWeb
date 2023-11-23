import React from "react"
import "./styling/Home.css"
import gitLogo from "../images/githubLogo.png"
import linkedInLogo from "../images/linkedInLogo.png"
import Carousel from "../components/HomeComponents/Carousel"
import Particle from "../components/HomeComponents/Particles"

const Home = () => {
	return (
		<div className="Homepage">
			<div className="Banner">
				<div className="name">
					<h1>Armin</h1> <p>Rezaiyan-Nojani,</p>
				</div>
				<div className="abstract">
					<p>
						Passionate software engineer and machine learning
						enthusiast with diverse experience at NASA and NIST.
						Proficient in Java, C++, Python, HTML, CSS, and a bit of
						React. Actively pursuing machine learning, I bring
						creativity and dedication to each project, eager to
						contribute in forward-thinking environments.
					</p>
				</div>
				<div className="socials">
					<a
						href="https://github.com/ArminRezz"
						target="_blank"
						rel="noopener noreferrer"
						className="social-button"
					>
						<i className="fab fa-github">
							<img src={gitLogo} width={"80px"} />
						</i>
					</a>
					<a
						href="https://www.linkedin.com/in/arminrezaiyan/"
						target="_blank"
						rel="noopener noreferrer"
						className="social-button"
					>
						<i className="fab fa-linkedin">
							<img src={linkedInLogo} width={"80px"} />
						</i>
					</a>
				</div>
			</div>
			<Particle /> 
			<div className="Carousel">
				<Carousel />
			</div>
		</div>
	)
}

export default Home
