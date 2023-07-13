import React, {useState} from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/esm/Container';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useNavigate } from 'react-router-dom';

const CourseCreate = () => {
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
        instructor: 1,
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
    const response = await fetch(`http://127.0.0.1:8000/courses/new/`, options);
    const data= await response.json();
    console.log(data)
    navigate(`/courses/${data.id}/edit`)
}

  return (
    <Container>
        <Form onSubmit = {handleSubmit}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Title</Form.Label>
                    <Form.Control 
                    type="text" 
                    rows={3}
                    value={titleState}
                    onChange = {(e) => onChangeHandler(e, setTitleState)} />
                </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
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
                    />
            </Form.Group>
            <div className="mb-2">
                <Button variant="secondary" size="lg" type = "submit">
                    Create Course
                </Button>
            </div>
        </Form>
    </Container>
  )
}

export default CourseCreate