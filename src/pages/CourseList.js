import React, {useState, useEffect} from 'react'
import ListItem from '../components/Listing/ListItem'
import Container from 'react-bootstrap/esm/Container'
import { Row } from 'react-bootstrap'
import SecNav from '../components/Navbar/SecNav'

const CourseList = () => {
    let [courses, setCourses] = useState([])
    let [selectTag, setSelectTag] = useState(null)
    let [titleSearch, setTitleSearch] = useState('')
    
    const handleTagSelect = (tag) => {
        setSelectTag(tag);
    }

    const handleTitleSearch = (query) => {
        setTitleSearch(query.toString());
    }
    let coursesData
    useEffect(() => {
        getCourses()
    }, [])

    let getCourses = async() =>{
        //let response = await fetch('https://aicademybackend.onrender.com/courses/')
        let response = await fetch('http://127.0.0.1:8000/courses/')
        let data = await response.json()
        console.log('DATA', data)
        setCourses(data)
    }
    if(courses){
        const filteredCourses = selectTag 
        ? courses.filter((course)=>course.tag === selectTag)
        : courses;

        const searchResult = filteredCourses.filter((course)=> 
        course.title.toLowerCase().includes(titleSearch.toLowerCase()))

         coursesData = searchResult.map((course, index) => (
        <ListItem key= {index} course={course}/>
    ))
}
  return (
    <Container fluid style={{marginTop:'-35px'}}>   
        <SecNav  onTagSelect={handleTagSelect} onTitleSearch={handleTitleSearch}/>
        <Row xs={1} md={4} style={{display:'flex', flexWrap:'wrap'}}>
        {coursesData}
        </Row>
    </Container>
  )
}

export default CourseList