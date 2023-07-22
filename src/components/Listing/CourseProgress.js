import React, { useEffect, useState } from 'react'
import { Col, ProgressBar, Row } from 'react-bootstrap';



const CourseProgress = ({course, studentId, enroll}) => {
    let [progress, setProgress] = useState(0);
    let [totalValidCountState, setTotalValidCountState] = useState(0)
    let [totalValidScoreState, setTotalValidScoreState] = useState(0)

    let totalAssessments= 0
    if(course){
      for (let i = 0; i < course.lessons.length; i++){
        let eachLessonAssessments = course.lessons[i].assessments.length;
        totalAssessments += eachLessonAssessments
     }
    }


    useEffect(()=>{
        let totalValidCount = 0
        let totalValidScore = 0
        course?.lessons.forEach((lesson)=>{
            let validCount = 0
            let validScore = 0
            for(const assessment of lesson.assessments){
                const studentScores = assessment.scores.filter((score)=>score.student===studentId)
                if (studentScores.length===0) {
                    validScore += 0
                    validCount += 0
                } else {
                    const validScores= studentScores.filter((score)=>score.score>5);
                    validScore += validScores[0]?.score || 0
                    validCount += validScores.length;
                }
            }
            totalValidCount += validCount
            totalValidScore += validScore
        }
        )
        setTotalValidCountState(totalValidCount)
        console.log('💀',totalValidCount)
        setTotalValidScoreState(totalValidScore)
        setProgress((totalValidCount/totalAssessments)*100)
    }, [])

  return (
    enroll && <div>
        <Row>
        <Col lg={10}>
        <h6 style={{color:'#98bf64'}}>Course Progress</h6>
        </Col>
        <Col lg={1}>
            <p style={{color:'#98bf64'}}> {totalValidScoreState}/{totalAssessments*10}</p>
            </Col>
        </Row>
        <Row style={{marginTop:'-10px'}}>
        <Col lg={2} >
               {totalValidCountState}/{totalAssessments}
       
            </Col>
           
            <Col lg={10}>
                <div style={{marginTop:'5px'}}></div>
                <ProgressBar variant="success" now={progress} label={`${progress.toFixed(1)}%`}/>
       
            </Col> 
        </Row>
    </div>
    
  )
}

export default CourseProgress