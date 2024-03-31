import React, { useState } from 'react'
import { Navigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
  const [register,setRegister] = useState({
    userName:"",
    email:"",
    password:""
  })
  const [isRegistered, setIsRegistered] = useState(false);

  //api call for register
  const registerUser = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          userName: register.userName,
          email: register.email,
          password: register.password
        })
      });
      if (response.ok) {
        const data = await response.json();
        setIsRegistered(true);
        console.log(data);
      } else {
        toast.error("Failed to Register")
      }
    } catch (error) { 
      console.error(error);
      toast.error("Failed to Register")
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setRegister((prevState) => ({
      ...prevState,
      [id]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault(); 
    registerUser();
  };

  if(isRegistered){
    return <Navigate to="/login"/>
  }

  return (

    <div className='formData'>
      <ToastContainer/>
      <form className='form' onSubmit={(e) => handleSubmit(e)}>
        <div className='header'>
          <h3>Register</h3>
        </div>
        <div className="formDetails">
          <div className="userName-div" >
            <label htmlFor='userName' className='form-label'>
              Username
            </label>
            <input 
             className="form-control form-control-lg"
             type="text"
             placeholder="enter your userName"
             id='userName'
             name='userName'
             value={register.userName}
             onChange={handleChange}
             required />
          </div>
          <div className="userName-div">
            <label htmlFor='email' className='form-label'>
              Email
            </label>
            <input
             className="form-control form-control-lg"
             type="email"
             placeholder="enter your email"
             id='email'
             name='email'
             value={register.email}
             onChange={handleChange}
             required />
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
             name='password'
             value={register.password}
             onChange={handleChange}
             required  
             />
          </div>
          <div className="submit">
            <button className='btn btn-primary'>Submit</button>
          </div>
          <div className="link">
            Already have an accout? <a href='/login'>Login</a>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Register