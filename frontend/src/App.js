import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Components/home';
import Login from './Components/login';
import Landing from './Components/landing';
import Product from './Components/product';
import Checkout from './Components/checkout';  // <-- Import the new Checkout page
import AddItem from './Components/additem';
import MyItems from './Components/myitems';
import EditItems from './Components/editItems';
import History from './Components/history';
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
  Button
} from 'reactstrap';
import "bootstrap-icons/font/bootstrap-icons.css";
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import axios from 'axios';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [collapsed, setCollapsed] = useState(true);
  const [cartIcon, setCartIcon] = useState(true);
  const [modal, setModal] = useState(false);
  const [userCart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const toggle = () => setModal(!modal);
  const toggleNavbar = () => setCollapsed(!collapsed);

  // Load login state from localStorage
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.token) {
      setLoggedIn(true);
      setEmail(user.email);
    }
  }, []);

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem('user'); // Clear user session
    setLoggedIn(false); // Reset state
    setEmail('');
    // If you want to programmatically navigate, see notes below
    // navigate('/login');
  };
  
  // Open the cart modal and fetch cart data
  const handleClick = () => {
    setModal(!modal);

    axios
      .get('http://127.0.0.1:8000/api/cart/')
      .then((res) => {
        console.log(res)
        let total = 0;
        const listItems = res.data.map((item) => {
          total += parseFloat(item.price) * item.quantity;

          return (
            <li
              key={item.id}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '5px 0'
              }}
            >
              <span>
                {item.product_name} (x{item.quantity}) - $
                {item.price.toFixed(2)}
              </span>
              <Button color="danger" size="sm" onClick={() => handleDelete(item.id)}>
                Delete
              </Button>
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
      .then((res) => {
        console.log('Item deleted');
        let total = 0;
        const listItems = res.data.map((item) => {
          total += item.price * item.quantity;
          return (
            <li
              key={item.id}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '5px 0'
              }}
            >
              <span>
                {item.product_name} (x{item.quantity}) - $
                {item.price.toFixed(2)}
              </span>
              <Button color="danger" size="sm" onClick={() => handleDelete(item.id)}>
                Delete
              </Button>
            </li>
          );
        });

        setCart(listItems);
        setTotalPrice(total);
      })
      .catch((err) => console.error('Error deleting product:', err));
  };

  // Navigate to Checkout on button click
  // Because we're rendering <BrowserRouter> here, we'll do a simple approach:
  //  - close the modal
  //  - do window.location.href to jump to /checkout
  // 
  // If you want client-side navigation (without a full page refresh),
  // see the "Alternate Approach" notes below.
  const handleCheckoutClick = () => {
    toggle();
    window.location.href = '/checkout';
  };

  return (
    <div className="App">
      <Navbar color="faded" light>
        <NavbarBrand href="/" className="me-auto">
          Mokey
        </NavbarBrand>
        <NavbarBrand>
          {cartIcon ? (
            <div>
              <i className="icon bi-cart" onClick={handleClick}></i>
            </div>
          ) : (
            <div>
              <i className="icon bi-cart-check-fill" onClick={handleClick}></i>
            </div>
          )}
        </NavbarBrand>

        <NavbarToggler onClick={toggleNavbar} className="me-2" />
        <Collapse isOpen={!collapsed} navbar>
          <Nav navbar>
            <NavItem>
              <NavLink href="/landing">Home</NavLink>
            </NavItem>
            {!loggedIn ? (
              <NavItem>
                <NavLink href="/login">Login</NavLink>
              </NavItem>
            ) : (
              <>
                <NavItem>
                  <NavLink href="/myItems">My Items</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/additem">Add Item</NavLink>
                </NavItem>
                <NavItem>
                  <Button color="danger" onClick={handleLogout} style={{ marginLeft: '10px' }}>
                    Logout
                  </Button>
                </NavItem>
              </>
            )}
          </Nav>
        </Collapse>
      </Navbar>

      {/*
        Wrap your routes in BrowserRouter.
        Everything inside this BrowserRouter can be navigated to via <Route> or "href".
      */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login setLoggedIn={setLoggedIn} setEmail={setEmail} />} />
          <Route path="/landing" element={<Landing />} />
          <Route path="/product" element={<Product setCartIcon={setCartIcon} />} />
          <Route path="/checkout" element={<Checkout setCartIcon={setCartIcon} />} />
          <Route path="/additem" element={<AddItem loggedIn={setLoggedIn} />} />
          <Route path="/myItems" element={<MyItems loggedIn={setLoggedIn} />} />
          <Route path="/editItems" element={<EditItems loggedIn={setLoggedIn} />} />
          <Route path="/soldItems" element={<History loggedIn={setLoggedIn} />} />
        
        </Routes>
      </BrowserRouter>

      {/* Cart Modal */}
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Your Cart</ModalHeader>
        <ModalBody>
          <ul>{userCart}</ul>
          <hr />
          <h5 style={{ textAlign: 'right' }}>Total: ${totalPrice.toFixed(2)}</h5>
        </ModalBody>
        <ModalFooter>
          {/* MAIN CHANGE: trigger handleCheckoutClick instead of just toggle */}
          <Button color="primary" onClick={handleCheckoutClick}>
            Checkout
          </Button>
          <Button color="secondary" onClick={toggle}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default App;
