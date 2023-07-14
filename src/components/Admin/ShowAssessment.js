import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion';
import EditAssessment from './EditAssessment';

const ShowAssessment = ({course, lesson}) => {
    // Edit Course State
   const [editAssessState, setEditAssess] = useState(null);
   // Set State Function
   const handleEditAssessOpen = (index) => setEditAssess(index);
   const handleEditAssessClose = () => setEditAssess(null);
    

    const assessment = lesson.assessments.map((assessment, index) =>{
        console.log('Rendering lesson:', index);
        return (
        <Accordion key={index}>
            <Accordion.Item eventKey={index.toString()} >
            <Accordion.Header>Assessment {index+1}</Accordion.Header>
            <Accordion.Body>
                <div dangerouslySetInnerHTML={{ __html: assessment.question }}></div>
                <Button
                    style={{marginBottom:"10px"}}
                    variant="outline-secondary" 
                    size="sm"
                    onClick = {()=>handleEditAssessOpen(index)}
                    >
                    Edit
                </Button>
                
                {editAssessState=== index && (
                    <>
                    <EditAssessment
                    show = {editAssessState === index}
                    handleClose = {handleEditAssessClose}
                    assessment ={assessment}/>
                    </>
                )}
            </Accordion.Body>
            </Accordion.Item>
        </Accordion>
        )})
  return (
    <div>{assessment}</div>
  )
}

export default ShowAssessment