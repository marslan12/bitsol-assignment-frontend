import { useState } from "react";
import axios from "../api/axios";
import AuthUser from "../utils/AuthUser";

const Login = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const { setToken } = AuthUser();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const onSubmit = async e => {
        e.preventDefault();
        await axios.post("/login", { email: email, password: password })
            .then(async (res) => {
                if (res.data)
                    setToken(res.data.Token);
                else
                    setErrorMessage('Invalid Username or Password');
            });
    }

    return (
        <div className="container">
            <div className="w-75 mx-auto shadow p-5">

                <form onSubmit={e => onSubmit(e)}>
                    <div className="mb-3 mt-3">
                        <label htmlFor="email" className="form-label">Email:</label>
                        <input type="email" className="form-control form-control-lg" id="email"
                            onChange={e => setEmail(e.target.value)} placeholder="Enter email" name="email" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="pwd" className="form-label">Password:</label>
                        <input type="password" className="form-control form-control-lg" id="pwd"
                            onChange={e => setPassword(e.target.value)} placeholder="Enter password" name="pswd" />
                    </div>
                    <button className="btn btn-primary">Login</button>

                </form>
                <br />
                {errorMessage && (
                    <div class="alert alert-danger" role="alert">
                        <p className="error"> {errorMessage} </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Login;