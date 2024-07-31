import './css/App.css';
import './css/form.css';
import { JoinSubmit } from './components/JoinCheck'
import { LoginSubmit } from './components/LoginPage'
import { MainPage } from './components/MainPage'
import { useState } from "react"
import { BrowserRouter, Routes, Route } from 'react-router-dom'

  

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [LoggedUser, setLoggedUser] = useState("")
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage isLoggedIn={isLoggedIn} setLoggedUser={setLoggedUser} setisLoggedIn = {setIsLoggedIn}/>} />
          <Route path="/join" element={<div><MainPage isLoggedIn={isLoggedIn} setLoggedUser={setLoggedUser} setisLoggedIn = {setIsLoggedIn}/><JoinSubmit /></div>}/>
          <Route path="/login" element={<div><MainPage isLoggedIn={isLoggedIn} setLoggedUser={setLoggedUser} setisLoggedIn = {setIsLoggedIn}/><LoginSubmit  setLoggedUser={setLoggedUser} setisLoggedIn = {setIsLoggedIn}/></div>}/>
        </Routes>
    </BrowserRouter>
  );
}

export default App;