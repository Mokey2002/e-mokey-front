import React, { useState , useEffect} from 'react'
import { useNavigate, useLocation} from 'react-router-dom'
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


const Product = (props) => {
 //const { loggedIn, email, cartIcon} = props
 const navigate = useNavigate()
 const location = useLocation();
 const [Product, setData] = useState({})
   
 useEffect(() => {
  axios
   .get('http://127.0.0.1:8000/api/product_id/'+ location.state.id+'/')
   .then((res) => {
    console.log(res);
    setData(res.data[0])
   });
   
}, []);

 const onButtonClick = () => {
  axios({
    method: 'post',
    url: 'http://127.0.0.1:8000/api/cart/',
    data: { user_id:'1',product_id:'2',quantity:'1'}, // you are sending body instead
    headers: {
     // 'Authorization': `bearer ${token}`,
    'Content-Type': 'application/json'
    }, 
  })
  
  props.setCartIcon(false)
 
}

  return (
    <div className="mainContainer">
 
      <div>Product.</div>
  
  <Row>
 
    <Col className="bg-light border">
    <Card
  style={{
    cursor: "pointer" 
  }}
>
  <img
    alt="Sample"
    src="https://picsum.photos/300/200"
  />
 <CardBody>
 <CardTitle tag="h5">
      {Product.product_name}
    </CardTitle>
 <CardSubtitle
      className="mb-2 text-muted"
      tag="h6"
    >
      Card subtitle
    </CardSubtitle>
    <CardText>
      {Product.product_description}
    </CardText>
    <CardFooter>
    Price: {Product.price}                      Qty{Product.quantity}
    </CardFooter>
 
  </CardBody>
  <input className={'inputButton'} type="button" onClick={onButtonClick} value={'Add to cart'} />
</Card>
    </Col>
  </Row>
      
      <Row>

  
 
      </Row>

</div>
  
  )
}

export default Product