import React from "react"
import { Parallax, ParallaxLayer } from "@react-spring/parallax"
import "./App.css"
import Navbar from "./components/Navbar"
import Card from "./Card"

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
							<div className="Experience">
								<div>
									<h1>- Me -</h1>
								</div>
								<div className="card-row">
									<Card />
									<Card />
									<Card />
								</div>
							</div>
						</div>
					</ParallaxLayer>

					<ParallaxLayer offset={2}>
						<div className="page1-container">
							ƒ
							<div className="Experience">
								<div>
									<h1> Experiences </h1>
								</div>
								<div className="card-row">
									<Card />
									<Card />
									<Card />
								</div>
							</div>
						</div>
					</ParallaxLayer>
					<ParallaxLayer offset={3}>
						<div className="page2-container">
							<div className="Experience">
								<div>
									<h1> Education </h1>
								</div>
								<div className="card-row">
									<Card />
									<Card />
									<Card />
								</div>
							</div>
						</div>
					</ParallaxLayer>
					<ParallaxLayer offset={4}>
						<div className="page3-container">
							<div className="Experience">
								<h1> Contacts </h1>
							</div>
						</div>
					</ParallaxLayer>
				</Parallax>
			</div>
		</>
	)
}

export default App
