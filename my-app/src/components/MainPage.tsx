import { useState } from "react"
import { useLocation } from 'react-router-dom';
import { Link, useHref } from "react-router-dom"

interface props {
    isLoggedIn : any,
    setisLoggedIn : any,
    setLoggedUser : any
}

export const MainPage : React.FC<props> = (props : props) => {
    const {isLoggedIn, setisLoggedIn, setLoggedUser} = props;

    const LogoutEvent = () => {
        setisLoggedIn(false)
    }

    if (isLoggedIn === false) {
        return (
            <div className="main-container">
                <h1><Link className="Logo" to='/'>정보부</Link></h1>
                <div className="button-container">
                    <Link className="Button1 MainButton" to='/join'>회원가입</Link>
                    <Link className="Button1 MainButton" to='/login'>로그인</Link>
                </div>
            </div>
        )
    }
    else {
        return (
            <div className="main-container">
                <h1><Link className="Logo" to='/'>정보부</Link></h1>
                <div className="button-container">
                    <button onClick={LogoutEvent} className="Button1 MainButton">로그아웃</button>
                </div>
            </div>
        )
    }
}