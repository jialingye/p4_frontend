import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import ReactQuill from 'react-quill';

const EditAssessment = ({show,handleClose,assessment}) => {
  
    const [questionState, setQuestion] = useState(`${assessment.question}`);


    const handleSubmit = async(event) => {
        event.preventDefault();
        const updatedAssessment = {
            question: questionState,
        }

        const options = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedAssessment),
        };

    
       //const responseData = await fetch(`http://localhost:4000/user/${profile._id}`, options);
        const responseData = await fetch(`https://aicademybackend.onrender.com/assessments/${assessment.id}/update/`, options);
        //const responseData = await fetch(`http://127.0.0.1:8000/assessments/${assessment.id}/update/`, options);

        const updatedAssessData = await responseData.json();
        console.log(updatedAssessData);
        handleClose();
        window.location.reload();
    }
    const onDeleteHandler = async (event) => {
        event.preventDefault();
        console.log("Delete review with ", assessment.id)
    
        try {
        const options = {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
        }
        };
        const response = await fetch(`https://aicademybackend.onrender.com/assessments/${assessment.id}/delete/`, options);
        //const response = await fetch(`http://127.0.0.1:8000/assessments/${assessment.id}/delete/`, options);

        if(response.status === 204){
            console.log(response.status);
            window.location.reload();
        } else if (response.status === 404) {
            console.log('assessment not found')
        } else{
            const errorData = await response.json();
            console.error("Error deleting assessment:", errorData);
        }
       
        } catch(error) {
            console.error('Error deleting assessment', error)
        }       
      };

  return (
    <div>
    <Modal  show={show} onHide={handleClose}>
        <Modal.Header closeButton onClick={()=>handleClose()}>
        <Modal.Title>Edit Assessment Question</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form onSubmit ={handleSubmit}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>Question</Form.Label>
                <ReactQuill
                    theme = "snow"
                    value={questionState}
                    onChange={setQuestion}
                    />
            </Form.Group>
            <Button variant="warning" size="lg" type='submit'>
            Update Question
            </Button> 
            <Button variant="danger" size="lg" type='submit' onClick ={onDeleteHandler}>Delete</Button>
            </Form>
        </Modal.Body>
    </Modal>
    </div>
  )
}

export default EditAssessment