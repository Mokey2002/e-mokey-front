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
   .get('http://127.0.0.1:8000/api/cart/')
   .then((res) => {
    console.log(res.data);
    setData(res.data);
    //console.log(Pdata)
   });
   //console.log('adfasd')
   //console.log(Pdata)
   
}, []);

 const onButtonClick = (test) => ()=>{
  
    navigate('/product',{state:{id:test}})
  
}

  // Build rows dynamically
  const result = [];
  for (let i = 0; i < Pdata.length; i++) {
    if (i % 4 === 0) {
      // Start a new row for every 4th item
      result.push(
        <Row key={`row-${i}`}>
          {/* Add 4 items in this row */}
          {(() => {
            const cols = [];
            for (let j = i; j < i + 4 && j < Pdata.length; j++) {
              const product = Pdata[j];
              cols.push(
                <Col className="bg-light border" key={product.id}>
                  <Card
                    onClick={onButtonClick(product.id)}
                    style={{
                      cursor: 'pointer',
                    }}
                  >
                    <img alt="Sample" src="https://picsum.photos/300/200" />
                    <CardBody>
                      <CardTitle tag="h5">{product.product_id}</CardTitle>
                      <CardSubtitle className="mb-2 text-muted" tag="h6">
                        Card subtitle
                      </CardSubtitle>
                      <CardText>
                        ID: {product.id}
                        <br />
                        Product ID: {product.product_id}
                      </CardText>
                      <CardFooter>
                        Price: {product.product_id} Qty: {product.product_id}
                      </CardFooter>
                    </CardBody>
                  </Card>
                </Col>
              );
            }
            return cols; // Return the columns to be rendered in this row
          })()}
        </Row>
      );
    }
  }
  

if(Pdata){
console.log(Pdata);

  return (
    <div className="mainContainer">
      <div className={'titleContainer'}>
        <div>Checkout</div>
      </div>
      <div>This is the checkout page.</div>
  
  <Row>
{result}
  
  </Row>
      
      <Row>
 
      </Row>

</div>
  
  )
}
}

export default Checkout