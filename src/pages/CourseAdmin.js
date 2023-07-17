import React, {useEffect, useState} from 'react'
import { Button, Container } from 'react-bootstrap'
import { NavLink, useParams } from 'react-router-dom'
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
        let response = await fetch(`/courses/${id}`)
        let data = await response.json();
        setCourse(data)
    }

  return (
   <div>{course? (
    <Container>
        <div style={{marginTop:'30px', marginBottom:'30px'}}>
            <h2 style={{color:'white', fontFamily: "'Roboto'"}}>
                {course.title}
            </h2>
        </div>

        <div>
            <Button
            style={{marginBottom:"10px", marginRight:'20px'}}
            variant="outline-warning" 
            size="lg"
            onClick = {handleEditModalOpen}
            >
                    Edit Course
            </Button>
            <Button
            style={{marginBottom:"10px"}}
            variant="outline-primary" 
            size="lg"
            onClick = {handleAddLessonOpen}
            >
                    Add Lesson
            </Button>
        </div>
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