import React, {useState} from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { signIn } from "../../services/userServices";

export const SigninForm = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {store, dispatch } = useGlobalReducer();

    function handleSubmit(e) {
        e.preventDefault()
        console.log(email,password)
        signIn(email,password)
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