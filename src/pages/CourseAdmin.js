import React, {useEffect, useState} from 'react'
import { Badge, Button, Col, Container, Row } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import EditCourse from '../components/Admin/EditCourse'
import AddLesson from '../components/Admin/AddLesson'
import LessonComp from '../components/Admin/LessonComp'
import './Course.css'


const CourseAdmin = () => {

    let {id} = useParams()
    let [course, setCourse] = useState(null)

    // Edit Course State
    const [editModalState, setEditModal] = useState(false);
    // Set State Function
    const handleEditModalOpen = () => setEditModal(true);
    const handleEditModalClose = () => setEditModal(false);

    // Edit Course State
    const [addLessonState, setAddLessonModal] = useState(false);
    // Set State Function
    const handleAddLessonOpen = () => setAddLessonModal(true);
    const handleAddLessonClose = () => setAddLessonModal(false);

    useEffect(()=>{
        getCourse()
    }, [])

    let getCourse = async()=> {
        let response = await fetch(`https://aicademybackend.onrender.com/courses/${id}`)
        //let response = await fetch(`http://127.0.0.1:8000/courses/${id}`)
        let data = await response.json();
        setCourse(data)
    }

  return (
   <div>{course? (
    <Container>
        <Row>
            <Col lg={10}>
                <div style={{ marginBottom:'30px'}}>
                <h2 style={{color:'white', fontFamily: "'Roboto'"}}>
                    {course.title}
                </h2>
                <Badge bg="dark" style={{color:'#98bf64', border:'2px solid #98bf64', borderRadius:'1em'}}>{course.tag}</Badge>
                </div>
            </Col>
            <Col lg={2} style={{display:'flex', flexDirection:'column', justifyContent:'space-around'}}>
                <Button
                style={{marginBottom:"10px"}}
                variant="outline-warning" 
                size="lg"
                onClick = {handleEditModalOpen}
                >
                        Edit Course
                </Button>
                <Button
                style={{marginBottom:"10px"}}
                variant="outline-success" 
                className='course-button'
                size="lg"
                onClick = {handleAddLessonOpen}
                >
                        Add Lesson
                </Button>
            
            </Col>
        </Row>
       
        <div className="course-background">
            <div dangerouslySetInnerHTML={{ __html: course.description }}></div>
        </div>

            <EditCourse
                show = {editModalState}
                handleClose = {handleEditModalClose}
                course ={course}/>
            <AddLesson
                show = {addLessonState}
                handleClose={handleAddLessonClose}
                course={course}/>

          <h3 style={{color:'white', fontFamily: "'Roboto'"}}>Lessons:</h3>

          <ul>
              <LessonComp course= {course}/>
          </ul>
    </Container>
    ):(
        <h2>Loading</h2>
    )}</div>

  )
}

export default CourseAdmin