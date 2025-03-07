import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { UserDataContext } from '../context/userContext'; 
const UserSignup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
   
  const { user, setUser } = useContext(UserDataContext);

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    const newUser = {
      name: name,
      email: email,
      password: password
    };

    const response = await axios.post(`http://localhost:8000/api/user/register`, newUser);
    if (response.status === 201) {
      const data = response.data;
      setUser(data.user);
      localStorage.setItem('token', data.accessToken);
      navigate('/home');
    }

    setName('');
    setEmail('');
    setPassword('');
  };


  return (
    <div className="p-7 h-screen flex flex-col justify-between">
      <div>
        <form onSubmit={submitHandler}>
          <h3 className="text-lg mb-2">What's your name</h3>
          <div className='flex gap-4 mb-5'>
            <input
              className="bg-[#eeeeee] rounded px-4 py-2 w-full border text-lg placeholder:text-base"
              type="text"
              placeholder="John"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            </div>
          <h3 className="text-lg mb-2">What's your email</h3>
          <input
            className="bg-[#eeeeee] mb-5 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
            type="email"
            placeholder="email@example.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <h3 className="text-base mb-2">Password</h3>
          <input
            className="bg-[#eeeeee] mb-5 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
            type="password"
            placeholder="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="bg-[#111] text-white font-semibold mb-7 rounded px-4 py-2 w-full text-lg">
            Create account
          </button>
          <p className="text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600">
              Login
            </Link>
          </p>
        </form>
      </div>
      <div>
      </div>
    </div>
  );
};

export default UserSignup;
