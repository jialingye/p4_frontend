import { Accordion, Button, Col, Row } from 'react-bootstrap'
import React, {useState, useEffect} from 'react'
import Container from 'react-bootstrap/esm/Container'
import { NavLink, useParams } from 'react-router-dom'
import StudentInput from '../components/Assessment/StudentInput'
import './Course.css'



const LessonPage = () => {
    let {courseId, lessonId} = useParams()
    let [lesson, setLesson] = useState(null)

    useEffect(()=>{
        getLesson()
    }, [])

    let getLesson = async()=> {
        let response = await fetch(`/courses/${courseId}/lessons/${lessonId}`)
        let data = await response.json();
        console.log(data)
        setLesson(data)
    }
  return (
    <div>{lesson? (
            <Container fluid style={{width:'90%'}}>
                <h1 style={{color:'beige', fontFamily: "'Bebas Neue'"}}>{lesson.title}</h1>
                <Row>
                    <Col lg={8} sm={8}>
                        <div className='lesson-material'>
                            <div dangerouslySetInnerHTML={{ __html: lesson.material }}></div>
                        </div>
                    </Col>
                    <Col lg={4} sm={4}>
                        <Accordion>
                            {lesson.assessments.map((assessment, index) => (
                            <>
                            <Accordion.Item eventKey={assessment.id}>
                            <Accordion.Header>Question {index+1}</Accordion.Header>
                            <Accordion.Body> 
                            <div dangerouslySetInnerHTML={{ __html: assessment.question }}></div>
                                <StudentInput assessment={assessment}/>
                                </Accordion.Body>
                            
                            </Accordion.Item>
                            </>
                            ))}
                        </Accordion>
                    </Col>
                 </Row>
            </Container>
        ):(
            <h2>Loading</h2>
        )}</div>
      )
}

export default LessonPage