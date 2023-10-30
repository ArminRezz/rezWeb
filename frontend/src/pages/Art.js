import { useEffect } from "react"
import { useArtsContext } from "../hooks/useArtsContext"

// components
import ArtDetails from "../components/ArtComponents/ArtDetails"
import ArtForm from "../components/ArtComponents/ArtForm"

const ArtPage = () => {
	const { arts, dispatch } = useArtsContext()

	useEffect(() => {
		const fetchArts = async () => {
			const response = await fetch('/api/art')
			const json = await response.json()

			if (response.ok) {
				dispatch({type: 'SET_ARTS', payload: json})
			}
		}

		fetchArts()
	}, [dispatch])

	return (
		<div className="home">
			<div className="arts">
				{arts && arts.map(art => (
					<ArtDetails art={art} key={art._id} />
				))}
			</div>
			<ArtForm />
		</div>
	)
}

export default ArtPage