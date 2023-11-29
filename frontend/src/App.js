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
					pages={3}
					style={{ top: "0", left: "0" }}
					class="animation"
				>
					<ParallaxLayer offset={0} speed={0.25}>
						<div
							class="animation_layer parallax"
							id="artback"
						></div>
					</ParallaxLayer>
					<ParallaxLayer offset={0} speed={0.2}>
						<div
							class="animation_layer parallax"
							id="mountain"
						></div>
					</ParallaxLayer>
					<ParallaxLayer offset={0} speed={0.1}>
						<div
							class="animation_layer parallax"
							id="jungle1"
						></div>
					</ParallaxLayer>
					<ParallaxLayer offset={0} speed={0.35}>
						<div
							class="animation_layer parallax"
							id="jungle2"
						></div>
					</ParallaxLayer>
					<ParallaxLayer offset={0} speed={0.5}>
						<div
							class="animation_layer parallax"
							id="jungle3"
						></div>
					</ParallaxLayer>
					<ParallaxLayer offset={0} speed={0.6}>
						<div
							class="animation_layer parallax"
							id="jungle4"
						></div>
					</ParallaxLayer>
					<ParallaxLayer offset={0} speed={0.4}>
						<div
							class="animation_layer parallax"
							id="manonmountain"
						></div>
					</ParallaxLayer>
					<ParallaxLayer offset={0} speed={0.35}>
						<div
							class="animation_layer parallax"
							id="jungle5"
						></div>
					</ParallaxLayer>
					<ParallaxLayer offset={0} speed={0.1}>
						<div className="pname-container">
							<div className="name-container">
								<img
									style={{
                    border: '5px solid black',
										borderRadius: "50%",
										opacity: "93%",
										overflow: "hidden",
										height: "100%",
										width: "100%",
									}}
									src={profile}
									alt="GitHub Logo"
								/>
								<h1> &lt;/&gt; ArminRezz</h1>
							</div>
						</div>
					</ParallaxLayer>
					<ParallaxLayer offset={0} speed={0.3}>
						<div className="page-0-content">
							<img
								style={{
									filter: "grayscale(100%)",
									margin: "3rem",
									height: "200px",
									width: "320px",
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
										height: "200px",
										width: "200px",
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
										filter: "grayscale(80%)",
										height: "200px",
										width: "200px",
									}}
									src={linkedinLogo}
									alt="GitHub Logo"
								/>
							</a>
						</div>
					</ParallaxLayer>
				</Parallax>
			</div>
		</>
	)
}

export default App
