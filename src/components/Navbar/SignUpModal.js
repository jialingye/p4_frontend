import React, { useState, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { AuthContext } from '../../context/AuthContext';
import jwt_decode from "jwt-decode"


const SignUpModal = ({show, handleClose}) => {
    const [username, setUsername] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [confirmPassword, setConfirmPassword]= useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const auth = useContext(AuthContext)

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        // check password
        if(password !== confirmPassword){
          setErrorMessage('Passwords do not match');
          return;
        }
    
        const signUpData = {
          username: username,
          email: email,
          password: password,
        }
    
        try {
          const options = {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(signUpData),
          };
          const responseData = await fetch(
            "https://aicademybackend.onrender.com/register/", options
          );
          // const responseData = await fetch(
          //   "http://127.0.0.1:8000/register/", options
          // );
    
          const signUpObj = await responseData.json();
          console.log(signUpObj)
          
          if(responseData.ok) {
            // set the auth with successfully login info
            //console.log(signUpObj)
            console.log("sign up sucessful");
            logIn();
            //close modal
             handleClose();
          } else {
              setErrorMessage(signUpObj.error);
              console.log("Login failed:")
          }
    
    } catch(error){
        console.error('Login error:',error)
    }   
      }
    
    //login 
    const logIn = async () => {
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
            const responseData = await fetch(
                "https://aicademybackend.onrender.com/token/", options
            );
          //   const responseData = await fetch(
          //     "http://127.0.0.1:8000/token/", options
          // );


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
    };
    
      return (
        <>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Sign Up</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit = {handleSubmit}>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label>User Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="name"
                    autoFocus
                    value = {username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="name@example.com"
                    autoFocus
                    value = {email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="password"
                    autoFocus
                    value = {password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="password"
                    autoFocus
                    value = {confirmPassword}
                    onChange = {(e) => setConfirmPassword(e.target.value)}
                  />
                </Form.Group>
                <Button variant="warning" size="lg" type='submit'>
                Create an account
              </Button>
              </Form>
              {errorMessage && <p style={{color:'red'}}>{errorMessage}</p>}
            </Modal.Body>
    
          </Modal>
        </>
      );
    }

export default SignUpModal