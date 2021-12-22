import 'bootstrap/dist/css/bootstrap.min.css';
import './style/style.css';
import 'mapbox-gl/dist/mapbox-gl.css';
import { BrowserRouter as Router, Routes, Route, useNavigate} from 'react-router-dom';
import { useEffect, useContext } from 'react'
import { UserContext } from './context/userContext'
import { API, setAuthToken} from './config/api'
import React from "react";


// -------------- PAGE ----------------
import Home from './pages/Home';
import Menu from './pages/Menu';
import Order from './pages/Order';
import Profile from './pages/Profile';
import Partner from './pages/Partner';
import AddProduct from './pages/AddProduct';
import ProfileEdit from './pages/ProfilEdit';
import PartnerEdit from './pages/PartnerEdit';
import IncomeTransaction from './pages/IncomeTrs';
import MyProducts from './pages/MyProducts';
import PoductEdit from './pages/ProductEdit'


// Init token on axios every time the app is refreshed here ...
if (localStorage.token) {
  setAuthToken(localStorage.token);
}


function App() {
  let navigate = useNavigate();
  const [state, dispatch] = useContext(UserContext)

  const checkUser = async () => {
    try {
      
      const response = await API.get('/check-auth')

      if (response.status === 404) {
        return dispatch({
          type: 'AUTH_ERROR'
        });
      }

      let payload = response.data.data.user

      console.log(response.data.data.user)
      
      payload.token = localStorage.token

      dispatch({
        type: 'USER_SUCCESS',
        payload,
      })

    } catch (error) {
      console.log(error)
    }
  }

  // Call function check user with useEffect didMount here ...
  useEffect(() => {
    checkUser();
  }, [])
  
  return (

    <React.Fragment>
      <Routes>
        <Route path='/' element={<Home/>}  />
        <Route path='/menu/:id' element={<Menu/>} />
        <Route path='/order' element={<Order/>} />
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/partner' element={<Partner/>} />
        <Route path='/add-product' element={<AddProduct/>} />
        <Route path='/edit-product/:id' element={<PoductEdit/>} />
        <Route path='/my-product' element={<MyProducts/>} />
        <Route path='/profile-edit' element={<ProfileEdit/>} />
        <Route path='/partner-edit' element={<PartnerEdit/>} />
        <Route path='/income-trs' element={<IncomeTransaction/>} />
      </Routes>
    </React.Fragment>
  );
}

export default App;
