import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'; 

const Login = (props) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')

  const navigate = useNavigate()

  
  const onButtonClick = () => {
    // Set initial error values to empty
    setEmailError('')
    setPasswordError('')
  
    // Check if the user has entered both fields correctly
    if ('' === email) {
      setEmailError('Please enter your email')
      return
    }
  
    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      setEmailError('Please enter a valid email')
      return
    }
  
    if ('' === password) {
      setPasswordError('Please enter a password')
      return
    }
  
    if (password.length < 7) {
      setPasswordError('The password must be 8 characters or longer')
      return
    }
    
    // Authentication calls will be made here...

        console.log(password,email)
        fetch('http://localhost:8000/api/product/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          //body: JSON.stringify({ user_id:email,email:email, name:'test',lname:'test',address:'test'}),//JSON.stringify({ email, password }),
         body: JSON.stringify({ product_id:'2',quantity:'2', price:67.50,product_description:'lego',product_name:'lego starwars'}),//JSON.stringify({ email, password })/
        })
          .then((r) => r.json())
          .then((r) => {
            console.log(r);
            console.log(r.status)
            if ('success' === r.message) {
              localStorage.setItem('user', JSON.stringify({ email, token: 'testoken'}))
              props.setLoggedIn(true)
              props.setEmail(email)
              navigate('/')
            } else {
              window.alert('Wrong email or password')
            }
          })
      
  }

  return (
    <div className={'mainContainer'}>
      <div className={'titleContainer'}>
        <div>Login</div>
      </div>
      <br />
      <div className={'inputContainer'}>
        <input
          value={email}
          placeholder="Enter your email here"
          onChange={(ev) => setEmail(ev.target.value)}
          className={'inputBox'}
        />
        <label className="errorLabel">{emailError}</label>
      </div>
      <br />
      <div className={'inputContainer'}>
        <input
          value={password}
          placeholder="Enter your password here"
          onChange={(ev) => setPassword(ev.target.value)}
          className={'inputBox'}
        />
        <label className="errorLabel">{passwordError}</label>
      </div>
      <br />
      <div className={'inputContainer'}>
        <input className={'inputButton'} type="button" onClick={onButtonClick} value={'Log in'} />
      </div>
    </div>
  )
}

export default Login