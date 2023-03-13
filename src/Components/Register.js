import Header from './Header';
import axios from 'axios'
// import env from "react-dotenv";
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { isValid, isValidEmail, checkPassword } from '../Validations/validator'

function Register() {
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
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

    async function register() {
        try {
            const body = { name, email, password }

            const errs = {}
            if (!isValid(body.name)) {
                errs.name = "please fill the name column"
            }
            if (!isValid(body.email)) {
                errs.email = "please fill the email column"
            } else {
                if (!isValidEmail(body.email)) {
                    errs.email = `required valid emailId`
                }
            }

            if (!isValid(body.password)) {
                errs.password = "please fill the password column"
            }
            else {
                if (!checkPassword(body.password)) {
                    errs.password = "password should contain at least (1 lowercase, uppercase ,numeric alphabetical character and at least one special character and also The string must be  between 8 characters to 16 characters)"
                }
            }

            setErrors(errs)

            if (Object.keys(errs).length === 0) {
                let options = {
                    url: `${process.env.REACT_APP_CREATE_USER_URL}`,
                    method: "POST",
                    data: body,
                }
                await axios(options)
                setName("")
                setEmail("")
                setPassword("")
                navigate('/login')
            }
        }
        catch (err) {
            const errs = {}
            errs.message = err.response.data
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
                    <h5>Name:</h5>
                </div>
                <input type="text" className='form-control'
                    placeholder='name' onChange={(e) => setName(e.target.value)} />
                {(errors.name) ? <p style={{ textAlign: "left", color: "red" }}> {errors.name}</p> : <br />}
                <div style={{ textAlign: "left" }}>
                    <h5>Email:</h5>
                </div>
                <input type="email" className='form-control'
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
                <button className='btn btn-primary' onClick={register}>Sign Up</button>
            </div>
        </>
    )
}

export default Register