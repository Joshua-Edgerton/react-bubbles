import React, { useState } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth"
import styled from "styled-components"

const Login = props => {

  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  })

  const handleChange = e => {
    const {value, name} = e.target
    setCredentials({
      ...credentials,
      [name]: value
    })
  }

  const handleSubmit = e => {
    e.preventDefault();
    axiosWithAuth().post("login", credentials)
      .then(res => {
        localStorage.setItem('token', res.data.payload)
        props.history.push("/bubble-page")
      })
      .catch(err => console.log('login failed', err))
  }

  return (
    <LoginContainer>
      <h1>Welcome to the Bubble App!</h1>
      <form onSubmit={handleSubmit}>
        <label>Username:</label>
        <input 
          type='text'
          name='username'
          placeholder='Username'
          value={credentials.username}
          onChange={handleChange}
        />
        <label>Password:</label>
        <input 
          type='password'
          name='password'
          placeholder='Password'
          value={credentials.password}
          onChange={handleChange}
        />
        <button type="submit">Log In</button>
      </form>
    </LoginContainer>
  );
};

export default Login;

const LoginContainer = styled.div`
  width: 80%;
  margin: 0 auto;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  form {
    background: orange;
    min-width: 300px;
    width: 30%;
    padding: 25px 0;
    border-radius: 3px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    input {
      width: 200px;
      margin: 10px 0;
      border: none;
      border-radius: 2px;
      border-bottom: 2px solid #132048;
      padding: 2px 5px;
    }
    
    label {
      margin-right: 130px;
    }
    button {
      width: 150px;
      border: none;
      border-radius: 4px;
      background: orangered;
      padding: 2px 0;
      color: rgba(255, 255, 255, .8);
    }
  }
`;