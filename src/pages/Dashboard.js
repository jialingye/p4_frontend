import React, { useContext, useEffect, useState } from 'react'
import { Container } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import { AuthContext } from '../context/AuthContext';
import EnrolledCourses from '../components/Dash/EnrolledCourses';
import CreatedCourse from '../components/Dash/CreatedCourse';
import CollectionCreated from '../components/Dash/CollectionCreated';
import CollectionSaved from '../components/Dash/CollectionSaved';


const Dashboard = () => {

const auth = useContext(AuthContext)

const [course, setCourse] = useState(null)

const [activeState, setActiveState] = useState('enrolled')
const handleSectionChange = (section)=>{
  setActiveState(section)
}

useEffect(()=> {
  if(auth.userId){
    const courseFetch = async() =>{
      try{
        const options = {
          method:'GET',
          headers: {
            "Content-Type": "application/json",
          },
        };
        const response = await fetch('https://aicademybackend.onrender.com/courses/', options);
        //const response = await fetch('http://127.0.0.1:8000/courses/', options);
        if(response.ok){
          const data = await response.json();
          setCourse(data)
        } else {
          console.log('error')
        }
      }catch(error){
        console.log(error);
      }
    }
    courseFetch();
  }
}, [auth.userId])

  return (
    <Container fluid style={{width:'90%'}} >
    <Nav justify variant="tabs" defaultActiveKey="/home" >
      <Nav.Item>
        <Nav.Link className='dash-nav' eventKey="link-0" style={{color:'#98bf64', border:'1px solid #98bf64'}} onClick={() => handleSectionChange('enrolled')}>Enrolled</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="link-1" style={{color:'#98bf64' , border:'1px solid #98bf64'}} onClick={() => handleSectionChange('created')}>Created</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="link-2" style={{color:'#98bf64' , border:'1px solid #98bf64'}} onClick={() => handleSectionChange('collection-created')}>Collection Created</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="disabled"  style={{color:'#98bf64', border:'1px solid #98bf64'}} onClick={() => handleSectionChange('saved')}>
          Collection Saved
        </Nav.Link>
      </Nav.Item>
    </Nav>
    {course? (
        <div className='dashboard-outline' style={{border:'1px solid #98bf64',borderBottomLeftRadius:'1em', borderBottomRightRadius:'1em', height:'auto'}}>
          {activeState==='enrolled' && <EnrolledCourses course={course} studentId={auth.userId}/>}
          {activeState==='created' && <CreatedCourse course={course} studentId={auth.userId}/>}
          {activeState==='collection-created' && <CollectionCreated studentId={auth.userId}/>}
          {activeState==='saved' && <CollectionSaved studentId={auth.userId}/>}
        </div>
    ):(
      <>Loading</>
    )}
 
    </Container>
  );
}


export default Dashboard