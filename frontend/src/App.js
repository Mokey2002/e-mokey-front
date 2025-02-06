import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import Home from './Components/home';
import Login from './Components/login';
import Landing from './Components/landing';
import Product from './Components/product';
import Checkout from './Components/checkout';
import AddItem from './Components/additem';
import MyItems from './Components/myitems';
import EditItems from './Components/editItems';
import History from './Components/history';
import BuyerLogin from './Components/buyerlogin';
import BuyerDashboard from './Components/buyerDashboard';
import BuyerRegister from './Components/buyerRegistration';
import { persistor } from './Components/redux/store';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import { buyerLogout, buyerLogin } from './Components/redux/buyerAuthSlice';
import { sellerLogin,sellerLogout } from './Components/redux/sellerAuthSlice';
import './App.css';
import { useEffect, useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Button,
  Container,
  Row,
  Col
} from 'reactstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import axios from 'axios';



function App() {
  return (
    <BrowserRouter>
      <MainApp />
    </BrowserRouter>
  );
}

function MainApp() {
  const dispatch = useDispatch();
  const buyerLoggedIn = useSelector((state) => state.buyerAuth.loggedIn); // Redux buyer state
  const sellerLoggedIn = useSelector((state) => state.sellerAuth.loggedIn);
  const navigate = useNavigate(); // Used for redirection

  //const [sellerLoggedIn, setSellerLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [collapsed, setCollapsed] = useState(true);
  const [cartIcon, setCartIcon] = useState(true);
  const [modal, setModal] = useState(false);
  const [userCart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const toggle = () => setModal(!modal);
  const toggleNavbar = () => setCollapsed(!collapsed);


  // Handle Logout for both Buyers & Sellers
  const handleLogout = () => {
    if (buyerLoggedIn) {
      dispatch(buyerLogout()); // Redux Logout for Buyers
      
    } else if (sellerLoggedIn) {
      dispatch(sellerLogout());
      
    }

     // 🔥 Clear persisted Redux state
 
    navigate('/landing'); // Redirect AFTER state is cleared
  
    //navigate('/landing'); // Redirect after logout
  };

  // Open the cart modal and fetch cart data
  const handleClick = () => {
    setModal(!modal);

    axios
      .get('http://127.0.0.1:8000/api/cart/')
      .then((res) => {
        let total = 0;
        const listItems = res.data.map((item) => {
          total += parseFloat(item.price) * item.quantity;
          return (
            <li key={item.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0' }}>
              <span>{item.product_name} (x{item.quantity}) - ${item.price.toFixed(2)}</span>
              <Button color="danger" size="sm" onClick={() => handleDelete(item.id)}>Delete</Button>
            </li>
          );
        });

        setCart(listItems);
        setTotalPrice(total);
      })
      .catch((err) => console.error('Error fetching cart data:', err));
  };

  // Delete an item from the cart
  const handleDelete = (product_id) => {
    axios
      .delete(`http://127.0.0.1:8000/api/delete_cart_product_id/${product_id}/`)
      .then(() => {
        console.log('Item deleted');
        handleClick(); // Refresh cart after delete
      })
      .catch((err) => console.error('Error deleting product:', err));
  };

  return (
    <div className="App">
      <Navbar color="faded" light>
        <NavbarBrand href="/">Mokey</NavbarBrand>

        {/* CART ICON */}
        <NavbarBrand>
          {cartIcon ? (
            <div><i className="icon bi-cart" onClick={handleClick}></i></div>
          ) : (
            <div><i className="icon bi-cart-check-fill" onClick={handleClick}></i></div>
          )}
        </NavbarBrand>

        <NavbarToggler onClick={toggleNavbar} className="me-2" />
        <Collapse isOpen={!collapsed} navbar>
          <Nav navbar>
            <NavItem><NavLink href="/landing">Home</NavLink></NavItem>

            {!buyerLoggedIn && !sellerLoggedIn ? (
                // If no one is logged in, show login options
                <>
                  <NavItem><NavLink href="/buyerlogin">Buyer Login</NavLink></NavItem>
                  <NavItem><NavLink href="/login">Seller Login</NavLink></NavItem>
                </>
              ) : (
                <>
                  {/* If Buyer is logged in, show Buyer Dashboard */}
                  {buyerLoggedIn && (
                    <NavItem><NavLink href="/Dashboard">Buyer Dashboard</NavLink></NavItem>
                  )}

                  {/* If Seller is logged in, show Seller Navigation */}
                  {sellerLoggedIn && (
                    <>
                      <NavItem><NavLink href="/myItems">My Items</NavLink></NavItem>
                      <NavItem><NavLink href="/additem">Add Item</NavLink></NavItem>
                      <NavItem><NavLink href="/soldItems">Sold History</NavLink></NavItem>
                    </>
                  )}

                  {/* Show Logout Button for both Buyer & Seller */}
                  {(buyerLoggedIn || sellerLoggedIn) && (
                    <NavItem>
                      <Button color="danger" onClick={handleLogout} style={{ marginLeft: '10px' }}>
                        Logout
                      </Button>
                    </NavItem>
                  )}
                </>
              )}

          </Nav>
        </Collapse>
      </Navbar>

      {/* ROUTES */}
   
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/landing" element={<Landing />} />
          <Route path="/product" element={<Product />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/additem" element={<AddItem />} />
          <Route path="/myItems" element={<MyItems />} />
          <Route path="/editItems" element={<EditItems />} />
          <Route path="/soldItems" element={<History />} />
          <Route path="/buyerLogin" element={<BuyerLogin />} />
          <Route path="/buyerRegister" element={<BuyerRegister />} />
          <Route path="/Dashboard" element={<BuyerDashboard />} />
        </Routes>
     

      {/* CART MODAL */}
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Your Cart</ModalHeader>
        <ModalBody>
          <ul>{userCart}</ul>
          <hr />
          <h5 style={{ textAlign: 'right' }}>Total: ${totalPrice.toFixed(2)}</h5>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => navigate('/checkout')}>Checkout</Button>
          <Button color="secondary" onClick={toggle}>Close</Button>
        </ModalFooter>
      </Modal>

      {/* FOOTER */}
      <footer className="footer mt-5 bg-dark text-light py-4">
        <Container>
          <Row className="text-center">
            <Col md="4"><h5>Mokey</h5><p>© {new Date().getFullYear()} Mokey. All rights reserved.</p></Col>
            <Col md="4"><h5>Quick Links</h5><NavLink href="/contact" className="text-light">Contact</NavLink></Col>
            <Col md="4"><h5>Follow Us</h5></Col>
          </Row>
        </Container>
      </footer>
    </div>
  );
}

export default App;
