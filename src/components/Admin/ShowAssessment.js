import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion';

const ShowAssessment = ({course, lesson}) => {
    const [questionState, setQuestion]= useState('')

    const assessment = lesson.assessments.map((assessment, index) =>{
        console.log('Rendering lesson:', index);
        return (
            <Accordion key={index}>
        <Accordion.Item eventKey={index.toString()} >
        <Accordion.Header>Assessment {index}</Accordion.Header>
        <Accordion.Body>
            <div dangerouslySetInnerHTML={{ __html: assessment.question }}></div>
        </Accordion.Body>
        </Accordion.Item>
    </Accordion>
        )})
  return (
    <div>{assessment}</div>
  )
}

export default ShowAssessment