import React, { useState, useRef } from "react"
import "./components/styling/Card.css"

export default function Card({ imageSrc, imgStyle, title, description, stylesheet }) {
	const [xRotation, setXRotation] = useState(0)
	const [yRotation, setYRotation] = useState(0)
	const cardRef = useRef(null)
	const imgRef = useRef(null)
	const titleRef = useRef(null)
	const descRef = useRef(null)
	const purchaseRef = useRef(null)

	function handleMouseMove(event) {
		const card = cardRef.current
		const { offsetWidth: width, offsetHeight: height } = card
		const { clientX, clientY } = event
		const x = clientX - card.offsetLeft - width / 2
		const y = clientY - card.offsetTop - height / 2
		var mult = 40
		setXRotation((y / height) * mult)
		setYRotation((x / width) * mult)
	}

	function handleMouseEnter() {
		const img = imgRef.current
		const title = titleRef.current
		const sizesBox = descRef.current
		const purchase = purchaseRef.current
		const desc = descRef.current
		title.style.transform = "translateZ(150px)"
		img.style.transform = "translateZ(100px) rotateZ(-30deg)"
		sizesBox.style.transform = "translateZ(100px)"
		purchase.style.transform = "translateZ(75px)"
		desc.style.transform = "translateZ(200px)"
	}

	function handleMouseLeave() {
		setXRotation(0)
		setYRotation(0)

		const img = imgRef.current
		const title = titleRef.current
		const sizesBox = descRef.current
		const purchase = purchaseRef.current
		title.style.transform = "translateZ(0px)"
		img.style.transform = "translateZ(0px) rotateZ(0deg)"
		sizesBox.style.transform = "translateZ(0px)"
		purchase.style.transform = "translateZ(0px)"
	}

	return (
		<div
			className={`card ${stylesheet}`}
			ref={cardRef}
			style={{
				transform: `rotateX(${xRotation}deg) rotateY(${yRotation}deg)`,
			}}
			onMouseMove={handleMouseMove}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
		>
			<img
				ref={imgRef}
				src={imageSrc}
				className={imgStyle}
				alt=""
			/>
			<h2 className="title" ref={titleRef}>
				{title}
			</h2>
			<p className="sizes-box" ref={descRef}>
				{description}
			</p>
			<div className="button-box" ref={purchaseRef}></div>
		</div>
	)
}
