import React, {useState} from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { login } from "../../services/userServices";
import { useNavigate } from "react-router-dom";

export const LoginForm = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {store, dispatch } = useGlobalReducer();
    const navigate = useNavigate();


    async function handleSubmit(e) {
        e.preventDefault()
        console.log(email,password)
        const token = await login(email,password)
        if (token) {
            sessionStorage.setItem('access_token', token)
            navigate('/private')
            // continuar (navegar, actualizar estado, etc.)
        } else {
            alert('Login fallido')
            setEmail('')
            setPassword('')
         console.log('Login fallido')   // manejar error de login
        }
    }

    return (
        <form className="w-50 mx-auto" onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="InputEmail" className="form-label">
                    Email address
                </label>
                <input type="email" className="form-control" id="InputEmail" value={email} aria-describedby="emailHelp" onChange={(e)=>setEmail(e.target.value)} />
            </div>
            <div className="mb-3">
                <label htmlFor="InputPassword" className="form-label">
                    Password
                </label>
                <input type="text" className="form-control" id="InputPassword" value={password} onChange={(e)=>setPassword(e.target.value)} />
            </div>
            <button type="submit" className="btn btn-primary">
                Submit
            </button>
        </form>
    )



}