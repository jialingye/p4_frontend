import React, {useState, useEffect} from 'react'
import ListItem from '../components/Listing/ListItem'
import Container from 'react-bootstrap/esm/Container'
import { Row } from 'react-bootstrap'

const CourseList = () => {
    let [courses, setCourses] = useState([])
    let coursesData
    useEffect(() => {
        getCourses()
    }, [])

    let getCourses = async() =>{
        let response = await fetch('/courses/')
        let data = await response.json()
        console.log('DATA', data)
        setCourses(data)
    }
    if(courses){
         coursesData = courses.map((course, index) => (
        <ListItem key= {index} course={course}/>
    ))
}
  return (
    <Container>   
        <Row xs={1} md={4} style={{display:'flex', flexWrap:'wrap'}}>
        {coursesData}
        </Row>
    </Container>
  )
}

export default CourseList