import { Route, Routes } from 'react-router-dom'
import { UserContextProvider } from './context/UserContext'
import axios from 'axios'

import './App.css'


import Home from './pages/Home'
import Login from './pages/Login'
import Layout from './components/Layout'
import Register from './pages/Register'
import Account from './pages/Account'
import Places from './pages/Places'
import PlacesForm from './pages/PlacesForm'
import Place from './pages/Place'
import Bookings from './pages/Bookings'
import Booking from './pages/Booking'



axios.defaults.baseURL='http://localhost:3000'
axios.defaults.withCredentials=true;

function App() {


  return (
    <UserContextProvider>
    <Routes>
      <Route path='/' element={<Layout />} >
        <Route index element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/account/' element ={<Account />} />
        <Route path='/account/places' element ={<Places />} />
        <Route path='/account/places/new' element ={<PlacesForm />} />
        <Route path='/account/places/:id' element ={<PlacesForm />} />
        <Route path='/place/:id' element={<Place />}/>
        <Route path='account/bookings/' element={<Bookings />} />
        <Route path='account/bookings/:id' element={<Booking />} />

        


      </Route>
    </Routes>
    </UserContextProvider>


  )
}

export default App
