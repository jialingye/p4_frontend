import React from 'react'
import { Container } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';

const Dashboard = () => {
  return (
    <Container>
    <Nav justify variant="tabs" defaultActiveKey="/home">
      <Nav.Item>
        <Nav.Link eventKey="link-0" style={{color:'#98bf64'}}>Created</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="link-1" style={{color:'#98bf64'}}>Enrolled</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="link-2" style={{color:'#98bf64'}}>Collection</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="disabled"  style={{color:'#98bf64'}}>
          Dash
        </Nav.Link>
      </Nav.Item>
    </Nav>
    <div className='dashboard-outline' style={{borderLeft:'5px solid #98bf64',borderRight:'5px solid #98bf64',borderBottom:'5px solid #98bf64',borderBottomLeftRadius:'1em', borderBottomRightRadius:'1em'}}>
Hello
    </div>
    </Container>
  );
}


export default Dashboard