import { ArtsContext } from "../context/ArtsContext"
import { useContext } from "react"

export const useArtsContext = () => {
	const context = useContext(ArtsContext)

	if (!context) {
		throw Error("useArtsContext must be used inside an ArtsContextProvider")
	}

	return context
}
