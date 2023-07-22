import React, { useContext, useState } from 'react'
import { Button, Modal, Form } from 'react-bootstrap'
import { AuthContext } from '../../context/AuthContext';
import jwt_decode from "jwt-decode"


const LogInModal = ({show, handleClose}) => {
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const auth= useContext(AuthContext)
    console.log(auth)

    const handleInstructorLogin = (event) => {
        setUsername('student2')
        setPassword('password123!')
      }
    
    const handleStudentLogin = (event) => {
        setUsername('student')
        setPassword('password123!')
    }  


    const handleSubmit = async (event) => {
        event.preventDefault();
        const logIn = {
            username: username,
            password: password,
        };
        try{
            const options={
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                },
                body: JSON.stringify(logIn)
            }
            // const responseData = await fetch(
            //     "https://aicademybackend.onrender.com/token/", options
            // );
            const responseData = await fetch(
              "http://127.0.0.1:8000/token/", options
          );


            const LoginObj = await responseData.json();
            //console.log("😛",jwt_decode(LoginObj.access))

            if(responseData.ok){
             const decodeJWT = jwt_decode(LoginObj.access)
             auth.login(decodeJWT.user_id, LoginObj.access,decodeJWT.username)
             console.log("Login sucessful");
            //close modal
             handleClose();
            } else {
                setErrorMessage("Email or password do not match");
                console.log("Login failed:")
            }
            console.log(auth)
 
        } catch (error) {
            console.error('Login error:', error)
        }
    } 


  return (
    <div> <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Log In</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter User Name"
                autoFocus
                value = {username}
                onChange ={(e) => setUsername(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="password"
                autoFocus
                value = {password}
                onChange ={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <div style={{display:"flex", flexDirection:"column", justifyContent:"center"}}>
            <Button variant="warning" size="lg" style = {{margin:"10px"}} onClick={() => handleStudentLogin()} >
            Demo Student1
          </Button> 
            <Button variant="warning" size="lg" style = {{margin:"10px"}} onClick={() => handleInstructorLogin()}>
            Demo Student2
          </Button> 
            <Button variant="warning" size="lg" style = {{margin:"10px"}} type='submit'>
            Log In
          </Button> 
            </div>
            </Form>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
        </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
      </Modal>
    
    </div>
  )
}

export default LogInModal