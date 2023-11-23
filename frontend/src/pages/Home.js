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
					<p className="typing-text">
						Enthusiastic software architect and machine learning
						aficionado, I've traversed the realms of NASA and NIST,
						mastering the languages of Java, C++, Python, HTML, and
						CSS, with a sprinkle of React for added flair. Embarking
						on a relentless pursuit of machine learning, I bring a
						potent blend of imagination and commitment to every
						project. Eager to contribute my skills in dynamic,
						forward-thinking landscapes, I'm on a quest to redefine
						the boundaries of innovation.
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
