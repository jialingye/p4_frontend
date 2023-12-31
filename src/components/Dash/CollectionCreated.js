import React, { useEffect, useState } from 'react'
import { Card, Col, ListGroup, Row } from 'react-bootstrap'
import Masonry from 'react-masonry-css'
import { NavLink } from 'react-router-dom'
import EditCollection from './EditCollection'


const CollectionCreated = ({studentId}) => {
    let [collections, setCollections] = useState([])
    let [errorState, setErrorState]=useState(null)
     // Edit Course State
    const [editModalState, setEditModal] = useState(null);
    // Set State Function
    const handleEditModalOpen = (index) => setEditModal(index);
    const handleEditModalClose = () => setEditModal(null);
      let collectionsData

    const handleRemoveCourse= async(event, courseId, collectionId)=>{
        event.preventDefault();
          const asso= {
              asso: 'remove'
          }
          try{
  
            const options = {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
              },
              body: JSON.stringify(asso)
          };
          const response = await fetch(`https://aicademybackend.onrender.com/collection/${collectionId}/courses/${courseId}/`, options);
          //const response = await fetch(`http://127.0.0.1:8000/collection/${collectionId}/courses/${courseId}/`, options);
          const data= await response.json();
          
          if(response.status !== 200){
            setErrorState('Error')
          } else {
            setCollections(prevCollections => prevCollections.map(collection => {
              if (collection.id === collectionId) {
                return {
                  ...collection,
                  course: collection.course.filter(course => course.id !== courseId)
                };
              }
              return collection;
            }));
          }
          
          
          } catch(error) {
            console.error('error', error)
            setErrorState('Error')
            console.log(errorState)
          }


    }

    useEffect(() => {
        getCollections()
    }, [studentId])

    let getCollections = async() =>{
        let response = await fetch(`https://aicademybackend.onrender.com/collection/`)
        //let response = await fetch(`http://127.0.0.1:8000/collection/`)
        let data = await response.json()

        let created= data.filter((data)=>data.owner === studentId)
        //console.log('DATA', created)
        setCollections(created)
    }

    if(collections){
         collectionsData = collections.map((collection, index) => (
              <Card key={index} className = "collection-card list-item-dashboard" style={{backgroundColor:'#eef3f32b', width:'350px'}} >
              <Card.Body>
                    <Row>
                        <Col lg={10}>
                            <Card.Title>{collection.title}</Card.Title>
                        </Col>
                        <Col lg={1}>
                            <button onClick = {()=>handleEditModalOpen(index)} style={{ border:'none', backgroundColor:'transparent', color:'#98bf64', margin:'0px', padding:'0px'}} >Edit</button>
                            {editModalState=== index && (
                                  <>
                                  <EditCollection
                                  show = {editModalState===index}
                                  handleClose = {handleEditModalClose}
                                  collection ={collection}/>
                                  </>
                              )}
                        </Col>
                      </Row>
                  <Card.Text>
                  {collection.description}
                  </Card.Text>
              </Card.Body>
              <ListGroup className="list-group-flush" style={{padding:'10px'}} >
                  {collection.course.map((course,index)=>(
                              <ListGroup.Item style = {{backgroundColor:'#eef3f32b',color:'#98bf64',border:'1px solid #98bf64',borderRadius:'1em', marginTop:'10px'}}key={index}>
                              <Row>
                              <Col lg={10}>
                              <NavLink to={`/courses/${course.id}` } style={{textDecoration:"none"}} >
                                  <div style={{color:'#98bf64'}}> {course.title}</div>
                                  </NavLink>
                                  </Col>
                                  <Col lg={2}>
                                  <button  style={{ border:'none', backgroundColor:'transparent', color:'#98bf64'}} onClick={(event)=>handleRemoveCourse(event, course.id, collection.id)}>X</button>
                                  </Col>
                                  </Row>
                                  </ListGroup.Item>
                            ))}                        
                        </ListGroup>
                </Card>
    ))
}

  return (
    <div style={{margin:'20px'}}>
        <Masonry
        breakpointCols={{
          default: 4,
          1600: 3,
          1000: 2,
          500: 1,
        }}
        className="grid-container"
        columnClassName="grid-column"
      >
        {collectionsData}
        </Masonry>
    </div>
  )
}

export default CollectionCreated