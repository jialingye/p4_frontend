import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import ReactQuill, {Quill} from 'react-quill';


const EditCourse = ({show,handleClose,course}) => {
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

    const [titleState, setTitle] = useState(`${course.title}`);
    const [tagState, setTagState] = useState(`${course.tag}`);
    const [descriptionState, setDescriptionState] = useState(`${course.description}`);
    const [fullscreen, setFullscreen] = useState(true);

    //onchange handler
    const onChangeHandler = (e,setValue) =>{
        //console.log(e.target.value)
        setValue(e.target.value);
    }

    const handleSubmit = async(event) => {
        event.preventDefault();
        const updatedCourse = {
            title: titleState,
            tag: tagState,
            description: descriptionState,
        }

        const options = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedCourse),
        };

    
       //const responseData = await fetch(`http://localhost:4000/user/${profile._id}`, options);
        const responseData = await fetch(`http://127.0.0.1:8000/courses/${course.id}/update/`, options);

        const updatedCourseData = await responseData.json();
        console.log(updatedCourseData);
        handleClose();
        window.location.reload();
    }


  return (
    <div>
       <Modal  fullscreen={fullscreen} show={show} onHide={handleClose}>
        <Modal.Header closeButton onClick={()=>handleClose()}>
          <Modal.Title>Edit Course</Modal.Title>
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
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Categories</Form.Label>
              <Form.Control 
                    as="select" 
                    defaultValue="development"
                    value ={tagState}
                    onChange={(e) => onChangeHandler(e, setTagState)}
                    required>
                    <option value="">Choose an option</option>
                    <option value="Development">Development</option>
                    <option value="Language">Language</option>
                    <option value="Finance & Accounting">Finance & Accounting</option>
                    <option value="Software">Software</option>
                    <option value="Personal Development">Personal Development</option>
                    <option value="Design">Design</option>
                    <option value="Lifestyle">Lifestyle</option>
                    <option value="Photography & Video">Photography & Video</option>
                    <option value="Health & Fitness">Health & Fitness</option>
                    <option value="Music">Music</option>
                    <option value="Teaching & Academy">Teaching & Academy</option>
             </Form.Control>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>Description</Form.Label>
                <ReactQuill
                    theme = "snow"
                    value={descriptionState}
                    onChange={setDescriptionState}
                    modules={{ toolbar: toolbarOptions }}
                    />
            </Form.Group>
            <Button variant="warning" size="lg" type='submit'>
           Update Profile
          </Button> 
            </Form>
        </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default EditCourse