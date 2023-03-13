import Header from './Header';
import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import jwt_decode from 'jwt-decode'
import { isValid, isValidEmail } from '../Validations/validator'


function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errors, setErrors] = useState({})
    const [serverErrors, setServerErrors] = useState({})

    const [passwordType, setPasswordType] = useState("password");

    const togglePassword = () => {
        if (passwordType === "password") {
            setPasswordType("text")
            return;
        }
        setPasswordType("password")
    }

    const navigate = useNavigate()

    async function login() {
        try {

            const credentials = { email, password }

            const errs = {}

            if (!isValid(credentials.email)) {
                errs.email = `please fill the email column`
            } else {
                if (!isValidEmail(credentials.email)) {
                    errs.email = `invalid emailId`
                }
            }

            if (!isValid(credentials.password)) {
                errs.password = `please fill the password column`
            }

            setErrors(errs)

            if (Object.keys(errs).length === 0) {
                let options = {
                    url: `${process.env.REACT_APP_LOGIN_URL}`,
                    method: "POST",
                    data: credentials,
                }
                const obj = await axios(options)
                const token = obj.data.token
                const tokenData = jwt_decode(token)
                localStorage.setItem("token", token);
                localStorage.setItem("userId", tokenData.userId);
                localStorage.setItem("name", tokenData.name);
                if (token) {
                    navigate('/')
                }
            }
        }
        catch (err) {
            const errs = {}
            errs.message = err.response.data.msg
            setServerErrors(errs)
        }
    }
    return (
        <>
            <Header />
            <br />
            <br />
            <div className='col-sm-6 offset-sm-3'>
                <div style={{ textAlign: "left" }}>
                    <h5>Email:</h5>
                </div>
                <input type="text" className='form-control'
                    placeholder='email' onChange={(e) => setEmail(e.target.value)} />
                {(errors.email) ? <p style={{ textAlign: "left", color: "red" }}> {errors.email}</p> : <br />}
                <div style={{ textAlign: "left" }}>
                    <h5 style={{ marginBottom: "0px" }}>Password:</h5>
                </div>
                <p style={{ cursor: "pointer", color: "blueviolet", textAlign: "right", marginBottom: "0px" }} onClick={togglePassword}>
                    {passwordType === "password" ? <h6>Show Password</h6> : <h6>Hide Password</h6>}
                </p>
                <input type={passwordType} onChange={(e) => setPassword(e.target.value)} value={password} name="password" className="form-control" placeholder="Password" />
                {(errors.password) ? <p style={{ textAlign: "left", color: "red" }}> {errors.password}</p> : <br />}
                {(serverErrors.message) ? <p style={{ textAlign: "center", color: "red" }}> {serverErrors.message}</p> : <br />}
                <button className='btn btn-primary' onClick={login}>Login</button>
            </div>
        </>
    )
}

export default Login