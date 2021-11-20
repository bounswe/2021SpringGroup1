import App from 'App';
import React, { useEffect, useState } from 'react'
import "../App.css"
import './SignUpLogin.css'
import { useHistory } from "react-router-dom";
import { CLEAN_LOGIN_SUCCEED, login } from 'store/actions/authAction';
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty } from 'utils/methods';

function Form() {
  const history = useHistory();
  const [username , setUsername] = useState('');
  const [password , setPassword] = useState('');
  const dispatch = useDispatch();
  const {isLoginSucceed} = useSelector(state=>state.auth)
  console.log('isLoginSucceed: ' , isLoginSucceed);

  useEffect(()=>{
    if(isLoginSucceed) {
      dispatch({
        type: CLEAN_LOGIN_SUCCEED,
      })
      history.push('/landingPage')
    }
  },[isLoginSucceed])
  const loginCall = (e) => {
    e.preventDefault();
    if(isEmpty(username) || isEmpty(password)) {
      alert('please fill all the fields');
      return;
    }
    dispatch(login({username, password}))
  }

  return (
    <div className='form-content-left'>
      <form className='form'>
        <h1>
          Login
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
        <button className='form-input-btn' type='submit' onClick={(e)=>loginCall(e)}>
          Login
        </button>
      </form>
    </div>
  )
}

export default Form
