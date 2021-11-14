//React Library
import React, { useState, useEffect, } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { urls } from 'DATABASE';
import 'assets/css/home.css';

import SignUpForm from '../components/SignUpForm';
import LoginForm from '../components/LoginForm';

const styles = {
  anasayfa: {
    position: "absolute",
    top: '50%',
    left: '50%',
    transform: "translate(-50%, -50%)"
  },
  links: {
    color: "red",
    fontSize: 55,
  }
}



const Home = (props) => {

  return (

    <>
      <div>
        <div className='form-container'>
          <span className='close-btn'>×</span>
          <SignUpForm />
          <LoginForm />
        </div>
      </div>
    </>
  );
}

export default Home;