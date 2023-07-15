import { useContext, useState } from 'react';
import { NavDropdown } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import LogInModal from './LogInModal';
import { AuthContext } from '../../context/AuthContext';



const Header = () => {
  const [showLogInModal, setShowLogInModal] = useState(false);

  const handleLogInModalOpen = () => setShowLogInModal(true);
  const handleLogInModalClose = () => setShowLogInModal(false);

  const auth = useContext(AuthContext)
  console.log(auth.isLoggedIn)
  return (
    <Navbar style={{ backgroundColor:'black'}} data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/" style={{color: 'beige', fontFamily: "'Kanit'", fontSize:'25px'}}>AIcademy</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">Courses</Nav.Link>
            <Nav.Link href="/dashboard">Collection</Nav.Link>
            <Nav.Link href="/courses/new">Create Lessons</Nav.Link>
            <NavDropdown className="dropdownTitle" id="navbarScrollingDropdown" >
            {auth.isLoggedIn? (
              <>
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