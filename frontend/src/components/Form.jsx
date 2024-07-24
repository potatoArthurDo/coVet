import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import "../styles/FormStyle.css";
import { Link } from "react-router-dom";

function Form({ route, method }) {
  const [username, setusername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const initialFormData = Object.freeze({
    first_name:"", 
    last_name: "",
    email: ""
  });
  const [userData, updateUserData] = useState(initialFormData);
  const handlechange = (e) => {
    updateUserData({
      ...userData,
      [e.target.name]: e.target.value.trim(),
    });
  };

  const navigate = useNavigate();
  const name = method === "login" ? "Login" : "Register";

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    try {
      const res = await api.post(route, { username, password });
      if (method === "login") {
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
        navigate("/");
      } else if (method === "register") {
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
        navigate("/login");
      } else {
        navigate("/login");
      }
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="background">
      {method === "login" ? (
        <form onSubmit={handleSubmit} className="form-container">
          <h1>{name}</h1>
          <input
            className="form-input"
            type="text"
            value={username}
            onChange={(e) => setusername(e.target.value)}
            placeholder="Username"
          />

          <input
            className="form-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />

          <button className="form-button" type="submit">
            {name}
          </button>
          <div className="option">
            <Link className="forgot-password">Forgot password?</Link>
            <br />
            <Link className="forgot-password" to="/register">
              Sign up
            </Link>
          </div>
        </form>
      ) : (
        <div className="register-form">
          <form onSubmit={handleSubmit} className="form-container">
            <h1>{name}</h1>
            <input
              className="form-input-register"
              type="text"
              value={username}
              onChange={(e) => setusername(e.target.value)}
              placeholder="Username"
              name="username"
            />

            <input
              className="form-input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
            {/* <input
              className="form-input"
              type="password"
              placeholder="re-Password"
            />
            <input
              className="form-input-register"
              type="text"
              name="first_name"
              onChange={handlechange}
              placeholder="First Name"
            />
            <input
              className="form-input-register"
              type="text"
              name="last_name"
              onChange={handlechange}
              placeholder="Last Name"
            />
            <input
              className="form-input-register"
              type="email"
              name="email"
              onChange={handlechange}
              placeholder="Email"
            /> */}
            
            <button className="form-button" type="submit">
              {name}
            </button>
            <div className="option">
              <Link className="forgot-password" to="/login">
                Already have an account?
              </Link>
            </div>
          </form>
          {/* <form onSubmit={handleSubmit} className="form-container-register" >
          <h1>{name}</h1>
          <input
            className="form-input-register"
            type="text"
            value={username}
            onChange={(e) => setusername(e.target.value)}
            placeholder="Username"
          />

          <input
            className="form-input-register"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <input
            className="form-input-register"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
        </form> */}
        </div>
      )}
    </div>
  );
}

export default Form;
