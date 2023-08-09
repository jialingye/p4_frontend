import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import ReactQuill from 'react-quill';

const AddAssessment = ({show, handleClose, lesson}) => {
    const [questionState, setQuestion] = useState(``);

    const handleSubmit = async(event) => {
        event.preventDefault();
        const addQuestion = {
            question: questionState,
        }

        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(addQuestion),
        };

        console.log(lesson.id, addQuestion)

        const responseData = await fetch(`https://aicademybackend.onrender.com/lessons/${lesson.id}/assessments/new/`, options);
        //const responseData = await fetch(`http://127.0.0.1:8000/lessons/${lesson.id}/assessments/new/`, options);

        const addQuestionData = await responseData.json();
        console.log(addQuestionData);
        handleClose();
        window.location.reload();
    }


  return (
   <div>
       <Modal  show={show} onHide={handleClose}>
        <Modal.Header closeButton onClick={()=>handleClose()}>
          <Modal.Title>Add Assessment Question</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit ={handleSubmit}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>Question</Form.Label>
                <ReactQuill
                    theme = "snow"
                    value={questionState}
                    onChange={setQuestion}
                    className='quill-container'
                    />
            </Form.Group>
            <Button variant="warning" size="lg" type='submit'>
           Add Assessment
          </Button> 
            </Form>
        </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default AddAssessment