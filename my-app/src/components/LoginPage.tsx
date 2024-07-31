import { useState } from 'react'
import SvgIcon from "@mui/material/SvgIcon";
import { SvgIconComponent } from "@mui/icons-material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import { hashSync, compare} from 'bcrypt-ts';

interface props {
    setisLoggedIn : any,
    setLoggedUser : any
}

export const LoginSubmit: React.FC<props> = (props : props) => {
    const {setisLoggedIn, setLoggedUser} = props;
    const [id, setId] = useState(-1)
    const [pw, setPw] = useState("")
    const [Validpw, setValidPw] = useState(-1)
    const [showpw, setShowpw] = useState(false)
    const [userInfo, setUserInfo] = useState({
        password: '',
        nickname: ''
    });

    const navigate = useNavigate();

    const regId = /^[A-Za-z0-9]*$/; 
    const regPw = /(?=.*\d)(?=.*[a-z])/; 

    const idChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        setUserInfo({
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

    const showPwEvent = () => {
        setShowpw(!showpw)
    }

    const LoginEvent = () => {
        axios.get(`http://localhost:3001/join/${userInfo.nickname}`, {
        }).then(async function(res:any) {
            let validPassword = await compare(userInfo.password, res.data['password'])
            if (validPassword) {
                setisLoggedIn(true)
                navigate('/')  
            }
        }).catch(function(error:any) {
            if (error.response.status === 404 || error.response.status === 400) {
                window.confirm('아이디 또는 비밀번호가 일치하지 않습니다.')
            }
            else {
                window.confirm('로그인 중 오류가 발생했습니다.')
            }
        })
    }

    return (
        <div>
            <div className='JoinBox'>
                <div className='inputbox'>
                    <label htmlFor="id">아이디</label>
                    <input onChange={idChange} id='id' required autoFocus></input>
                    <p className='idinputbox'>{id === 0 ? "아이디를 입력해 주세요!" : ""}</p>
                </div>
                <div className='inputbox'>
                    <label htmlFor="pw">비밀번호</label>
                    <input type='password' onChange={pwChange} id='pw' required autoFocus></input> 
                    <p className='pwinptbox'>{pw && showpw ? pw : ""}</p>
                    <p className='idinputbox'>{Validpw === 0 ? "비밀번호를 입력해 주세요!" : ""}</p>
                    <button onClick={showPwEvent} className='Button1 showButton'><SvgIcon className='icon' fontSize='small' component={showpw? VisibilityIcon : VisibilityOffIcon} inheritViewBox /></button>               
                </div>
                <button onClick={LoginEvent}>로그인</button>
            </div>
        </div>
    )
}