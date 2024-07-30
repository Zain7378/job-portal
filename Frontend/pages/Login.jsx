import React from 'react'
import Navbar from '../src/components/Navbar'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form';
import {toast} from 'react-hot-toast'
import axios from 'axios';

function Login() {
    const navigate = useNavigate('/')
    const {
        register,
        reset,
        handleSubmit,
        watch,
        formState: { errors },
      } = useForm();
    
      const onSubmit = (data)=>{
        const userInfo={
            email:data.email,
            password:data.password
        }
        axios.post('http://localhost:4000/user/login',userInfo)
        .then((res)=>{
            console.log(res.data);
            toast.success('Login Up successfully')
            localStorage.setItem('user',JSON.stringify(res.data.user))
            reset();
            setTimeout(()=>{
                navigate('/')
            },500)
        }).catch((error)=>{
            console.log('error:' ,error.response.data.message);
            toast.error(error.response.data.message)
        })
      };
  return (
    <>
    <Navbar />
    <section class="form-container">
  <div class="form-wrapper">
    <div class="form-box">
      <div class="form-content">
        <h1 class="form-title">Login</h1>
        <form class="form" onSubmit={handleSubmit(onSubmit)}>
          <div class="form-group">
            <label for="email" class="form-label">Your email</label>
            <input type="email" name="email" id="email" class="form-input" placeholder="name@mail.com" required
            {...register("email", { required: true })}
            />
          </div>
          <div class="form-group">
            <label for="password" class="form-label">Password</label>
            <input type="password" name="password" id="password" class="form-input" placeholder="••••••••" required 
            {...register("password", { required: true })}
            />
          </div>
         
          
          <button type="submit" class="form-button">Login</button>
          <p class="form-text">
            Don't have an account? <Link to="/signup" class="form-link">register</Link>
          </p>
        </form>
      </div>
    </div>
  </div>
</section>
    </>
  )
}

export default Login