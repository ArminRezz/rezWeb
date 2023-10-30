import { useArtsContext } from '../../hooks/useArtsContext'

import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const ArtDetails = ({ art }) => {
    const { dispatch } = useArtsContext()

    const handleClick = async () => {
        const response = await fetch('/api/art/' + art._id, {
            method: 'DELETE'
        })
        const json = await response.json()

        if (response.ok) {
            dispatch({type: 'DELETE_ART', payload: json})
        }
    }

    return (
        <div className="art-details">
            <h4>{art.title}</h4>
            <p><strong>Description: </strong>{art.description}</p>
            <p>{formatDistanceToNow(new Date(art.createdAt), { addSuffix: true })}</p>
            <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
        </div>
    )
}

export default ArtDetails
