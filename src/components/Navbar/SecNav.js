import { Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

const SecNav = ({ onTagSelect, onTitleSearch}) => {
  return (
    <Navbar expand="lg" className=" second-nav" style={{backgroundColor:'#353535'}}>
    <Container fluid>
      <Navbar.Toggle aria-controls="navbarScroll" />
      <Navbar.Collapse id="navbarScroll">
        <Col lg={9} >
            <Nav
            className="me-auto my-3 my-lg-0 d-flex justify-content-around"
            style={{ maxHeight: '100px'}}
            navbarScroll
            >
            <Nav.Link style={{color:'lightgoldenrodyellow'}} onClick={()=>onTagSelect('Software & Technology')}>Software & Technology</Nav.Link>
            <Nav.Link style={{color:'lightsteelblue'}} onClick={()=>onTagSelect('Finance & Bussiness')}>Finance & Bussiness</Nav.Link>
            <Nav.Link style={{color:'aquamarine'}} onClick={()=>onTagSelect('Language')}>Language</Nav.Link>
            <Nav.Link style={{color:'rgb(239,223,102)'}} onClick={()=>onTagSelect('Development')}>Development</Nav.Link>
            <Nav.Link style={{color:'rgb(163,224,233)'}} onClick={()=>onTagSelect('Art & Design')}>Art & Design</Nav.Link>
            <Nav.Link style={{color:'lightcyan'}} onClick={()=>onTagSelect('Lifestyle')}>Lifestyle</Nav.Link>
            <Nav.Link style={{color:'rgb(210,158,244)'}} onClick={()=>onTagSelect('Health & Fitness')}>Health & Fitness</Nav.Link>
            <Nav.Link style={{color:'lightpink'}} onClick={()=>onTagSelect('Academy')}>Academy</Nav.Link>
            
            
            </Nav>
        </Col>
        <Col lg={3}>
        <Form className="d-flex" >
          <Form.Control
            type="search"
            placeholder="Search"
            className="me-2"
            aria-label="Search"
            onChange={(e)=>onTitleSearch(e.target.value)}
          />
        </Form>
        </Col>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  )
}

export default SecNav