import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import axios from "../../api/axios";
import AuthUser from "../../utils/AuthUser";

const PAGE_NUMBER = 1;

const Home = () => {
    const navigate = useNavigate();

    const { token } = AuthUser();
    const [users, setUser] = useState([]);
    const [page, setPage] = useState(PAGE_NUMBER);

    useEffect(() => {
        loadUsers();
    }, [page]);

    const scrolToEnd = async () => {
        setPage(page+1);
    };

    window.onscroll = function() {
        if(window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight){
            scrolToEnd();
        }
    }

    const loadUsers = async () => {
        // console.log("token: " + token);
        if (token) {
            const result = await axios.get(`/users/?perPage=20&page=${page}`, {
                headers: {
                    "Content-type": "application/json",
                    "auth-token": token.replace(/['"]+/g, '')
                }
            });
            setUser([...users, ...result.data.reverse()]);
        }
        else
            navigate('/login');
    };

    const deleteUser = async id => {
        if (token) {
            await axios.delete(`/user/?id=${id}`, {
                headers: {
                    "Content-type": "application/json",
                    "auth-token": token.replace(/['"]+/g, '')
                }
            });
            loadUsers();
        }
        else
            navigate('/login');
    };

    return (
        <div className="container">
            <div className="py-4">
                <table className="table border shadow">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">S No.</th>
                            <th scope="col">ID</th>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr>
                                <th scope="row">{index + 1}</th>
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>
                                    <Link className="btn btn-outline-primary" to={`/user/edit/${user.id}`}>
                                        Edit
                                    </Link>
                                    &nbsp;
                                    <button className="btn btn-outline-danger" onClick={() => deleteUser(user.id)}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Home;