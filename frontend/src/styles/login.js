import { createGlobalStyle } from "styled-components";

const LoginStyles = createGlobalStyle`
  body {
    background-color: #9f9da7;
    font-size: 1.6rem;
    font-family: "Open Sans", sans-serif;
    color: #2b3e51;
  }
  
  h2 {
    font-weight: 300;
    text-align: center;
  }
  
  a,
  a:link,
  a:visited,
  a:active {
    color: #3ca9e2;
    -webkit-transition: all 0.2s ease;
    transition: all 0.2s ease;
  }
  a:focus, a:hover,
  a:link:focus,
  a:link:hover,
  a:visited:focus,
  a:visited:hover,
  a:active:focus,
  a:active:hover {
    color: #329dd5;
    -webkit-transition: all 0.2s ease;
    transition: all 0.2s ease;
  }
  
  .login-form-wrap {
    background-color: #fff;
    width: 70%;
    max-width: 400px;
    margin: 30px auto;
    text-align: center;
    padding: 20px 0 0 0;
    border-radius: 4px;
    box-shadow: 0px 30px 50px 0px rgba(0, 0, 0, 0.2);
  }
  
  .login-form {
    padding: 0 60px;
  }
  
  input {
    display: block;
    box-sizing: border-box;
    width: 100%;
    outline: none;
    height: 60px;
    line-height: 60px;
    border-radius: 4px;
  }
  
  input[type="password"],
  input[type="email"] {
    width: 100%;
    padding: 0 0 0 10px;
    margin: 10px 0;
    color: #8a8b8e;
    border: 1px solid #c2c0ca;
    font-style: normal;
    font-size: 16px;
    -webkit-appearance: none;
       -moz-appearance: none;
            appearance: none;
    position: relative;
    display: inline-block;
    background: none;
  }
  input[type="password"]:focus,
  input[type="email"]:focus {
    border-color: #3ca9e2;
  }
  
  .btn-login {
    border: none;
    display: block;
    background-color: #3ca9e2;
    color: #fff;
    font-weight: bold;
    text-transform: uppercase;
    cursor: pointer;
    -webkit-transition: all 0.2s ease;
    transition: all 0.2s ease;
    font-size: 18px;
    position: relative;
    display: inline-block;
    cursor: pointer;
    text-align: center;
    margin-bottom: 30px;
    margin-top: 10px;
    width: 100%;
    padding: 20px;
  }
  .btn-login:hover {
    background-color: #329dd5;
    -webkit-transition: all 0.2s ease;
    transition: all 0.2s ease;
  }
`;

export default LoginStyles;