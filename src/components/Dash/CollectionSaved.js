import React, { useEffect, useState } from 'react'
import {  Col, Container, ListGroup, Row } from 'react-bootstrap'
import Card from 'react-bootstrap/Card';
import { NavLink } from 'react-router-dom';
import Masonry from 'react-masonry-css'

const CollectionSaved = ({studentId}) => {

    let [collections, setCollections] = useState([])
    let [errorState, setErrorState]= useState(null)
    let collectionsData
    
    const handleRemoveCollection=async(event, collectionId)=>{
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
          const response = await fetch(`http://127.0.0.1:8000/collection/${collectionId}/user/${studentId}/`, options);
          const data= await response.json();
          
          if(response.status !== 200){
            setErrorState('Error')
          } else {
           window.location.reload()
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
        let response = await fetch(`http://127.0.0.1:8000/collection/${studentId}`)
        let data = await response.json()
        console.log('DATA', data)
        setCollections(data)
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
                            <button  style={{ border:'none', backgroundColor:'white', color:'#98bf64', margin:'0px', padding:'0px'}} onClick={(event)=>handleRemoveCollection(event, collection.id)}>X</button>
                            </Col>
                          </Row>
                           
                            <Card.Text>
                            {collection.description}
                            </Card.Text>
                        </Card.Body>
                        <ListGroup className="list-group-flush" style={{padding:'10px'}} >
                            {collection.course.map((course,index)=>(
                                <NavLink to={`/courses/${course.id}` } style={{textDecoration:"none"}} >
                                        <ListGroup.Item style = {{backgroundColor:'#eef3f32b',color:'#98bf64',border:'1px solid #98bf64',borderRadius:'1em', marginTop:'10px'}}key={index}>{course.title}</ListGroup.Item>
                                        
                                </NavLink>
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

export default CollectionSaved