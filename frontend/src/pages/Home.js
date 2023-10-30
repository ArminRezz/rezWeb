import React from "react"
import profileImage from "../images/profile.jpeg"
import "./styling/Home.css"
import gitLogo from "../images/githubLogo.png"
import linkedInLogo from "../images/linkedInLogo.png"

const Home = () => {
	return (
		<div className="Home">
			<img
				src={profileImage}
				alt="Armin Rezaiyan-Nojani"
				className="profile-image"
			/>
			<div className="social-buttons">
				<a
					href="https://github.com/ArminRezz"
					target="_blank"
					rel="noopener noreferrer"
					className="social-button"
				>
					<i className="fab fa-github">
						<img src={gitLogo} width={'50px'}/>
					</i>
				</a>
				<a
					href="https://www.linkedin.com/in/arminrezaiyan/"
					target="_blank"
					rel="noopener noreferrer"
					className="social-button"
				>
					<i className="fab fa-linkedin"><img src={linkedInLogo} width={'50px'}/></i>
				</a>
			</div>
			<p>
				My name is <strong> Armin Rezaiyan-Nojani. </strong>
			</p>
			<p>
				{" "}
				"Success is not final, failure is not fatal: it is the courage
				to continue that counts." - Winston Churchill{" "}
			</p>
			<div className="contact-info">
				<h2>Contact Information</h2>
				<p>Email: arnojani2005@gmail.com</p>
				<p>Location: Gaithersburg, Maryland, United States</p>
			</div>
			<div className="experience">
				<h1>Experience</h1>

				<h2>Dulles Glass & Mirror - React Developer</h2>
				<p>
					June 2023 - Present (5 months) | Manassas, Virginia, United
					States
				</p>
				<p>
					Utilizing React with Typescript to create the frontend UI
					for a tool for designing pricing tables and other forms of
					data tables.
				</p>

				<h2>Chess Wizards, Inc - Chess Tutor</h2>
				<p>January 2023 - June 2023 (6 months)</p>
				<p>
					At Chess Wizards, I had the opportunity to combine my love
					for the game of chess with my passion for teaching and
					mentoring. As a chess instructor, I led engaging and
					interactive lessons for students of all ages and skill
					levels, helping them to improve their chess strategies and
					techniques. I took pride in seeing my students' progress and
					achievements.
				</p>

				<h2>
					NASA - National Aeronautics and Space Administration -
					Artificial Intelligence / Machine Learning Intern
				</h2>
				<p>
					June 2022 - August 2022 (3 months) | 8800 Greenbelt Rd,
					Greenbelt, MD 20771
				</p>
				<ul>
					<li>
						Interned at NASA Goddard Earth Sciences Data and
						Information Services Center (GES DISC), researched
						Learning To Rank (LTR) in Machine Learning to improve
						search results relevance.
					</li>
					<li>
						Designed a program that transformed user interaction
						data into a prioritization list for LTR training,
						resulting in optimized ranking and more relevant
						datasets for common queries.
					</li>
					<li>
						Trained an XGBoost model, resulting in a significant
						improvement of NDCG scores from 36% to 81% on test data.
					</li>
					<li>
						Utilized a prototype ML model to study insights,
						mistakes, and proficiencies to create a functional
						search relevance model for GES DISC.
					</li>
				</ul>

				<h2>
					National Institute of Standards and Technology (NIST) -
					Computational Modeling / Visualization Intern
				</h2>
				<p>
					June 2022 - August 2022 (3 months) | 100 Bureau Dr,
					Gaithersburg, MD 20899
				</p>
				<ul>
					<li>
						Conducted research on the relationship between
						dielectric energy in the human body and radio frequency
						transmissions from wearable wireless devices while
						interning at NIST with the aim of optimizing antenna
						performance.
					</li>
					<li>
						Utilized Paraview to examine the Human Body Model and
						analyzed its interactions with RF waves emitted from
						wearable device antennas.
					</li>
					<li>
						Optimized scientists' ability to visualize data through
						the implementation of immersive 3D visualizations using
						Virtual Reality (VR) or Cave Automatic Virtual
						Environment (CAVE) on Paraview, streamlining processes
						for greater efficiency.
					</li>
				</ul>

				<h2>Dulles Glass & Mirror - Software Engineering Intern</h2>
				<p>
					June 2021 - August 2021 (3 months) | Manassas, Virginia,
					United States
				</p>
				<ul>
					<li>
						Collaborated with the software engineering team to
						design and build a technical application for configuring
						commercial products.
					</li>
					<li>
						Employed HTML, JavaScript, Node.js, Java, SQL, and GIT
						to build a web-based platform.
					</li>
					<li>
						Utilized Java to process and analyze hardware
						specification documents by converting CSV and Amazon
						DynamoDB files to JSON in accordance with varying
						specifications.
					</li>
					<li>
						Worked in an Agile environment, participating in daily
						scrum meetings and using Trello for task management.
					</li>
					<li>
						Adhered to software development best practices,
						including GitHub branching, pull requests, peer review,
						and DevOps processes.
					</li>
				</ul>
			</div>
			<div className="education">
				<h2>Education</h2>
				<p>
					<strong>Associate's degree, Computer Science</strong> -
					Montgomery College (September 2021 - May 2023)
				</p>
				<p>
					<strong>
						High School Diploma, Mathematics and Computer Science
					</strong>{" "}
					- Thomas S Wootton High School (September 2019 - May 2023)
				</p>
			</div>
			<div className="skills-hobbies">
				<h2>Skills | Classes | Hobbies</h2>
				<div className="skills-list">
					<p>
						<strong>Skills</strong> - Proficient in Java, C++,
						Python, HTML, CSS, and the Command Line. Experienced
						with Pandas, Numpy, Github, Visual Studio Code,
						Microsoft Teams, Slack, Trello. Familiar with
						JavaScript, Virtual Reality, Paraview, JSON, CSV, and
						Anaconda
					</p>
					<p>
						<strong>Classes</strong> - AP COMP SCI (Python), CMSC
						140 (C++), CMSC 203 (C++), CMSC 204 (Advanced Java),
						CMSC 207(Discrete Structures), MATH 181 (Calculus 1) ,
						MATH 182 (Calculus 2), MATH 284 (Linear Algebra), Linux
						Essentials
					</p>
					<p>
						<strong>Hobbies</strong>: Tutoring Chess, Soccer,
						trading stocks/options/crypto, Art, Skiing
					</p>
				</div>
			</div>
		</div>
	)
}

export default Home
