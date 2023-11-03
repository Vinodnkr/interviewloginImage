import {useState} from 'react'
import {Link, useLocation} from 'react-router-dom'
import {DragDropContext, Draggable, Droppable} from 'react-beautiful-dnd'
import {Puff} from 'react-loader-spinner' // Import a loading spinner library
import './index.css'

function Home() {
  const location = useLocation()
  const {username} = location.state || {username: null}

  const getLocalStorageKey = user => `images_${user}`
  const localStorageKey = getLocalStorageKey(username)

  const [isLoading, setIsLoading] = useState(false) // Add isLoading state

  const [title, setTitle] = useState('')
  const [file, setFile] = useState(null)
  const [editIndex, setEditIndex] = useState(-1)

  const [images, setImages] = useState(() => {
    const storedImages = JSON.parse(localStorage.getItem(localStorageKey))
    return storedImages || []
  })

  const handleTitleChange = e => {
    setTitle(e.target.value)
  }

  const handleImageUpload = e => {
    setIsLoading(true)
    const imageFile = e.target.files[0]

    if (imageFile) {
      const reader = new FileReader()

      reader.onload = event => {
        const imageDataURL = event.target.result
        const newImage = {id: Date.now(), title, file: imageDataURL}

        // Log statements for debugging
        console.log('Image data URL:', imageDataURL)
        console.log('New Image:', newImage)

        localStorage.setItem(
          localStorageKey,
          JSON.stringify([...images, newImage]),
        )

        // Log the updated images in local storage
        console.log(
          'Updated Images:',
          JSON.parse(localStorage.getItem(localStorageKey)),
        )

        setTitle('')
        setFile(null)
        setImages([...images, newImage])
        setIsLoading(false)
      }

      reader.onerror = event => {
        console.error('Error reading image file:', event)
        setIsLoading(false) // Set loading state back to false in case of an error
      }

      reader.readAsDataURL(imageFile)
    } else {
      console.error('No image file selected.')
      setIsLoading(false) // Set loading state back to false
    }
  }

  const handleDragEnd = result => {
    if (!result.destination) {
      return // Dropped outside the list.
    }

    const reorderedImages = [...images]
    const [reorderedItem] = reorderedImages.splice(result.source.index, 1)
    reorderedImages.splice(result.destination.index, 0, reorderedItem)

    // Update the order of images and store them in local storage
    localStorage.setItem(localStorageKey, JSON.stringify(reorderedImages))
    setImages(reorderedImages)
  }

  const handleUpload = () => {
    if (title && file) {
      const newImage = {id: Date.now(), title, file}
      // Add the new image to the existing images and store in local storage
      localStorage.setItem(
        localStorageKey,
        JSON.stringify([...images, newImage]),
      )
      setImages([...images, newImage])
      setTitle('')
      setFile(null)
    }
  }

  const handleEdit = index => {
    setEditIndex(index)
    setTitle(images[index].title)
    setFile(images[index].file)
  }

  const handleSaveEdit = () => {
    if (title && file && editIndex !== -1) {
      const updatedImages = [...images]
      updatedImages[editIndex] = {id: images[editIndex].id, title, file}
      localStorage.setItem(localStorageKey, JSON.stringify(updatedImages))
      setImages(updatedImages)
      setTitle('')
      setFile(null)
      setEditIndex(-1)
    }
  }

  const handleDelete = index => {
    const updatedImages = [...images]
    updatedImages.splice(index, 1)
    localStorage.setItem(localStorageKey, JSON.stringify(updatedImages))
    setImages(updatedImages)
  }

  const handleCancelEdit = () => {
    setTitle('')
    setFile(null)
    setEditIndex(-1)
  }

  const isEditing = editIndex !== -1

  return (
    <div className="image-upload-container">
      <Link className="home-logout" to="/">
        Logout
      </Link>
      <h2 className="image-upload-header">Image Upload</h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={handleTitleChange}
        className="image-upload-input"
      />
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="image-upload-input"
      />
      {/* eslint-disable-next-line no-nested-ternary */}
      {isLoading ? (
        <div className="loader-container">
          <Puff type="TailSpin" color="#00BFFF" height={50} width={50} />
        </div>
      ) : isEditing ? (
        <div>
          <button
            type="button"
            onClick={handleSaveEdit}
            className="image-upload-button"
          >
            Save
          </button>
          <button
            type="button"
            onClick={handleCancelEdit}
            className="image-upload-button"
          >
            Cancel
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={handleUpload}
          className="image-upload-button"
        >
          Upload
        </button>
      )}
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="image-list">
          {provided => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="image-container"
            >
              {images.map((image, index) => (
                <Draggable
                  key={image.id}
                  draggableId={`image-${image.id}`}
                  index={index}
                >
                  {draggableProvided => (
                    <div
                      ref={draggableProvided.innerRef}
                      {...draggableProvided.draggableProps}
                      {...draggableProvided.dragHandleProps}
                      className="image-item"
                    >
                      <div>
                        {isEditing && editIndex === index ? (
                          <div>
                            <input
                              type="text"
                              placeholder="Title"
                              value={title}
                              onChange={handleTitleChange}
                              className="edit-input"
                            />
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleImageUpload}
                              className="edit-input"
                            />
                          </div>
                        ) : (
                          <div>
                            <img src={image.file} alt={image.title} />
                            <h3>{image.title}</h3>
                          </div>
                        )}
                        <div>
                          {isEditing && editIndex === index ? (
                            <div>
                              <button
                                type="button"
                                onClick={handleSaveEdit}
                                className="edit-button"
                              >
                                Save
                              </button>
                              <button
                                type="button"
                                onClick={handleCancelEdit}
                                className="cancel-button"
                              >
                                Cancel
                              </button>
                            </div>
                          ) : (
                            <div>
                              <button
                                type="button"
                                onClick={() => handleEdit(index)}
                                className="edit-button"
                              >
                                Edit
                              </button>
                              <button
                                type="button"
                                onClick={() => handleDelete(index)}
                                className="edit-button"
                              >
                                Delete
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  )
}

export default Home
