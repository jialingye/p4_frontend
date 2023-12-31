import React, {useContext, useState} from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/esm/Container';
import ReactQuill, {Quill} from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useNavigate } from 'react-router-dom';
import './Course.css'
import { AuthContext } from '../context/AuthContext';

const CourseCreate = () => {
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

    const auth=useContext(AuthContext)
    const navigate= useNavigate();
    const [titleState, setTitleState] = useState("")
    const [tagState, setTagState] = useState("")
    const [descriptionState, setDescriptionState] = useState("")

    const onChangeHandler = (e, setValue) => {
        setValue(e.target.value);
    }
    const handleSubmit = async(event) => {
        event.preventDefault();
        const createCourse= {
            instructor: auth.userId,
            title:titleState,
            tag:tagState,
            description: descriptionState,
        }

        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(createCourse)
        };
        const response = await fetch(`https://aicademybackend.onrender.com/courses/new/`, options);
        //const response = await fetch(`http://127.0.0.1:8000/courses/new/`, options);
        const data= await response.json();
        console.log(data)
        navigate(`/courses/${data.id}/edit`)
    }

  return (
    <Container>
        <Form onSubmit = {handleSubmit}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label style={{color:'white'}}>Title</Form.Label>
                    <Form.Control 
                    type="text" 
                    rows={3}
                    value={titleState}
                    onChange = {(e) => onChangeHandler(e, setTitleState)} />
                </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label style={{color:'white'}}>Categories</Form.Label>
                <Form.Control 
                    as="select" 
                    defaultValue="development"
                    value ={tagState}
                    onChange={(e) => onChangeHandler(e, setTagState)}
                    required>
                    <option value="">Choose an option</option>
                    <option value="Development">Development</option>
                    <option value="Language">Language</option>
                    <option value="Finance & Bussiness">Finance & Bussiness</option>
                    <option value="Software & Technology">Software & Technology</option>
                    <option value="Art & Design">Art & Design</option>
                    <option value="Lifestyle">Lifestyle</option>
                    <option value="Health & Fitness">Health & Fitness</option>
                    <option value="Academy">Academy</option>
                </Form.Control>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label style={{color:'white'}}>Courses Instruction</Form.Label>
                <div style={{backgroundColor:'white'}}>
                <ReactQuill
                    theme = "snow"
                    value={descriptionState}
                    onChange={setDescriptionState}
                    modules={{ toolbar: toolbarOptions }}
                    style={{minHeight:'300px'}}
                    className='quill-container'
                    />
                </div>
            </Form.Group>
            <div className="mb-2">
                <Button variant="outline-success" className='course-button' size="lg" type = "submit">
                    Create Course
                </Button>
            </div>
        </Form>
    </Container>
  )
}

export default CourseCreate