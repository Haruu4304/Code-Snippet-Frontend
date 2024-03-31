import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { toast } from 'react-toastify';

const Login = () => {
  const [login, setLogin] = useState({
    email: "",
    password: ""
  });

  const navigate = useNavigate();

  // API calling for login User
  const LoginUser = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/user/loginUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: login.email,
          password: login.password
        })
      });

      if (response.status === 200) {
        const data = await response.json();
        localStorage.setItem('token', data.token);
        return data.user._id; 
      } else {
        toast.error("Failed to Login");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to Login");
    }
  }

  const handleLogin = async () => {
    const userId = await LoginUser();
    if (userId) {
      console.log("passsingggggggggggg", userId); 
      navigate("/codeUploadblock", { state: { userId } }); 
    }
  }

  const handleChange = (e) => {
    const { id, value } = e.target;
    setLogin((prevState) => ({
      ...prevState,
      [id]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin();
  }

  return (
    <div className='formData'>
      <form className='form' onSubmit={(e) => handleSubmit(e)}>
        <div className='header'>
          <h3>Login</h3>
        </div>
        <div className="formDetails">
          <div className="userName-div">
            <label htmlFor='email' className='form-label'>
              Email
            </label>
            <input
              className="form-control form-control-lg"
              type="email"
              placeholder="enter your email"
              id='email'
              value={login.email}
              onChange={handleChange} />
          </div>
          <div className="userName-div">
            <label htmlFor='password' className='form-label'>
              Password
            </label>
            <input
              className="form-control form-control-lg"
              type="password"
              placeholder="enter your password"
              id='password'
              value={login.password}
              onChange={handleChange} />
          </div>
          <div className="submit">
            <button className='btn btn-primary'>Submit</button>
          </div>
          <div className="link">
            Don't have an account? <a href='/'>register</a>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Login;
