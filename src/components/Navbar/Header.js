import { useContext, useState } from 'react';
import {  NavDropdown } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import LogInModal from './LogInModal';
import { AuthContext } from '../../context/AuthContext';
import './Navbar.css'
import SignUpModal from './SignUpModal';

const Header = () => {
  const [showLogInModal, setShowLogInModal] = useState(false);

  const handleLogInModalOpen = () => setShowLogInModal(true);
  const handleLogInModalClose = () => setShowLogInModal(false);

  const [showSignUpModal, setShowSignUpModal] = useState(false);

  const handleSignUpModalOpen = () => setShowSignUpModal(true);
  const handleSignUpModalClose = () => setShowSignUpModal(false);

  const auth = useContext(AuthContext)
  console.log(auth)
  return (
    <Navbar style={{ backgroundColor:'white'}} fixed="top">
        <Container>
          <Navbar.Brand href="/" style={{color: '#98bf64', fontFamily: "'Roboto'", fontSize:'25px'}}>AIcademy</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link className="nav-link-hover" href="/courses">Courses</Nav.Link>
            <Nav.Link className="nav-link-hover" href="/collections">Collection</Nav.Link>
            {auth.isLoggedIn? (
              <Nav.Link className="nav-link-hover" href="/courses/new">Create Course</Nav.Link>
            ):(
              <></>
            )}
          </Nav>
          <Nav className="justify-content-end" style={{border:'2px solid #98bf64', minWidth:'100px', borderRadius:'2em'}}>
            {auth.isLoggedIn? (
              <Nav.Link href="/dashboard">Dashboard</Nav.Link>
            ):(
              <>
              <Nav.Link onClick = {handleLogInModalOpen}>Log In</Nav.Link>
              <LogInModal 
              show={showLogInModal}
              handleClose ={handleLogInModalClose}
            />
            </>
            )}
            <NavDropdown className="dropdownTitle"  id="navbarScrollingDropdown" >
            {auth.isLoggedIn? (
              <>
              <div></div>
              <NavDropdown.Item href="/dashboard">Dashboard</NavDropdown.Item>
              <NavDropdown.Item onClick={()=>auth.logout()}>Log Off</NavDropdown.Item>
            </>
            ):(
              <>
              <NavDropdown.Item onClick = {handleSignUpModalOpen}>Sign Up</NavDropdown.Item>
                     <SignUpModal 
                      show={showSignUpModal}
                      handleClose ={handleSignUpModalClose}
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