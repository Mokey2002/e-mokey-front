import React ,{ useEffect, useState} from 'react'
import { useNavigate} from 'react-router-dom'
import axios from 'axios';

import {
  Button,
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
  Row,
  Col,
  CardFooter
} from "reactstrap";

const Checkout = (props) => {
 // const { loggedIn, email } = props
 const navigate = useNavigate()
 const [Pdata, setData] =useState([])
 //const  carsdinfo = []
 useEffect(() => {
  axios
   .get('http://127.0.0.1:8000/api/product/')
   .then((res) => {
    //console.log(res.data);
    setData(res.data);
    //console.log(Pdata)
   });
   //console.log('adfasd')
   //console.log(Pdata)
   
}, []);

 const onButtonClick = (test) => ()=>{
  
    navigate('/product',{state:{id:test}})
  
}
if(Pdata){
console.log(Pdata);

  return (
    <div className="mainContainer">
      <div className={'titleContainer'}>
        <div>Welcome!</div>
      </div>
      <div>This is the landing page.</div>
  
  <Row>
    {Pdata.map((product) => (
      <Col className="bg-light border" key={product.id}>
        
        <Card
         onClick={onButtonClick(product.id)} 
  style={{
    cursor: "pointer" 
  }}
>
    
  <img
    alt="Sample"
    src="https://picsum.photos/300/200"
  />
 <CardBody >
 <CardTitle tag="h5">
      {product.name}
    </CardTitle>
 <CardSubtitle
      className="mb-2 text-muted"
      tag="h6"
    >
      Card subtitle
    </CardSubtitle>
    <CardText>
     {product.id}

     {product.product_description}
    </CardText>
    <CardFooter>
    Price: {product.price}                      Qty{product.quantity}
    </CardFooter>
  </CardBody>
</Card>
    </Col>
 
      ))}
  
  </Row>
      
      <Row>
 
      </Row>

</div>
  
  )
}
}

export default Checkout