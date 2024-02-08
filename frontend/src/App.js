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
					pages={5}
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
										marginTop: "2%",
										textAlign: "center",
									}}
								>
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

					<ParallaxLayer offset={2}>
						<div className="page1-container">
							<div className="Experience">
								<div>
									<h1> 🧠 Experiences 🧠 </h1>
								</div>
								<div className="card-row">
									<Card
										imageSrc={require("./images/nasa.png")}
										title="AI and ML Intern Summer 2024"
										description="Utilized the ML concept of 'Learning to Rank', Created an xgboost model for ranking ges disc data collections in a way that is beneficial for scientists and researchers."
									/>
									<Card
										imageSrc={require("./images/nasa.png")}
										title="AI and ML Intern Summer 2023"
										description="Collaborated on developing the primary knowledge graph and a subsidiary one focusing on PDF analysis, significantly contributing to a comprehensive understanding of datasets through bi-weekly meetings."
									/>
									<Card
										imageSrc={require("./images/nistLogo.png")}
										title="Computational Modeling Intern Summer 2023"
										description="Conducted research on the relationship between dielectric energy in the human body and radio frequency transmissions from wearable wireless devices while interning at NIST with the aim of optimizing antenna performance."
									/>
								</div>
							</div>
						</div>
					</ParallaxLayer>
					<ParallaxLayer offset={3}>
						<div className="page2-container">
							<div className="Experience">
								<div>
									<h1> 📖 Education 📖</h1>
								</div>
								<div className="card-row">
									<Card
										imageSrc={require("./images/woottonLogo.png")}
										title="Thomas S. Wootton"
										description="Played JV, Varsity, and club soccer."
									/>
									<Card
										imageSrc={require("./images/mcLogo.png")}
										title="Montgomery College"
										description="Played JV, Varsity, and club soccer."
									/>
									<Card
										imageSrc={require("./images/umdLogo.png")}
										title="University of Maryland - College Park"
										description="Played JV, Varsity, and club soccer."
									/>
								</div>
							</div>
						</div>
					</ParallaxLayer>
					<ParallaxLayer offset={4}>
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
