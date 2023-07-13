import React, {useEffect, useState} from 'react'
import { Button, Container } from 'react-bootstrap'
import { NavLink, useParams } from 'react-router-dom'
import EditCourse from '../components/Admin/EditCourse'
import AddLesson from '../components/Admin/AddLesson'
import LessonComp from '../components/Admin/LessonComp'

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
        console.log(data)
        setCourse(data)
    }

  return (
   <div>{course? (
    <Container>
     <h2>{course.title}</h2>
            <div dangerouslySetInnerHTML={{ __html: course.description }}></div>
            <Button
      style={{marginBottom:"10px"}}
      variant="outline-secondary" 
      size="lg"
      onClick = {handleEditModalOpen}
      >
            Edit Course
    </Button>
    <EditCourse
        show = {editModalState}
        handleClose = {handleEditModalClose}
        course ={course}/>
    <Button
      style={{marginBottom:"10px"}}
      variant="outline-secondary" 
      size="lg"
      onClick = {handleAddLessonOpen}
      >
            Add Lesson
    </Button>
    <AddLesson
        show = {addLessonState}
        handleClose={handleAddLessonClose}
        course={course}/>

          <h3>Lessons:</h3>
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