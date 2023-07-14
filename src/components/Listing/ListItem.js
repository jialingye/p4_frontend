import React from 'react'
import { NavLink } from 'react-router-dom'
import Card from 'react-bootstrap/Card';
import './ListItem.css'
const ListItem = ({course, key}) => {
  return (
   
         <Card
          key= {key}
          text={'black'}
          className = {`mb-2 list-item ${course.tag}`}
        >
          <Card.Header className={`${course.tag}`}>{course.tag}</Card.Header>
          <Card.Body>
          <NavLink to={`/courses/${course.id}` } style={{textDecoration:"none"}} >
            <Card.Title className={`${course.tag}`} style={{textDecoration:"none"}}> {course.title} </Card.Title>
            </NavLink>
            <Card.Text>
              {course.discription}
            </Card.Text>
          </Card.Body>
          <Card.Footer className={`${course.tag}`}>{course.lessons.length} Lessons</Card.Footer>
        </Card>
    
   
  )
}

export default ListItem