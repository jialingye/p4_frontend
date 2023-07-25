import React, {useState, useEffect, useContext} from 'react'
import Container from 'react-bootstrap/esm/Container'
import { NavLink, useParams } from 'react-router-dom'
import Offcanvas from 'react-bootstrap/Offcanvas';  
import './Course.css'
import { Badge, Button, Col, ListGroup, Row } from 'react-bootstrap'
import { AuthContext } from '../context/AuthContext'
import LessonBar from '../components/Listing/LessonBar';
import SaveButton from '../components/Listing/SaveButton';
import CourseProgress from '../components/Listing/CourseProgress';



const CoursePage = () => {
    let {id} = useParams()
    const auth= useContext(AuthContext)
    
    let [course, setCourse] = useState(null)
    let [enrollState, setEnrollState] = useState (false)
    let [errorState, setErrorState] = useState(null)
   

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    useEffect(()=>{
        getCourse()
        
    }, [id, auth.userId])

    let getCourse = async()=> {
        //let response = await fetch(`https://aicademybackend.onrender.com/courses/${id}/`)
        let response = await fetch(`http://127.0.0.1:8000/courses/${id}/`)
        let data = await response.json();
        //console.log(data)
        setCourse(data)
        setEnrollState(data.students.some((student)=>student===auth.userId))

    }

    

    
    let handleEnroll = async(event)=>{
      event.preventDefault();
        const asso= {
            asso: 'add'
        }
        try{

          const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(asso)
        };
        
        //const response = await fetch(`https://aicademybackend.onrender.com/courses/${id}/students/${auth.userId}/`, options);
        const response = await fetch(`http://127.0.0.1:8000/courses/${id}/students/${auth.userId}/`, options);
        const data= await response.json();
        
        if(response.status !== 200){
          setErrorState('Please log in to enroll course')
        } else {
          setCourse((prevCourse) => ({
            ...prevCourse,
            students: [...prevCourse.students, auth.userId]
          }));
          setEnrollState(true)
        }
        
        
        } catch(error) {
          console.error('error', error)
          setErrorState('Please log in to enroll course')
          console.log(errorState)
        }
        
    }
    
    let handleUnenroll = async(event)=>{
      event.preventDefault();
        const asso= {
            asso: 'remove'
        }
        try {
          const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(asso)
        };
        //const response = await fetch(`https://aicademybackend.onrender.com/courses/${id}/students/${auth.userId}/`, options);
        const response = await fetch(`http://127.0.0.1:8000/courses/${id}/students/${auth.userId}/`, options);
        const data= await response.json();
        console.log(data)
        setCourse((prevCourse) => ({
          ...prevCourse,
          students: prevCourse.students.filter((student) => student !== auth.userId),
        }));
        setEnrollState(false)
        } catch (error){
          console.error('error', error)
        }
        
    }
    

  return (
    <div>{course? (
    <Container>
     <div style={{marginTop:'10px'}}>
      <Row>
        <Col sm={8} lg={8}>
          <h1 style={{color:'white', fontFamily: "'Roboto'"}}>{course.title}</h1>
          
          <h6 style={{color:'#98bf64'}}>{course.students.length} Enrolled</h6>
          <div style={{display:'flex'}}>
          <Badge bg="dark" style={{color:'#98bf64', border:'2px solid #98bf64', borderRadius:'1em'}}>{course.tag}</Badge>
          <SaveButton course={course} studentId={auth.userId}/>
          </div>

        </Col>
        <Col sm={4} lg={4} style={{display:'flex', flexDirection:'column', justifyContent:'space-around'}}>
          <Button variant="outline-success" className='course-button' onClick={handleShow}>
            Lessons
          </Button>
          {enrollState?
          (<Button variant="outline-success" className='course-button' onClick={handleUnenroll}>
          Unenroll
        </Button>):(<Button variant="outline-success" className='course-button' onClick={handleEnroll}>
          Enroll
        </Button>)}
         {errorState && <div style={{color:'red'}}>{errorState}</div>}
        </Col>
      </Row>
      <Row>
      
      </Row>
      
     <hr></hr>
     <div className='course-background'>
     <div dangerouslySetInnerHTML={{ __html: course.description }}></div>
     </div>
            <hr></hr>
            <Offcanvas show={show} onHide={handleClose}>
              <Offcanvas.Header closeButton>
                <Offcanvas.Title style={{color:'#98bf64'}}>Lessons</Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body style={{marginTop:'-15px'}}>
                <ListGroup >
                <div>
                <CourseProgress course={course} studentId={auth.userId} enroll={enrollState}/>
                </div>
                  {course.lessons.map((lesson) => (
                    <NavLink to={`/courses/${course.id}/lessons/${lesson.id}?enrollState=${enrollState}`} style={{textDecoration:'none'}}>
                    
                    <ListGroup.Item action key={lesson.id} style={{margin:'10px', borderRadius: '1em'}}>
                      {lesson.title}
                      <LessonBar 
                        lesson={lesson} 
                        studentId={auth.userId} 
                        enroll={enrollState}
                        />
                      </ListGroup.Item>
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