import { Button } from 'react-bootstrap'
import React, {useState, useEffect} from 'react'
import Container from 'react-bootstrap/esm/Container'
import { NavLink, useParams } from 'react-router-dom'
import StudentInput from '../components/Assessment/StudentInput'



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
            <Container>
                <h2>{lesson.title}</h2>
                <div dangerouslySetInnerHTML={{ __html: lesson.material }}></div>
              <ul>
            {lesson.assessments.map((assessment) => (
            <>
            
              <li key={assessment.id}>
                {assessment.question}</li>
              <StudentInput assessment={assessment}/>
              </>
            ))}
          </ul>
                    
            </Container>
        ):(
            <h2>Loading</h2>
        )}</div>
      )
}

export default LessonPage