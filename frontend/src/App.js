import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Components/home'
import Login from './Components/login'
import Landing from './Components/landing'
import Product from './Components/product'
import Checkout from './Components/checkout'
import './App.css'
import { useEffect, useState } from 'react'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
  
} from 'reactstrap';
import useAuthRoute from './Components/cartIcon'
import "bootstrap-icons/font/bootstrap-icons.css";
import {  Modal, ModalHeader, ModalBody, ModalFooter, ModalComponent,Button} from 'reactstrap';
import axios from 'axios'; 

function App() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [email, setEmail] = useState(false)
  const [collapsed, setCollapsed] = useState(true)
  const [cartIcon, setCartIcon] = useState(true)
  
  const [modal, setModal] = useState(false);
  const [userCart, setCart] =useState([])
  const toggle = () => setModal(!modal);
  const toggleNavbar = () => setCollapsed(!collapsed);
 

  const handleClick = () => {
    // Perform your desired action here
    setModal(!modal);

    axios
   .get('http://127.0.0.1:8000/api/cart/')
   .then((res) => {
    //console.log(res.data[0]);
    console.log(res.data)
    //setCart(res.data)
    //const listItems = res.data.map((cartdata) =>
      //<li key={cartdata.id}>{cartdata.id}</li> 
    //)
    //const listItems = []; links.forEach(function (link) { listItems.push(<li>${link.endpoint}</li>); }); 
    const listItems = []; res.data.forEach(function (link) { listItems.push(<li key={link.id} style={{ display: 'flex', justifyContent: 'flex-end' }}> ${link.id}   <Button  onClick={() => handleDelete(link.id)} color="success">Delete  </Button> </li>); }); 
    console.log(listItems)
    setCart(listItems)
    console.log(userCart)

   });
   //console.log('adfasd')
   //console.log(userCart)

  };

  const handleDelete = (product_id) => {
    // Perform your desired action here
   // setModal(!modal);

  axios
   .delete('http://127.0.0.1:8000/api/delete_cart_product_id/'+product_id+'/')
   .then((res) => {
    //console.log(res.data[0]);
    //console.log('TEST');
    //console.log(product_id);
    //console.log(res);
    const listItems = []; res.data.forEach(function (link) { listItems.push(<li key={link.id} style={{ display: 'flex', justifyContent: 'flex-end' }}> ${link.id}   <Button  onClick={() => handleDelete(link.id)} color="success">Delete  </Button> </li>); }); 
    //console.log(listItems)
    setCart(listItems)
    //console.log(userCart)

   });
   

  };


  return (
    <div className="App">
 <Navbar color="faded" light>
        <NavbarBrand href="/" className="me-auto">
          Mokey
        </NavbarBrand>
        <NavbarBrand >
          {cartIcon ? <div><i className="icon bi-cart"  onClick={handleClick} > </i></div> : <div> <i className="icon bi-cart-check-fill" onClick={handleClick}> </i> </div>}
         
        </NavbarBrand>
 
        <NavbarToggler onClick={toggleNavbar} className="me-2" />       
        <Collapse isOpen={!collapsed} navbar>
          <Nav navbar>
            <NavItem>
              <NavLink href="/components/">Components</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="https://github.com/reactstrap/reactstrap">
                Mokey
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<Home email={email} loggedIn={loggedIn} setLoggedIn={setLoggedIn} />}
          />
          <Route path="/login" element={<Login setLoggedIn={setLoggedIn} setEmail={setEmail} />} />
          <Route path="/landing" element={<Landing/>}/>
          <Route path="/product" element={<Product setCartIcon={setCartIcon}/>}/>
          <Route path="/checkout" element={<Checkout setCartIcon={setCartIcon}/>}/>
        </Routes>
      </BrowserRouter>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Your Cart</ModalHeader>
        <ModalBody>
        <ul>
      
        {userCart}
        </ul>         
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle}>
            Checkout
          </Button>{' '}
          <Button color="secondary" onClick={toggle}>
            Close
          </Button>
          </ModalFooter>
          </Modal>
    </div>
  )
}

export default App