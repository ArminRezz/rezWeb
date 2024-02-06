import React from "react"
import { Parallax, ParallaxLayer } from "@react-spring/parallax"
import "./App.css"
import Navbar from "./components/Navbar"
import Card from "./Card"

const events = [
	{
		id: 1,
		date: "2020",
		title: "Started Coding Journey",
		description: "Began learning programming and web development.",
	},
	{
		id: 2,
		date: "2021",
		title: "First React Project",
		description: "Built my first React application.",
	},
	{
		id: 3,
		date: "2022",
		title: "Web Development Internship",
		description: "Gained practical experience through an internship.",
	},
]

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
					pages={4}
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
							<div className="Experience">
								<div><h1> Experience </h1></div>
								<div>
									<Card />
								</div>
							</div>
						</div>
					</ParallaxLayer>
					<ParallaxLayer offset={2}>
						<div className="page2-container">
							<div className="Experience">
								<h1> Projects </h1>
							</div>
						</div>
					</ParallaxLayer>
					<ParallaxLayer offset={3}>
						<div className="page3-container">
							<div className="Experience">
								<h1> Contact Me </h1>
							</div>
						</div>
					</ParallaxLayer>
				</Parallax>
			</div>
		</>
	)
}

export default App
