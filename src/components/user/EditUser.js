import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AuthUser from "../../utils/AuthUser";

import axios from "../../api/axios";

const EditUser = () => {
  const { token } = AuthUser();
  const navigate = useNavigate();
  const { id } = useParams();
  const [user, setUser] = useState({
    name: "",
    email: "",
    address: "",
    role: "",
    phoneNo: ""
  });

  const { name, email, address, role, phoneNo } = user;
  const onInputChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    loadUser();
  }, []);

  const onSubmit = async e => {
    e.preventDefault();
    if (token) {
      await axios.put(`/user/?id=${id}`, user, {
        headers: {
          "Content-type": "application/json",
          "auth-token": token.replace(/['"]+/g, '')
        }
      });

      navigate('/');
    }
    else
      navigate('/login');
  };

  const loadUser = async () => {
    const result = await axios.get(`/user/?id=${id}`, {
      headers: {
        "Content-type": "application/json",
        "auth-token": token.replace(/['"]+/g, '')
      }
    });
    setUser(result.data);
  };
  return (
    <div className="container">
      <div className="w-75 mx-auto shadow p-5">
        <h2 className="text-center mb-4">Edit A User</h2>
        <form onSubmit={e => onSubmit(e)}>
          <div className="mb-3 mt-3">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Your Name"
              name="name"
              value={name}
              onChange={e => onInputChange(e)}
            />
          </div>
          <div className="mb-3 mt-3">
            <input
              type="email"
              className="form-control form-control-lg"
              placeholder="Enter Your E-mail Address"
              name="email"
              value={email}
              onChange={e => onInputChange(e)}
            />
          </div>
          <div className="mb-3 mt-3">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Your Address"
              name="address"
              value={address}
              onChange={e => onInputChange(e)}
            />
          </div>
          <div className="mb-3 mt-3">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Your Role"
              name="role"
              value={role}
              onChange={e => onInputChange(e)}
            />
          </div>
          <div className="mb-3 mt-3">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Your Phone Number"
              name="phoneNo"
              value={phoneNo}
              onChange={e => onInputChange(e)}
            />
          </div>
          <button className="btn btn-warning btn-block">Update User</button>
        </form>
      </div>
    </div>
  );
};

export default EditUser;