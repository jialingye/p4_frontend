import { useState } from 'react';
import { Button } from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion';
import { NavLink } from 'react-router-dom';
import EditLesson from './EditLesson';
import AddAssessment from './AddAssessment';
import ShowAssessment from './ShowAssessment';


const LessonComp = ({course}) => {
   // Edit Course State
   const [editModalState, setEditModal] = useState(null);
   // Set State Function
   const handleEditModalOpen = (index) => 
   {console.log('Opening edit modal for index:', index);
    setEditModal(index)};
   const handleEditModalClose = () => setEditModal(null);

    // Edit Course State
    const [addModalState, setAddModal] = useState(null);
    // Set State Function
    const handleAddModalOpen = (index) => 
    {console.log('Opening edit modal for index:', index);
    setAddModal(index)};
    const handleAddModalClose = () => setAddModal(null);
  
   const lesson = course.lessons.map((lesson, index) =>{
    console.log('Rendering lesson:', index);
    return( 
   <Accordion key={index}>
        <Accordion.Item eventKey={index.toString()} >
        <Accordion.Header>{lesson.title}</Accordion.Header>
        <Accordion.Body>
            <Button
                style={{marginBottom:"10px"}}
                variant="outline-secondary" 
                size="sm"
                onClick = {()=>handleEditModalOpen(index)}
                >
                Edit Lesson
            </Button>
            {editModalState=== index && (
                <>
                {console.log(editModalState)}
                <EditLesson
                show = {editModalState===index}
                handleClose = {handleEditModalClose}
                lesson ={lesson}/>
                </>
            )}
               <Button
                style={{marginBottom:"10px"}}
                variant="outline-secondary" 
                size="sm"
                onClick = {()=>handleAddModalOpen(index)}
                >
                Add Assessment
            </Button>
            {addModalState=== index && (
                <>
                {console.log(addModalState)}
                <AddAssessment
                show = {addModalState===index}
                handleClose = {handleAddModalClose}
                lesson ={lesson}/>
                </>
            )}
            <div dangerouslySetInnerHTML={{ __html: lesson.material }}></div>
            <ShowAssessment lesson={lesson} course={course}/>
        </Accordion.Body>
        </Accordion.Item>
    </Accordion>
   )
   })
  return (
    <div>
         {lesson}
    
  </div>
  )
}

export default LessonComp