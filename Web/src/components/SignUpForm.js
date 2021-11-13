import App from 'App';
import React from 'react'
import "../App.css"
import './SignUpLogin.css'


function Form() {
  return (
    <div className='form-content-right'>
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
          />
        </div>
        <button className='form-input-btn' type='submit'>
          Register
        </button>
      </form>
    </div>
  )
}

export default Form
