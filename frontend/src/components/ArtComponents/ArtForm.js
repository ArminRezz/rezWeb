import { useState } from 'react'
import { useArtsContext } from '../../hooks/useArtsContext'

const ArtForm = () => {
    const { dispatch } = useArtsContext()

    const [title, setTitle] = useState('')
    const [image, setImage] = useState('')
    const [video, setVideo] = useState('')
    const [originDate, setOriginDate] = useState('')
    const [originLocation, setOriginLocation] = useState('')
    const [description, setDescription] = useState('')
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault()

        const art = {title, image, video, originDate, originLocation, description}
        
        const response = await fetch('/api/art', {
            method: 'POST',
            body: JSON.stringify(art),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }
        if (response.ok) {
            setEmptyFields([])
            setError(null)
            setTitle('')
            setImage('')
            setVideo('')
            setOriginDate('')
            setOriginLocation('')
            setDescription('')
            dispatch({type: 'CREATE_ART', payload: json})
        }

    }

    return (
        <form className="create" onSubmit={handleSubmit}> 
            <h3>Add a New Art</h3>

            <label>Art Title:</label>
            <input 
                type="text" 
                onChange={(e) => setTitle(e.target.value)} 
                value={title}
                className={emptyFields.includes('title') ? 'error' : ''}
            />

            <label>Image URL:</label>
            <input 
                type="text" 
                onChange={(e) => setImage(e.target.value)} 
                value={image}
                className={emptyFields.includes('image') ? 'error' : ''}
            />

            <label>Video URL:</label>
            <input 
                type="text" 
                onChange={(e) => setVideo(e.target.value)} 
                value={video}
                className={emptyFields.includes('video') ? 'error' : ''}
            />

            <label>Origin Date:</label>
            <input 
                type="date" 
                onChange={(e) => setOriginDate(e.target.value)} 
                value={originDate}
                className={emptyFields.includes('originDate') ? 'error' : ''}
            />

            <label>Origin Location:</label>
            <input 
                type="text" 
                onChange={(e) => setOriginLocation(e.target.value)} 
                value={originLocation}
                className={emptyFields.includes('originLocation') ? 'error' : ''}
            />

            <label>Description:</label>
            <textarea 
                onChange={(e) => setDescription(e.target.value)} 
                value={description}
                className={emptyFields.includes('description') ? 'error' : ''}
            />

            <button>Add Art</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default ArtForm
