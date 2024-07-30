import React from "react";
import Navbar from "../src/components/Navbar";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import {toast} from 'react-hot-toast'

function SignUp() {
    const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data)=>{
    const userInfo={
        name:data.name,
        email:data.email,
        password:data.password
    }
    axios.post('http://localhost:4000/user/signup',userInfo)
    .then((res)=>{
        console.log(res.data);
        toast.success('Sign Up successfully')
        setTimeout(()=>{
            navigate('/login')
        },500)
    }).catch((error)=>{
        console.log('error:' ,error);
        toast.error(`signUp failed`)
    })
  };
  return (
    <>
      <Navbar />
      <section class="form-container">
  <div class="form-wrapper">
    <div class="form-box">
      <div class="form-content">
        <h1 class="form-title">Create an account</h1>
        <form class="form" onSubmit={handleSubmit(onSubmit)}>
          <div class="form-group">
            <label for="Name" class="form-label">Name</label>
            <input type="text" name="Text" id="name" class="form-input" placeholder="Enter your name" required="true" 
            {...register("name", { required: true })}
            />
          </div>
          <div class="form-group">
            <label for="email" class="form-label">Your email</label>
            <input type="email" name="email" id="email" class="form-input" placeholder="name@company.com" required='true' 
            {...register("email", { required: true })}
            />
          </div>
          <div class="form-group">
            <label for="password" class="form-label">password</label>
            <input type="password" name="password" id="password" class="form-input" placeholder="••••••••" required='true' 
            {...register("password", { required: true })}
            />
          </div>
          
          <button type="submit" class="form-button">Create an account</button>
          <p class="form-text">
            Already have an account? <Link to="/Login" class="form-link">Login here</Link>
          </p>
        </form>
      </div>
    </div>
  </div>
</section>

    </>
  );
}

export default SignUp;
