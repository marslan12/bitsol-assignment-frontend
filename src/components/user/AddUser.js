import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import AuthUser from "../../utils/AuthUser";

import axios from "../../api/axios";

const AddUser = () => {
  const navigate = useNavigate();
  const { token } = AuthUser();

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

  const onSubmit = async e => {
    e.preventDefault();
    if (token) {
      await axios.post("/user", user, {
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
  return (
    <div className="container">
      <div className="w-75 mx-auto shadow p-5">
        <h2 className="text-center mb-4">Add A User</h2>
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
          <button className="btn btn-primary btn-block">Add User</button>
        </form>
      </div>
    </div>
  );
};

export default AddUser;
