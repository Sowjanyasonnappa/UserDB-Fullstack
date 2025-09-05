import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./LoginForm.css";
import { GoogleLogin } from "@react-oauth/google";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });
      localStorage.setItem("token", res.data.token);
      navigate("/user");
    } catch (err) {
      alert(err.response?.data?.error || "Login failed");
    }
  };

  const handleForgot = async () => {
    if (!email) return alert("Enter email first");
    await axios.post("http://localhost:5000/api/auth/forgot", { email });
    alert("Reset link sent to email");
  };

  return (
    <div className="login-container">
      <h2>Login</h2>

      <GoogleLogin
        onSuccess={async (credentialResponse) => {
          console.log("Google credential:", credentialResponse);
          try {
            const res = await axios.post("http://localhost:5000/api/auth/google", {
              token: credentialResponse.credential,
              
            });
            localStorage.setItem("token", res.data.token);
            navigate("/user");
          } catch (err) {
            console.error("Google login failed", err);
          }
        }}
        onError={() => {
          console.log("Google login failed");
        }}
      />

      {/* ✅ Normal Email/Password Login */}
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Login</button>
        <button type="button" onClick={handleForgot}>
          Forgot Password
        </button>
      </form>
    </div>
  );
}
