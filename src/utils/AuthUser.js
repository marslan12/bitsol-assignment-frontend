import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AuthUser(){
    const navigate = useNavigate();

    const getToken = () =>{
        const tokenString = sessionStorage.getItem('token');
        const userToken = tokenString;
        return userToken;
    }

    const [token, setToken] = useState(getToken());

    const saveToken = (token) =>{
        sessionStorage.setItem('token',JSON.stringify(token));

        setToken(token);
        navigate('/');
    }

    const logout = () => {
        sessionStorage.clear();
        navigate('/login');
    }

    return {
        setToken:saveToken,
        token,
        getToken,
        logout
    }
}