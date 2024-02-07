import { useState } from "react"
import emailjs from "@emailjs/browser"
import "./styling/Contact.css"

const ContactForm = () => {
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [stateMessage, setStateMessage] = useState(null)
	const sendEmail = (e) => {
		e.persist()
		e.preventDefault()
		setIsSubmitting(true)
		emailjs
			.sendForm(
				"service_bbgf8g6", // service id emailjs
				"template_3aqhhq8", // template id emailjs
				e.target,
				"HWXgun0kLacdui8YF" // public key emailjs
			)
			.then(
				(result) => {
					setStateMessage("Message sent!")
					setIsSubmitting(false)
					setTimeout(() => {
						setStateMessage(null)
					}, 5000) // hide message after 5 seconds
				},
				(error) => {
					setStateMessage(
						"Something went wrong, please try again later"
					)
					setIsSubmitting(false)
					setTimeout(() => {
						setStateMessage(null)
					}, 5000) // hide message after 5 seconds
				}
			)

		// Clears the form after sending the email
		e.target.reset()
	}
	return (
		<form onSubmit={sendEmail} className="contact-form">
			<label>Name</label>
			<input type="text" name="user_name" />
			<label>Email</label>
			<input type="email" name="user_email" />
			<label>Message</label>
			<textarea name="message" />
			<input type="submit" value="Send" disabled={isSubmitting} />
			{stateMessage && <p>{stateMessage}</p>}
		</form>
	)
}
export default ContactForm
