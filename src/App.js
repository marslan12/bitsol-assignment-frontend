import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import Navbar from './components/layout/Navbar';
import Users from './components/user/Users';
import AddUser from './components/user/AddUser';
import EditUser from './components/user/EditUser';
import Login from './components/Login';
import AuthUser from './utils/AuthUser';

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from "react-router-dom";

function App() {

  return (
      <Router>
        <div className="App">
          <Navbar />

          <Routes>
            <Route path="/login" element={<Login />} />
            
            <Route path="/" element={<Users />} />
            <Route path="/user/add" element={<AddUser />} />
            <Route path="/user/edit/:id" element={<EditUser />} />
            <Route path="/redirect" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </Router>
  );
}

export default App;
