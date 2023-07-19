import { Accordion, Button, Col, ProgressBar, Row } from 'react-bootstrap'
import React, {useState, useEffect, useContext} from 'react'
import Container from 'react-bootstrap/esm/Container'
import { NavLink, useParams } from 'react-router-dom'
import StudentInput from '../components/Assessment/StudentInput'
import './Course.css'
import { AuthContext } from '../context/AuthContext'



const LessonPage = () => {

    const auth = useContext(AuthContext)
    const tickmark = "\u2611"
    const studentId = auth.userId
    let {courseId, lessonId} = useParams()
    const enrollState = new URLSearchParams(window.location.search).get('enrollState');
    let [lesson, setLesson] = useState(null)
    let [progress, setProgress] = useState(0);
    let [totalScore, setTotalScore]= useState(0);
    let [totalValidScore, setTotalValidScore]= useState(0);
    
    
    useEffect(()=>{
        getLesson()
    }, [lessonId, studentId])

    let getLesson = async()=> {
        let response = await fetch(`http://127.0.0.1:8000/courses/${courseId}/lessons/${lessonId}`)
        let data = await response.json();
        setLesson(data)
    }

    useEffect(()=>{
        if(lesson){
            let assessLen = lesson.assessments.length
            let validScoreCount = 0;
            let totalScore = assessLen*10
            let totalValidScore = 0

            for (const assessment of lesson.assessments){
                const studentScores = assessment.scores.filter((score)=>score.student===studentId)
                if (studentScores.length===0) {
                    totalValidScore += 0
                    validScoreCount += 0
                } else {
                    const validScores= studentScores.filter((score)=>score.score>5);
                    totalValidScore += validScores[0].score
                    validScoreCount += validScores.length;
                }
            
            const progress = assessLen !==0? (validScoreCount/assessLen)*100:0;

            setProgress(progress);
            setTotalScore(totalScore);
            setTotalValidScore(totalValidScore)

                }
            }
        }, [lesson])


  return (
    <div>{lesson? (
            <Container fluid style={{width:'90%'}}>
                
                <Row style={{marginTop:'30px'}}>
                    <Col lg={8} sm={8} style={{backgroundColor:'white', borderRadius:'1em', marginTop:'5px', paddingBottom:'30px'}}>
                        <h1 style={{color:'Black', fontFamily: "'Roboto'", marginTop:'10px', marginButtom:'10px'}}>{lesson.title}</h1>
                        <div className='lesson-material' style={{boxShadow:"0 0 5px #98bf64"}}>
                            <div dangerouslySetInnerHTML={{ __html: lesson.material }}></div>
                        </div>
                    </Col>
                    <Col lg={4} sm={4}>
                        <div style={{marginBottom:'10px'}}>
                        <h5 style={{color:'White', fontFamily: "'Roboto'"}}>Scores: {totalValidScore}/{totalScore}</h5>
                        <ProgressBar striped variant="success" now={progress} />
                        </div>
                        <Accordion>
                            {lesson.assessments.map((assessment, index) => (
                            <>
                            <Accordion.Item eventKey={assessment.id}>
                            <Accordion.Header>Question {index+1} {assessment.scores.filter((score)=>score.student===studentId)[0]?.score >=5 ? tickmark: <></>}</Accordion.Header>
                            <Accordion.Body> 
                            <div dangerouslySetInnerHTML={{ __html: assessment.question }}></div>
                                <StudentInput assessment={assessment} studentId={studentId} enrollState={enrollState}/>
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