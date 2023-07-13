import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const Header = () => {
  return (
    <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/">Academy</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">Courses</Nav.Link>
            <Nav.Link href="#features">Collection</Nav.Link>
            <Nav.Link href="/courses/new">Create Lessons</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
  )
}

export default Header