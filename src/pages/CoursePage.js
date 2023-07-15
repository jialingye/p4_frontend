import React, {useState, useEffect} from 'react'
import Container from 'react-bootstrap/esm/Container'
import { NavLink, useParams } from 'react-router-dom'
import './Course.css'
import { Badge, ListGroup, ListGroupItem } from 'react-bootstrap'

const CoursePage = () => {
    let {id} = useParams()
    let [course, setCourse] = useState(null)

    useEffect(()=>{
        getCourse()
    }, [])

    let getCourse = async()=> {
        let response = await fetch(`/courses/${id}/`)
        let data = await response.json();
        console.log(data)
        setCourse(data)
    }

  
  return (
    <div>{course? (
    <Container>
     <div style={{marginTop:'30px'}}>
     <h1 style={{color:'beige', fontFamily: "'Kanit'"}}>{course.title}</h1>
     <Badge bg="info">{course.tag}</Badge>
     <hr></hr>
     <div className='course-background'>
     
     <div dangerouslySetInnerHTML={{ __html: course.description }}></div>
     </div>
            <hr></hr>
          <h3 style={{color:'beige', fontFamily: "'Bebas Neue'"}}>Lessons:</h3>
          <ListGroup >
            {course.lessons.map((lesson) => (
                
              <NavLink to={`/courses/${course.id}/lessons/${lesson.id}`} style={{textDecoration:'none'}}>
              <ListGroup.Item action key={lesson.id} style={{margin:'10px', borderRadius: '1em'}}>{lesson.title}</ListGroup.Item>
              </NavLink>
            ))}
          </ListGroup>
          </div>
    </Container>
    ):(
        <h2>Loading</h2>
    )}</div>
  )
}

export default CoursePage