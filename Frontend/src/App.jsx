
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import './App.css'
import Home from '../pages/Home'
import CreateJob from '../pages/CreateJob'
import {Toaster} from 'react-hot-toast';
import Myjobs from '../pages/Myjobs'
import Salary from '../pages/Salary'
import UpdatePage from '../pages/UpdatePage'
import Login from '../pages/Login'
import SignUp from '../pages/SignUp'
import Protected from '../pages/Protected'
function App() {


  return (
    <>
<Routes>
  <Route path="/" element={<Home />} />
  <Route path='Login' element={<Login />} />
  <Route path='signup' element={<SignUp />} />
  <Route path='post-job' element={<Protected Component={CreateJob} />} />
  <Route path='my-job' element={<Protected Component={Myjobs} />} />
  <Route path='salary' element={<Salary />} />
  <Route path='my-job/edit-job/:id' element={<UpdatePage />} />
</Routes>
<Toaster />

    </>
  )
}

export default App
