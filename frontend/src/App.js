import { Parallax, ParallaxLayer } from "@react-spring/parallax"
import "./App.css"
import gitLogo from "./images/githubLogo.png"
import linkedinLogo from "./images/linkedInLogo.png"
import profile from "./images/profile.jpeg"
import umdLogo from "./images/umdLogo.png"

function App() {
	return (
		<>
			<div className="App">
				<Parallax
					pages={4}
					style={{
						backgroundColor: "rgb(0, 12, 0)",
						top: "0",
						left: "0",
					}}
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
								<h1> ArminRezz</h1>
							</div>
						</div>
					</ParallaxLayer>
					<ParallaxLayer offset={0} speed={0}>
						<div className="page-0-content">
							<img
								style={{
									marginBottom: "3.8rem",
									height: "7rem",
									width: "13rem",
								}}
								src={umdLogo}
								alt="UMD Logo"
							/>
							<a
								href="https://github.com"
								target="_blank"
								rel="noopener noreferrer"
							>
								<img
									style={{
										margin: "4rem",
										height: "7rem",
										width: "7rem",
									}}
									src={gitLogo}
									alt="GitHub Logo"
								/>
							</a>
							<a
								href="https://linkedin.com"
								target="_blank"
								rel="noopener noreferrer"
							>
								<img
									style={{
										margin: "4rem",
										height: "7rem",
										width: "7rem",
									}}
									src={linkedinLogo}
									alt="GitHub Logo"
								/>
							</a>
						</div>
					</ParallaxLayer>
					<ParallaxLayer offset={1} speed={0}>
						<div className="Experience">
							<h1> Dev Experiences </h1>
						</div>
					</ParallaxLayer>
					<ParallaxLayer offset={2}>
						<div className="Experience">
							<h1> Dev Projects </h1>
						</div>
					</ParallaxLayer>
					<ParallaxLayer offset={3}>
						<div className="Experience">
							<h1> Contact Me </h1>
						</div>
					</ParallaxLayer>
				</Parallax>
			</div>
		</>
	)
}

export default App
