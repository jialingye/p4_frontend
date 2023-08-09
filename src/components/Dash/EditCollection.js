import React, { useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap';


const EditCollection = ({show, handleClose, collection}) => {
    const [titleState, setTitle] = useState(`${collection.title}`);
    const [descriptionState, setDescriptionState] = useState(`${collection.description}`);

    const onChangeHandler =(e, setValue) =>{
        setValue(e.target.value)
    }

    const handleSubmit = async(event)=>{
        event.preventDefault();

     const updatedCollection = {
            title: titleState,
            description: descriptionState,
        }

        const options = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedCollection),
        };

    
         const responseData = await fetch(`https://aicademybackend.onrender.com/collection/${collection.id}/update/`, options);
        //const responseData = await fetch(`http://127.0.0.1:8000/collection/${collection.id}/update/`, options);

        const updatedLessonData = await responseData.json();
        //console.log(updatedLessonData);
        handleClose();
        window.location.reload();
    }

    const onDeleteHandler = async (event) => {
        event.preventDefault();
        //console.log("Delete review with ", collection.id)
    
        try {
        const options = {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
        }
        };
        //const response = await fetch(`http://127.0.0.1:8000/collection/${collection.id}/delete/`, options);
        const response = await fetch(`https://aicademybackend.onrender.com/collection/${collection.id}/delete/`, options);
        
        if(response.status === 204){
            console.log(response.status);
            window.location.reload();
        } else if (response.status === 404) {
            console.log('lesson not found')
        } else{
            const errorData = await response.json();
            console.error("Error deleting lesson:", errorData);
        }
       
        } catch(error) {
            console.error('Error deleting lesson', error)
        }       
      };

  return (
    <div>
        <Modal show={show} onHide={handleClose}>
    <Modal.Header closeButton onClick={()=>handleClose()}>
      <Modal.Title>Edit Lesson</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Form onSubmit ={handleSubmit}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Title"
            autoFocus
            value = {titleState}
            onChange ={(e) => onChangeHandler(e,setTitle)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Description</Form.Label>
            <Form.Control
            as = "textarea"
            placeholder="description"
            autoFocus
            value = {descriptionState}
            onChange ={(e) => onChangeHandler(e,setDescriptionState)}
          />
        </Form.Group>
        <Button variant="warning" size="lg" type='submit'>
       Update Lesson
      </Button>
      <Button variant="danger" size="lg" type='submit' onClick ={onDeleteHandler}>Delete</Button> 
        </Form>
    </Modal.Body>
    <Modal.Footer>
    </Modal.Footer>
  </Modal>
    </div>
  )
}

export default EditCollection