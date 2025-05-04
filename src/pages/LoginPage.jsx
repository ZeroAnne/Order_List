import React, { useState } from "react";
import "./LoginPage.scss";
import axios from "../hook/axios";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  //function
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("/auth/login", {
        username,
        password,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("username", res.data.username);

      //導向
      navigate("/orders");
    } catch (error) {
      alert("登入失敗，請再試一次");
      console.log(error);
    }
  };

  return (
    <section className="login_container">
      <form id="LoginPage" className="text-start" onSubmit={handleLogin}>
        <h3>登入</h3>
        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">
            帳號
          </span>
          <input
            type="text"
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="請輸入帳號..."
            aria-label="Username"
            aria-describedby="basic-addon1"
          />
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">
            密碼
          </span>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="請輸入密碼..."
            aria-label="Password"
            aria-describedby="basic-addon1"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          登入
        </button>
      </form>
    </section>
  );
};

export default LoginPage;
