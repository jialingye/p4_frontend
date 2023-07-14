import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import ReactQuill, {Quill} from 'react-quill';
import 'react-quill/dist/quill.snow.css';


const EditLesson = ({show,handleClose,lesson}) => {
    const [titleState, setTitle] = useState(`${lesson.title}`);
    const [materialState, setMaterialState] = useState(`${lesson.material}`);
    const [fullscreen, setFullscreen] = useState(true);

    useEffect(() => {
        const ColorPicker = Quill.import('ui/color-picker');
        Quill.register(ColorPicker, true);
      }, []);

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

    const onChangeHandler = (e,setValue) =>{
        //console.log(e.target.value)
        setValue(e.target.value);
    }

    const handleSubmit = async(event) => {
        event.preventDefault();
        const updatedLesson = {
            title: titleState,
            material: materialState,
        }

        const options = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedLesson),
        };

    
       //const responseData = await fetch(`http://localhost:4000/user/${profile._id}`, options);
        const responseData = await fetch(`http://127.0.0.1:8000/lessons/${lesson.id}/update/`, options);

        const updatedLessonData = await responseData.json();
        console.log(updatedLessonData);
        handleClose();
        window.location.reload();
    }

  return (
    <div><Modal  fullscreen={fullscreen} show={show} onHide={handleClose}>
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
            <ReactQuill
                theme = "snow"
                value={materialState}
                onChange={setMaterialState}
                modules={{ toolbar: toolbarOptions }}
                />
        </Form.Group>
        <Button variant="warning" size="lg" type='submit'>
       Update Lesson
      </Button> 
        </Form>
    </Modal.Body>
    <Modal.Footer>
    </Modal.Footer>
  </Modal>
</div>
  )
}

export default EditLesson