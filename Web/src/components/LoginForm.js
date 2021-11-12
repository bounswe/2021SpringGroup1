import App from 'App';
import React from 'react'
import "../App.css"


function Form() {
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
        <button className='form-input-btn' type='submit'>
          Login
        </button>
      </form>
    </div>
    )
}

export default Form
