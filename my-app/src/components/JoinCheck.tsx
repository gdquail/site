import { useState } from 'react'
import { MainPage } from './MainPage'
import SvgIcon from "@mui/material/SvgIcon";
import { SvgIconComponent } from "@mui/icons-material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import axios from 'axios'
import { useLocation } from 'react-router-dom';

export const JoinSubmit = () => {
    const [id, setId] = useState(-1)
    const [pw, setPw] = useState("")
    const [Validpw, setValidPw] = useState(-1)
    const [Checkpw, setCheckPw] = useState(false)
    const [showpw, setShowpw] = useState(false)
    const [email, setEmail] = useState("")
    const [userInfo, setUserInfo] = useState({
        email: '',
        password: '',
        nickname: '',
    });

    const regId = /^[A-Za-z0-9]*$/; 
    const regPw = /(?=.*\d)(?=.*[a-z])/; 

    const idChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        setUserInfo({
            email: userInfo.email,
            password: userInfo.password,
            nickname: e.target.value
        })
        if (e.target.value === "") {
            setId(0)
        }
        else if (!regId.test(e.target.value)) {
            setId(1)
        }
        else if (e.target.value.length < 5){
            setId(2)
        }
        else {
            setId(3)
        }
    }

    const pwChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        setPw(e.target.value)
        setUserInfo({
            email: userInfo.email,
            password: e.target.value,
            nickname: userInfo.nickname
        })
        if (e.target.value === "") {
            setValidPw(0)
        }
        else if (!regPw.test(e.target.value)) {
            setValidPw(1)
        }
        else if (e.target.value.length < 8) {
            setValidPw(2)
        }
        else {
            setValidPw(3)
        }
    }

    const pwCheckChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        if (e.target.value === pw) {
            setCheckPw(true)
        }
        else {
            setCheckPw(false)
        }
    }

    const emailChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        setUserInfo({
            email: e.target.value,
            password: userInfo.password,
            nickname: userInfo.nickname
        })
        setEmail(e.target.value)
    }

    const showPwEvent = () => {
        setShowpw(!showpw)
    }

    const JoinEvent = () => {
        if (Checkpw === true) {
            if (Validpw === 3) {
                if (id === 3) {
                    axios.post('http://localhost:3001/join', {
                        nickname: userInfo.nickname,
                        password: userInfo.password,
                        email: userInfo.email
                    }).catch(function(error:any) {
                        if (error.response.status === 409) {
                            window.confirm('이미 있는 아이디입니다.')
                        }
                        else {
                            window.confirm('회원가입 중 오류가 발생했습니다.')
                        }
                    })
                }
                else {
                    window.confirm('아이디가 올바르지 않습니다.')
                }
            }
            else {
                window.confirm('비밀번호가 올바르지 않습니다.')
            }
        }
        else {
            window.confirm('비밀번호가 일치하지 않습니다.')
        }
    }

    return (
        <div>
            <div className='JoinBox'>
                <div className='inputbox'>
                    <input onChange={idChange} placeholder='Id' id='id' required autoFocus></input>
                    <p className='idinputbox'>{id === 0 ? "아이디를 입력해 주세요!" : id === 1 ? "아이디는 영어만 가능합니다" : id === 2 ? "아이디는 5글자 이상이어야 합니다." : id === 3 ?  "맞는 아이디입니다." : ""}</p>
                </div>
                <div className='inputbox'>
                    <input type='password' onChange={pwChange} placeholder='Password' id='pw' required autoFocus></input> 
                    <p className='pwinptbox'>{pw && showpw ? pw : ""}</p>
                    <p className='idinputbox'>{Validpw === 0 ? "비밀번호를 입력해 주세요!" : Validpw === 1 ? "비밀번호에는 영어와 숫자가 1개 이상 포함되어야 합니다" : Validpw === 2 ?  "비밀번호는 8글자 이상이어야 합니다." : Validpw === 3 ? "맞는 비밀번호입니다." : ""}</p>
                    <button onClick={showPwEvent} className='Button1 showButton'><SvgIcon className='icon' fontSize='small' component={showpw? VisibilityIcon : VisibilityOffIcon} inheritViewBox /></button>               
                </div>
                
                <div className='inputbox'>
                    <label htmlFor="pwCheck">비밀번호 확인</label>
                    <input type='password' onChange={pwCheckChange} id='pwCheck' required autoFocus></input>
                    <p>{!(pw === "") && !Checkpw ? "비밀번호가 일치하지 않습니다." : !(pw === "") ? "비밀번호 일치" : ""}</p>
                </div>
                <div className='inputbox'>
                    <input onChange={emailChange} placeholder='Email' id='email' required autoFocus></input>
                </div>
                <button onClick={JoinEvent}>회원가입</button>
            </div>
        </div>
    )
}