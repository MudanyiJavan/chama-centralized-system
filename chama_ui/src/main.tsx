//import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import Landing_Page from './landing/landing'
import Log_in from './User_Authentication/Login'
import Sign_up from './User_Authentication/Sign_Up'
import Admin_screen from './screens/admin.tsx'
import Chama_Auth from './chama_authentication/landing.tsx'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<Landing_Page/>} />
      <Route>
        <Route path='/Login' element={<Log_in/>} />
        <Route path='/Signup' element={<Sign_up/>}/>
        <Route path='/app' element={<App/>}/>
        <Route path='/chamaAuth' element={<Chama_Auth/>}/>
      </Route>
      <Route path='/admin_screen' element={<Admin_screen/>}/>
    </Routes>
    
  </BrowserRouter>
)
