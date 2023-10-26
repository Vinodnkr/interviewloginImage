import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import './index.css';

function Home() {
  const [images, setImages] = useState([]);
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [editIndex, setEditIndex] = useState(-1);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDragEnd = (result) => {
    if (!result.destination) {
      return; // Dropped outside the list.
    }
  
    const reorderedImages = [...images];
    const [reorderedItem] = reorderedImages.splice(result.source.index, 1);
    reorderedImages.splice(result.destination.index, 0, reorderedItem);
  
    setImages(reorderedImages);
  };

  

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (title && file) {
      const newImage = { title, file };
      setImages([...images, newImage]);
      setTitle("");
      setFile(null);
    }
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setTitle(images[index].title);
    setFile(images[index].file);
  };

  const handleSaveEdit = () => {
    if (title && file && editIndex !== -1) {
      const updatedImages = [...images];
      updatedImages[editIndex] = { title, file };
      setImages(updatedImages);
      setTitle("");
      setFile(null);
      setEditIndex(-1);
    }
  };

  const handleDelete = (index) => {
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    setImages(updatedImages);
  };

  const handleCancelEdit = () => {
    setTitle("");
    setFile(null);
    setEditIndex(-1);
  };

  const isEditing = editIndex !== -1;

  return (
    <div className="image-upload-container">
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
        onChange={handleFileChange}
        className="image-upload-input"
      />
      {isEditing ? (
        <div>
          <button onClick={handleSaveEdit} className="image-upload-button">Save</button>
          <button onClick={handleCancelEdit} className="image-upload-button">Cancel</button>
        </div>
      ) : (
        <button onClick={handleUpload} className="image-upload-button">Upload</button>
      )}

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="image-list">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef} className="image-container">
              {images.map((image, index) => (
                <Draggable key={index} draggableId={`image-${index}`} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
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
                              onChange={handleFileChange}
                              className="edit-input"
                            />
                          </div>
                        ) : (
                          <div>
                            <img src={URL.createObjectURL(image.file)} alt={image.title} />
                            <h3>{image.title}</h3>
                          </div>
                        )}
                        <div>
                          {isEditing && editIndex === index ? (
                            <div>
                              <button onClick={handleSaveEdit} className="edit-button">Save</button>
                              <button onClick={handleCancelEdit} className="cancel-button">Cancel</button>
                            </div>
                          ) : (
                            <div>
                              <button onClick={() => handleEdit(index)} className="edit-button">Edit</button>
                              <button onClick={() => handleDelete(index)} className="edit-button">Delete</button>
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
  );
}

export default Home;