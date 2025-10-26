import useGlobalReducer from "../hooks/useGlobalReducer";
import {SigninForm} from "../components/SignInForm.jsx";

export const SignIn = () => {

    const { store, dispatch } = useGlobalReducer();

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <h2 className="text-center mb-4">Sign In</h2>
                    <SigninForm />
                </div>
            </div>
        </div>
    );
}