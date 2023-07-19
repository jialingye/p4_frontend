import React, { useEffect, useState } from 'react'
import { Card, Col, Row } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'



const EnrolledCourses = ({course, studentId}) => {
    const [courseEnrolledState, setCourseState] = useState(null)
    let courseEnrolled
    let displayCourse
    useEffect(()=>{
         courseEnrolled = course.filter((course)=>course.students.some((student)=>student === studentId))
            if (courseEnrolled.length !== 0) {
                setCourseState(courseEnrolled)
            }
    }, [course,studentId])

    if(courseEnrolledState){
         displayCourse = courseEnrolledState.map((course, index)=>(
            <Card
            key= {index}
            text={'black'}
            className = {`mb-2 list-item-dashboard ${course.tag}`}
          >
            <Card.Header className={`${course.tag}`}>{course.tag}</Card.Header>
            <Card.Body>
            <NavLink to={`/courses/${course.id}` } style={{textDecoration:"none"}} >
              <Card.Title className={`${course.tag}`} style={{textDecoration:"none"}}> {course.title} </Card.Title>
              </NavLink>
              <Card.Text>
                {course.discription}
              </Card.Text>
            </Card.Body>
            <Card.Footer className={`${course.tag}`}>{course.lessons.length} Lessons</Card.Footer>
          </Card>
            
         ))
    }
    
  return (
    <div >
    {
        courseEnrolledState ? (
        
        <Row>{displayCourse}</Row>
    ):(
     <div style={{display:'flex', flexDirection:'column',justifyContent:'center', alignItems:'center'}}>
        <h1 style={{textAlign:'center',color:'#98bf64', marginTop:'300px'}}>
        NO COURSE WAS CREATED</h1>
        <NavLink to={'/courses/new'} style={{textDecoration:'none', color:'#98bf64',border:'1px solid #98bf64', borderRadius:'1em', padding:'5px'}}>CREATE A COURSE</NavLink>
     </div>
    )}
    </div>
  )
  
}

export default EnrolledCourses