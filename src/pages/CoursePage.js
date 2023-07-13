import React, {useState, useEffect} from 'react'
import Container from 'react-bootstrap/esm/Container'
import { NavLink, useParams } from 'react-router-dom'

const CoursePage = () => {
    let {id} = useParams()
    let [course, setCourse] = useState(null)

    useEffect(()=>{
        getCourse()
    }, [])

    let getCourse = async()=> {
        let response = await fetch(`/courses/${id}`)
        let data = await response.json();
        console.log(data)
        setCourse(data)
    }

  
  return (
    <div>{course? (
    <Container>
     <h2>{course.title}</h2>
            <div dangerouslySetInnerHTML={{ __html: course.description }}></div>
          <h3>Lessons:</h3>
          <ul>
            {course.lessons.map((lesson) => (
                
              <NavLink to={`/courses/${course.id}/lessons/${lesson.id}`}>
              <li key={lesson.id}>{lesson.title}</li>
              </NavLink>
            ))}
          </ul>
    </Container>
    ):(
        <h2>Loading</h2>
    )}</div>
  )
}

export default CoursePage