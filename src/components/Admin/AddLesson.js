import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import ReactQuill from 'react-quill';

const AddLesson = ({show,handleClose,course}) => {
    const [titleState, setTitle] = useState(``);
    const [materialState, setMaterialState] = useState(``);
    const [fullscreen, setFullscreen] = useState(true);

    const onChangeHandler = (e,setValue) =>{
        //console.log(e.target.value)
        setValue(e.target.value);
    }
    const handleSubmit = async(event) => {
        event.preventDefault();
        const updatedCourse = {
            title: titleState,
            material: materialState,

        }

        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedCourse),
        };

    
       //const responseData = await fetch(`http://localhost:4000/user/${profile._id}`, options);
        const responseData = await fetch(`http://127.0.0.1:8000/courses/${course.id}/lessons/new/`, options);

        const addLessonData = await responseData.json();
        // console.log(addLessonData);
        handleClose();
        window.location.reload();
    }


  return (
    <div>
       <Modal  fullscreen={fullscreen} show={show} onHide={handleClose}>
        <Modal.Header closeButton onClick={()=>handleClose()}>
          <Modal.Title>Add Lesson</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit ={handleSubmit}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Number. Title"
                autoFocus
                value = {titleState}
                onChange ={(e) => onChangeHandler(e,setTitle)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>Lesson</Form.Label>
                <ReactQuill
                    theme = "snow"
                    value={materialState}
                    onChange={setMaterialState}
                    />
            </Form.Group>
            <Button variant="warning" size="lg" type='submit'>
           Add Lesson
          </Button> 
            </Form>
        </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default AddLesson