import React, { useEffect, useState } from 'react'
import {  Col, Container, Row } from 'react-bootstrap'
import Card from 'react-bootstrap/Card';

const Collection = () => {
    let [collections, setCollections] = useState([])
    let collectionsData
    useEffect(() => {
        getCollections()
    }, [])

    let getCollections = async() =>{
        let response = await fetch('/collection/')
        let data = await response.json()
        console.log('DATA', data)
        setCollections(data)
    }
    if(collections){
         collectionsData = collections.map((collection, index) => (
   
            <Col lg={3}>
             <Card
          key= {index}
          text={'white'}
          className = {`mb-2 list-item`}
          style={{border:'1px solid #98bf64', color:'#98bf64'}}
        >
          <Card.Header style={{color:'#98bf64'}}>{collection.title}</Card.Header>
             
        </Card>
            
            </Col>
    
    ))
}

  return (
    <Container>
    <Row>
       {collectionsData}
    </Row>
    </Container>
  )
}

export default Collection