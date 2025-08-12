import useGlobalReducer from "../hooks/useGlobalReducer";
import {LoginForm} from "../components/LoginForm.jsx";

export const Login = () => {

    const { store, dispatch } = useGlobalReducer();

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <h2 className="text-center mb-4">Login</h2>
                    <LoginForm />
                </div>
            </div>
        </div>
    );
}