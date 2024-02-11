import React from "react"
import { Parallax, ParallaxLayer } from "@react-spring/parallax"
import "./App.css"
import Navbar from "./components/Navbar"
import Card from "./Card"
import ContactForm from "./components/ContactForm"

function App() {
	let parallaxRef = React.useRef(null)

	const goToOffset = (offset) => {
		if (parallaxRef && parallaxRef.current) {
			parallaxRef.current.scrollTo(offset)
		}
	}
	return (
		<>
			<div className="App">
				<Navbar goToOffset={goToOffset} />
				<Parallax
					pages={6}
					style={{
						top: "0",
						left: "0",
					}}
					ref={parallaxRef}
					class="animation"
				>
					<ParallaxLayer offset={0} speed={-0.38}>
						<div
							class="animation_layer parallax"
							id="artback"
						></div>
					</ParallaxLayer>
					<ParallaxLayer offset={0} speed={-0.34}>
						<div
							class="animation_layer parallax"
							id="mountain"
						></div>
					</ParallaxLayer>
					<ParallaxLayer offset={0} speed={-0.24}>
						<div
							class="animation_layer parallax"
							id="jungle1"
						></div>
					</ParallaxLayer>
					<ParallaxLayer offset={0} speed={-0.13}>
						<div
							class="animation_layer parallax"
							id="jungle2"
						></div>
					</ParallaxLayer>
					<ParallaxLayer offset={0} speed={-0.085}>
						<div
							class="animation_layer parallax"
							id="jungle3"
						></div>
					</ParallaxLayer>
					<ParallaxLayer offset={0} speed={0}>
						<div
							class="animation_layer parallax"
							id="jungle4"
						></div>
					</ParallaxLayer>
					<ParallaxLayer offset={0} speed={0}>
						<div
							class="animation_layer parallax"
							id="manonmountain"
						></div>
					</ParallaxLayer>
					<ParallaxLayer offset={0} speed={0}>
						<div
							class="animation_layer parallax"
							id="jungle5"
						></div>
					</ParallaxLayer>
					<ParallaxLayer offset={0} speed={-0.2}>
						<div className="pname-container">
							<div className="name-container">
								<h1> ArminRezz </h1>
							</div>
						</div>
					</ParallaxLayer>
					<ParallaxLayer offset={1}>
						<div className="page1-container">
							<div className="Me">
								<div
									style={{
										textAlign: "center",
									}}
								>
									<br></br>
									<h1>
										🇮🇷&nbsp;&nbsp;&nbsp;&nbsp;Me&nbsp;&nbsp;&nbsp;&nbsp;🇭🇺
									</h1>
								</div>
								<div className="slide">
									<img
										style={{
											border: "4px solid white",
											marginLeft: "5%",
											borderRadius: "50%",
											width: "28%",
											height: "30%",
											marginRight: "2rem",
										}}
										src={require("./images/profile.jpeg")}
										alt=""
									/>
									<img
										style={{
											marginLeft: "3%",
											borderRadius: "5%",
											width: "22%",
											height: "30%",
											marginRight: "2rem",
										}}
										src={require("./images/profile2.jpg")}
										alt=""
									/>
									<img
										style={{
											border: "2px solid white",
											marginLeft: "5rem",
											borderRadius: "5%",
											width: "20%",
											height: "30%",
										}}
										src={require("./images/myCar.jpg")}
										alt=""
									/>
									<p>
										Energetic Computer Science student,
										boasting a unique educational journey
										that includes completing two years of
										college coursework during high school
										and internships at prestigious
										institutions like NASA and NIST. I've
										solidified my expertise in software
										development and machine learning,
										contributing to projects ranging from
										web development, to knowledge graph
										construction, to antenna performance
										optimization. Collaborative by nature, I
										thrive in diverse team environments,
										driven by a passion for innovation and a
										commitment to continuous learning. Eager
										to apply my multidisciplinary education
										and practical skills to contribute
										meaningfully to cutting-edge projects
										and further excel under mentorship.
									</p>
								</div>
							</div>
						</div>
					</ParallaxLayer>

					<ParallaxLayer offset={2} factor={2}>
						<div className="page1-container">
							<div className="Experience">
								<div>
									<h1> 🧠 Experiences 🧠 </h1>
								</div>
								<div className="card-row">
									<Card
										imgStyle="img"
										imageSrc={require("./images/nasa.png")}
										title="AI and ML Intern Summer 2023"
										description="Employed Weaviate to develop a subsidiary knowledge graph with the goal of breaking down data in PDFs attached to GES DISC datasets
										Collaborated with fellow interns to integrate my knowledge graph into a holistic knowledge graph, which resulted in enhanced overall data discoverability and accessibility.
										"
									/>
									<Card
										imgStyle="img"
										imageSrc={require("./images/nasa.png")}
										title="AI and ML Intern Summer 2022"
										description="Collaborated on developing the primary knowledge graph and a subsidiary one focusing on PDF analysis, significantly contributing to a comprehensive understanding of datasets through bi-weekly meetings."
									/>
									<Card
										imgStyle="img"
										imageSrc={require("./images/nistLogo.png")}
										title="Computational Modeling Intern Summer 2022"
										description="Conducted research on the relationship between dielectric energy in the human body and radio frequency transmissions from wearable wireless devices while interning at NIST with the aim of optimizing antenna performance."
									/>
								</div>
								<div className="card-row-1">
									<Card
										stylesheet="card-dg"
										imgStyle="img"
										imageSrc={require("./images/dullesGlass.png")}
										title="Part-Time React Developer"
										description="Developed an entire frontend UI tool focused on designing dynamic pricing tables and other data tables using React with Typescript."
									/>
									<Card
										stylesheet="card-row2"
										imgStyle="img"
										imageSrc={require("./images/chessWizards.png")}
										title="Chess Tutor"
										description="Engaged in a fulfilling role as a chess instructor at Chess Wizards, merging my passion for the game with teaching and mentoring. Led dynamic and interactive lessons tailored to students of varying ages and skill levels."
									/>
									<Card
										stylesheet="card-dg"
										imgStyle="img"
										imageSrc={require("./images/dullesGlass.png")}
										title="Java/Web Developer"
										description="Employed Java to validate hardware attribute integrity against legacy system data from Amazon DynamoDB.
										Adhered to DevOps and Agile methodologies to ensure efficient project development and delivery.
										Implemented minor frontend adjustments and enhancements, refining user interface functionality and usability."
									/>
								</div>
							</div>
						</div>
					</ParallaxLayer>
					<ParallaxLayer offset={4}>
						<div className="page2-container">
							<div className="Experience">
								<div>
									<h1> 📖 Education 📖</h1>
								</div>
								<div className="card-row">
									<Card
										stylesheet="wootton"
										imgStyle="img"
										imageSrc={require("./images/woottonLogo.png")}
										title="Thomas S. Wootton"
										description="Member of Academy of Information Technology (AOIT). Played Varsity soccer. Graduated May 2023."
									/>
									<Card
										stylesheet="MC"
										imgStyle="img-MC"
										imageSrc={require("./images/mcLogo.png")}
										title="Montgomery College"
										description="Member of Early College program. Graduated May 2023 with an Associates Degree in Computer Science."
									/>
									<Card
										stylesheet="wootton"
										imgStyle="img"
										imageSrc={require("./images/umdLogo.png")}
										title="University of Maryland - College Park"
										description="Started Jan 2024: B.S, Computer Science, Striving for Masters, Current classes: STAT400, CMSC216"
									/>
								</div>
							</div>
						</div>
					</ParallaxLayer>
					<ParallaxLayer offset={5}>
						<div className="page3-container">
							<div className="Experience">
								<br></br>
								<h1> Contacts 💬 </h1>
								<br></br>
								<br></br>
								<ContactForm />
							</div>
						</div>
					</ParallaxLayer>
				</Parallax>
			</div>
		</>
	)
}

export default App
