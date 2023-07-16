import React, {useState, useEffect} from 'react'
import Container from 'react-bootstrap/esm/Container'
import { NavLink, useParams } from 'react-router-dom'
import Offcanvas from 'react-bootstrap/Offcanvas';  
import './Course.css'
import { Badge, Button, Col, ListGroup, Row } from 'react-bootstrap'


const CoursePage = () => {
    let {id} = useParams()
    let [course, setCourse] = useState(null)

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

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
      <Row>
        <Col sm={8} lg={8}>
          <h1 style={{color:'white', fontFamily: "'Roboto'"}}>{course.title}</h1>
        </Col>
        <Col sm={4} lg={4} style={{display:'flex', flexDirection:'column', justifyContent:'space-around'}}>
          <Button variant="outline-success" onClick={handleShow}>
            Lessons
          </Button>
          <br></br>
          <Button variant="outline-success" onClick={handleShow}>
            Enroll
          </Button>
        </Col>
      </Row>
      <Badge bg="dark" style={{color:'#98bf64', border:'2px solid #98bf64', borderRadius:'1em'}}>{course.tag}</Badge>
     <hr></hr>
     <div className='course-background'>
     <div dangerouslySetInnerHTML={{ __html: course.description }}></div>
     </div>
            <hr></hr>
            <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title style={{color:'#98bf64'}}>Lessons</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ListGroup >
            {course.lessons.map((lesson) => (
                
              <NavLink to={`/courses/${course.id}/lessons/${lesson.id}`} style={{textDecoration:'none'}}>
              <ListGroup.Item action key={lesson.id} style={{margin:'10px', borderRadius: '1em'}}>{lesson.title}</ListGroup.Item>
              </NavLink>
            ))}
          </ListGroup>
        </Offcanvas.Body>
      </Offcanvas>
          
          </div>
    </Container>
    ):(
        <h2>Loading</h2>
    )}</div>
  )
}

export default CoursePage