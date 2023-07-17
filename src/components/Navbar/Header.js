import { useContext, useState } from 'react';
import { Col, NavDropdown } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import LogInModal from './LogInModal';
import { AuthContext } from '../../context/AuthContext';
import './Navbar.css'


const Header = () => {
  const [showLogInModal, setShowLogInModal] = useState(false);

  const handleLogInModalOpen = () => setShowLogInModal(true);
  const handleLogInModalClose = () => setShowLogInModal(false);

  const auth = useContext(AuthContext)
  console.log(auth)
  return (
    <Navbar style={{ backgroundColor:'white'}} fixed="top">
        <Container>
          <Navbar.Brand href="/" style={{color: '#98bf64', fontFamily: "'Roboto'", fontSize:'25px'}}>AIcademy</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link className="nav-link-hover" href="/">Courses</Nav.Link>
            <Nav.Link className="nav-link-hover" href="/collections">Collection</Nav.Link>
            <Nav.Link className="nav-link-hover" href="/courses/new">Create Lessons</Nav.Link>
          </Nav>
          <Nav className="justify-content-end" style={{border:'2px solid #98bf64', width:'100px', borderRadius:'2em'}}>
            <Nav.Link>Log In</Nav.Link>
            <NavDropdown className="dropdownTitle"  id="navbarScrollingDropdown" >
            {auth.isLoggedIn? (
              <>
              <div></div>
              <NavDropdown.Item href="/dashboard">Dashboard</NavDropdown.Item>
              <NavDropdown.Item onClick={()=>auth.logout()}>Log Off</NavDropdown.Item>
            </>
            ):(
              <>
              <NavDropdown.Item onClick = {handleLogInModalOpen}>Log In</NavDropdown.Item>
                     <LogInModal 
                      show={showLogInModal}
                      handleClose ={handleLogInModalClose}
                    />
              </>
            )}
                    
            </NavDropdown>
          
          </Nav>
          </Container>
      </Navbar>
  )
}

export default Header