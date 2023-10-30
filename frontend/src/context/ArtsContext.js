import { createContext, useReducer } from "react"

export const ArtsContext = createContext()

export const artsReducer = (state, action) => {
	switch (action.type) {
		case "SET_ARTS":
			return {
				arts: action.payload,
			}
		case "CREATE_ART":
			return {
				arts: [action.payload, ...state.arts],
			}
		case "DELETE_ART":
			return {
				arts: state.arts.filter((a) => a._id !== action.payload._id),
			}
		default:
			return state
	}
}

export const ArtsContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(artsReducer, {
		arts: [],
	})

	return (
		<ArtsContext.Provider value={{ ...state, dispatch }}>
			{children}
		</ArtsContext.Provider>
	)
}
