import React, { useEffect, useState } from 'react'
import { Card, Row } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'


const CreatedCourse = ({course, studentId}) => {
    const [courseCreatedState, setCourseState] = useState(null)
    let courseCreated
    let displayCourse
    useEffect(()=>{
         courseCreated = course.filter((course)=>course.students.some((student)=>student === studentId))
            if (courseCreated.length !== 0) {
                setCourseState(courseCreated)
            }
    }, [course,studentId])

    if(courseCreatedState){
        displayCourse = courseCreatedState.map((course, index)=>(
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
              <NavLink to={`/courses/${course.id}/edit` } style={{textDecoration:"none"}} >
              <Card.Footer className={`${course.tag}`}>Edit Course</Card.Footer>
              </NavLink>
            </Card>
        ))
    }

  return (
    <div >
    {
        courseCreatedState ? (
        <Row>{displayCourse}</Row>
    ):(
     <div style={{display:'flex', flexDirection:'column'}}>
        <h1 style={{textAlign:'center',color:'#98bf64', marginTop:'300px'}}>
        NO COURSE WAS CREATED</h1>
        <NavLink to={'/courses/new'} style={{textDecoration:'none', color:'#98bf64',border:'1px solid #98bf64', borderRadius:'1em', padding:'5px'}}>CREATE A COURSE</NavLink>
     </div>
    )}
    </div>
  )
  
}

export default CreatedCourse