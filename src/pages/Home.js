import React, { useEffect, useState } from 'react'
import SecNav from '../components/Navbar/SecNav'
import { Carousel, Container, Row } from 'react-bootstrap'
import ListItem from '../components/Listing/ListItem'
import Image1 from "../components/Home/Image1.jpg"
import Image2 from '../components/Home/Image2.png'
import Image3 from '../components/Home/Image3.jpg'
import { Image } from 'react-bootstrap';

const Home = () => {
    let [courses, setCourses] = useState(null)
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
        let response = await fetch('https://aicademybackend.onrender.com/courses/')
        //let response = await fetch('http://127.0.0.1:8000/courses/')
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
     <Container>
    <Carousel>
      <Carousel.Item>
      <Image src={Image1} alt="First slide" />
        <Carousel.Caption style={{color:'black', marginRight:'30%', marginBottom:'10%'}}>
          <h3>Explore your future</h3>
          <p>Where can learning take you? Discover the possibilities with a course.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
      <Image src={Image2} alt="First slide" />
        <Carousel.Caption style={{color:'black',marginRight:'30%', marginBottom:'10%'}}>
          <h3>Unlock the AI Frontier</h3>
          <p>Unleash the Power of Artificial Intelligence.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
      <Image src={Image3} alt="First slide" />
        <Carousel.Caption style={{color:'black',marginRight:'30%', marginBottom:'10%'}}>
          <h3 >Empower Your Journey </h3>
          <p>
          Unleash Your Potential with Lifelong Learning.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>   
    </Container>
    {courses ? (
      <Container > 
        <Row xs={1} md={4} style={{display:'flex', flexWrap:'wrap'}}>
        {coursesData}
        </Row>
    </Container>
    ):(
      <h1 style={{color:'white', textAlign:'center'}}>Loading...</h1>
    )
  }
    
    </Container>
  )
}

export default Home