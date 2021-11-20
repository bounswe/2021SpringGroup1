import App from 'App';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { register } from 'store/actions/authAction';
import { isEmpty } from 'utils/methods';
import {Alert} from 'react-bootstrap'
import "../App.css"
import './SignUpLogin.css'


function Form() {
  const [username , setUsername] = useState('bilal5');
  const [email , setEmail] = useState('bilal@gmail.com');
  const [password , setPassword] = useState('bilal');
  const [passwordConfirm , setPasswordConfirm] = useState('bilal');
  const {isRegistered} = useSelector(state=>state.auth)
  console.log('isRegistered: ' , isRegistered);
  const dispatch = useDispatch();
  const registerCall = (e) => {
    e.preventDefault();
    if(isEmpty(username) || isEmpty(email) || isEmpty(password) || isEmpty(passwordConfirm)) {
      alert('please fill all the fields');
      return;
    }
    if(password !== passwordConfirm) {
      alert('Password and PasswordConfirm does not match');
      return;
    }
    dispatch(register({username, email, password}))
  }
  return (
    <div className='form-content-right'>
      {isRegistered && <Alert variant="success">
        <Alert.Heading>{'Başarıyla Kayıt Oldunuz.'}</Alert.Heading>
      </Alert> }
      <form className='form'>
        <h1>
          Sign Up
          <p>
            Please create your account by providing necessary information.
          </p>
          
        </h1>

        <div className='form-inputs'>
          <label className='form-label'>Username</label>
          <input
            className='form-input'
            type='text'
            name='username'
            placeholder='Enter your username'
            required="required"
            onChange={(text)=>setUsername(text.target.value)}
          />
        </div>
        <div className='form-inputs'>
          <label className='form-label'>Email</label>
          <input
            className='form-input'
            type='email'
            name='email'
            placeholder='Enter your email'
            required="required"
            onChange={(text)=>setEmail(text.target.value)}
          />
        </div>
        <div className='form-inputs'>
          <label className='form-label'>Password</label>
          <input
            className='form-input'
            type='password'
            name='password'
            placeholder='Enter your password'
            required="required"
            onChange={(text)=>setPassword(text.target.value)}
          />
        </div>
        <div className='form-inputs'>
          <label className='form-label'>Confirm Password</label>
          <input
            className='form-input'
            type='password'
            name='password2'
            placeholder='Confirm your password'
            required="required"
            onChange={(text)=>setPasswordConfirm(text.target.value)}
          />
        </div>
        <button className='form-input-btn' type='submit' onClick={(e)=>registerCall(e)}>
          Register
        </button>
      </form>
    </div>
  )
}

export default Form
