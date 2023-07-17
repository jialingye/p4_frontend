import React, { useEffect, useState } from 'react'
import {Col, ProgressBar, Row } from 'react-bootstrap'

const LessonBar = ({lesson, studentId, enroll}) => {
    let [progress, setProgress] = useState(0);
    let [totalScore, setTotalScore]= useState(0);
    let [totalValidScore, setTotalValidScore]= useState(0);

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
            setTotalScore(assessLen);
            setTotalValidScore(validScoreCount)

                }
            }
        }, [lesson])
    
  return (
    enroll && (
        <div style={{marginTop:'10px', paddingTop:'10px',borderTop:'1px solid #98bf64'}}>
        <Row >
            <Col lg={2}>
            {totalValidScore}/{totalScore}
            </Col>
            <Col lg={10}>
                <div style={{marginTop:'6px'}}></div>
                <ProgressBar striped variant="success" now={progress}/>
       
            </Col> 
        </Row>
        
        </div>
         
  )

  )
}

export default LessonBar