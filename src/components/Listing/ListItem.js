import React from 'react'
import { NavLink } from 'react-router-dom'
import Card from 'react-bootstrap/Card';

const ListItem = ({course, key}) => {
  return (
    <div key= {key}>
         <NavLink to={`/courses/${course.id}`}>
         <Card
          bg='light'
          key='light'
          text={'black'}
          style={{ width: '18rem' }}
          className="mb-2"
        >
          <Card.Header>{course.tag}</Card.Header>
          <Card.Body>
            <Card.Title> {course.title} </Card.Title>
            <Card.Text>
              {course.discription}
            </Card.Text>
          </Card.Body>
        </Card>
          </NavLink>
    </div>
   
  )
}

export default ListItem