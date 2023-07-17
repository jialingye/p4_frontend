import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Modal, Row } from 'react-bootstrap'
import Form from 'react-bootstrap/Form';


const SaveModal = (props) => {
    const {course, studentId, show, handleClose, save} = props
    const [titleState, setTitle] = useState('')
    const [collections, setCollections] = useState(null)
    const [errorState, setErrorState] = useState(null)
    let studentCollection

    const onChangeHandler = (e, setValue) => {
        setValue(e.target.value)
    }

    let handleAddCourse = async(event, collectionId)=>{
        event.preventDefault();
          const asso= {
              asso: 'add'
          }
          try{
  
            const options = {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
              },
              body: JSON.stringify(asso)
          };
          const response = await fetch(`http://127.0.0.1:8000/collection/${collectionId}/courses/${course.id}/`, options);
          const data= await response.json();
          
          if(response.status !== 200){
            setErrorState('Please log in to enroll course')
          } else {
           handleClose()
           save(true)
          }
          
          
          } catch(error) {
            console.error('error', error)
            setErrorState('Please log in to enroll course')
            console.log(errorState)
          }
          
      }

    const handleSubmit = async(event) => {
        event.preventDefault();
        const addCollection = {
            title: titleState,
            description: '',
            course: course.id,
            user: studentId,
        }

        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(addCollection),
        };

        
       //const responseData = await fetch(`http://localhost:4000/user/${profile._id}`, options);
        const responseData = await fetch(`http://127.0.0.1:8000/collection/new/`, options);

        const addCollectionData = await responseData.json();
        console.log(addCollectionData);
        handleClose();
        save(true);
    }

    useEffect(()=>{
        const getCollections = async()=>{
            let response = await fetch(`/collection/${studentId}`)
            let data = await response.json();
            console.log(data)
            setCollections(data)
        }
        getCollections()
    }, [studentId])
    

    if(collections){
         studentCollection = collections.map((collection, index)=>(
            <Col xs={12} md={12} key={index}>
                <Button className="course-button" variant="outline-success" style={{width:'100%', borderColor:'#98bf64', marginBottom:'15px'}} onClick={(event)=>handleAddCourse(event, collection.id)}>{collection.title}</Button>
            </Col>
         ))
    }
  

  return (
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter" onHide={handleClose}>
      <Modal.Header closeButton onClick={()=>handleClose()}>
        <Modal.Title id="contained-modal-title-vcenter">
          Save Course
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="grid-example">
        <Container>
        <Form onSubmit={handleSubmit}>
            <Row className="mb-3">
                <Col sm={8}>
                <Form.Control
                    type="text"
                    placeholder="New Collection Title"
                    value={titleState}
                    onChange={(e)=>onChangeHandler(e, setTitle)}
                />
                </Col>
                <Col sm={4}>
                <Button className="course-button w-100" variant="outline-success" type="submit">
                    Add 
                </Button>
                </Col>
            </Row>
        </Form>
        <Row>
            {studentCollection}
        </Row>
        </Container>
      </Modal.Body>
    </Modal>
  )
}

export default SaveModal