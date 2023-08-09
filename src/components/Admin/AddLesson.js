import React, { useState, useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import ReactQuill, {Quill} from 'react-quill';


const AddLesson = ({show,handleClose,course}) => {
    const ColorPicker = Quill.import('ui/color-picker');
    Quill.register(ColorPicker, true);
    const toolbarOptions = [
        ['bold', 'italic', 'underline', 'strike'],
        ['blockquote', 'code-block'],
        [{ 'header': 1 }, { 'header': 2 }],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        [{ 'script': 'sub' }, { 'script': 'super' }],
        [{ 'indent': '-1' }, { 'indent': '+1' }],
        [{ 'direction': 'rtl' }],
        [{ 'size': ['small', false, 'large', 'huge'] }],
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        [{ 'color': [] }, { 'background': [] }],
        [{ 'font': [] }],
        [{ 'align': [] }],
        ['link', 'image', 'video'],
        ['clean']
      ];

    const [numberState, setNumber]=useState(null)
    const [partialState, setPartial]=useState('')
    const [titleState, setTitle] = useState(``);
    const [materialState, setMaterialState] = useState(``);
    const [fullscreen, setFullscreen] = useState(true);
 
    useEffect(()=> {
        setTitle( `Lesson ${numberState}: ${partialState}`);
    }, [numberState,partialState]);

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

    
       const responseData = await fetch(`https://aicademybackend.onrender.com/courses/${course.id}/lessons/new/`, options);
        //const responseData = await fetch(`http://127.0.0.1:8000/courses/${course.id}/lessons/new/`, options);

        const addLessonData = await responseData.json();
        // console.log(addLessonData);
        handleClose();
        window.location.reload();
    }


  return (
    <Container>
       <Modal  fullscreen={fullscreen} show={show} onHide={handleClose}>
        <Modal.Header closeButton onClick={()=>handleClose()}>
          <Modal.Title>Add Lesson</Modal.Title>
        </Modal.Header>
        <div style={{width:'70%', overflow:'auto'}}>
        <Modal.Body>
          <Form onSubmit ={handleSubmit}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Title</Form.Label>
              <Row>
                <Col lg={2}>
                <Form.Control
                type="number"
                placeholder="Lesson 1"
                autoFocus
                value = {numberState}
                onChange ={(e) => onChangeHandler(e,setNumber)}
              />
                </Col>
                :
                <Col lg={9}>
                <Form.Control
                type="text"
                placeholder="Title"
                autoFocus
                value = {partialState}
                onChange ={(e) => onChangeHandler(e,setPartial)}
              />
                </Col>
              </Row>
              
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label></Form.Label>
                <ReactQuill
                    theme = "snow"
                    value={materialState}
                    onChange={setMaterialState}
                    modules={{ toolbar: toolbarOptions }}
                    className='quill-container'
                    />
            </Form.Group>
            <Button variant="warning" size="lg" type='submit'>
           Add Lesson
          </Button> 
            </Form>
        </Modal.Body>
        </div>
     
      </Modal>
    </Container>
  )
}

export default AddLesson