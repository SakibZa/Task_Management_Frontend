import React, { useState, useEffect, useContext } from "react";
import { Link , useNavigate} from "react-router-dom";
import { UserDataContext } from "../context/userContext";
import axios from "axios";

const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userData, setUserData] = useState({});

  const { user, setUser } = useContext(UserDataContext);
  const navigate = useNavigate();
  const submitHandler = async (e) => {
    e.preventDefault();
    const userData = {
      email: email,
      password: password,
    };
    const response = await axios.post(`http://localhost:8000/api/user/login`,userData);
    if (response.status === 200) {
      const data = response.data;
      setUser(data.user);
      localStorage.setItem('token',data.accessToken);
      navigate('/home');
    }
    setEmail("");
    setPassword("");
  };

  useEffect(() => {
    if (Object.keys(userData).length > 0) {
      console.log(userData);
    }
  }, [userData]);

  return (
    <div className="p-7 h-screen flex flex-col justify-between">
      <div>
        <form
          onSubmit={(e) => {
            submitHandler(e);
          }}
        >
          <h3 className="text-lg mb-2">What's your email</h3>
          <input
            className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
            type="email"
            placeholder="email@example.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <h3 className="text-lg mb-2">Password</h3>
          <input
            className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
            type="password"
            placeholder="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="bg-[#111] text-white font-semibold mb-7 rounded px-4 py-2 w-full text-lg placeholder:text-base">
            Login
          </button>
          <p className="text-center">
            New here?{" "}
            <Link to="/signup" className="text-blue-600 ">
              Create new Account
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default UserLogin;
