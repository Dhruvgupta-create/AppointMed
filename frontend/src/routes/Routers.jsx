import Home from "../pages/Home"
import Services from "../pages/Services"
import Login from "../pages/Login"
import Signup from "../pages/Signup"
import Contact from "../pages/Contact"
import Doctors from "../pages/Doctors/Doctors"
import DoctorsDetails from "../pages/Doctors/DoctorsDetails"
import MyAccount from "../Dashboard/user-account/MyAccount"
import Dashboard from "../Dashboard/doctor-aacount/Dashboard"
import ProtectedRoutes from "./ProtectedRoutes"

import {Routes , Route} from 'react-router-dom'

const Routers = () => {
  return <Routes>
    <Route path='/' element={<Home/>} />
    <Route path='/home' element={<Home/>} />
    <Route path='/doctors' element={<Doctors/>} />
    <Route path='/doctors/:id' element={<DoctorsDetails/>} />
    <Route path='/login' element={<Login/>} />
    <Route path='/register' element={<Signup/>} />
    <Route path='/contact' element={<Contact/>} />
    <Route path='/services' element={<Services/>} />
    <Route path='/users/profile/me' element={<ProtectedRoutes allowedRoles={['patient']}><MyAccount/></ProtectedRoutes>} />
    <Route path='/doctors/profile/me' element={<ProtectedRoutes allowedRoles={['doctor']}><Dashboard/></ProtectedRoutes>} />
  </Routes>
}

export default Routers